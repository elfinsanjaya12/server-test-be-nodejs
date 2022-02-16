const User = require('../users/model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError.BadRequestError(
        'Please provide username and password'
      );
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    // compare password
    const tokenUser = createTokenUser(user);

    const token = createJWT({ user: tokenUser });

    res.status(StatusCodes.OK).json({ data: { token } });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const payload = req.body;
    let checkUser = await User.findOne({ username: payload.username });

    if (checkUser) {
      throw new CustomError.BadRequestError(
        `Duplicate username : ${payload.username}`
      );
    }

    let user = new User(payload);
    await user.save();

    delete user._doc.password;

    res.status(StatusCodes.OK).json({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = { signin, signup };
