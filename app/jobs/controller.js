const { StatusCodes } = require('http-status-codes');
const Job = require('./model');

const getAllJobs = async (req, res, next) => {
  try {
    let { limit = 10, page = 1, description = '', location = '' } = req.query;

    let criteria = {};

    if (description.length) {
      criteria = {
        ...criteria,
        description: { $regex: `${description}`, $options: 'i' },
      };
    }
    if (location.length) {
      criteria = {
        ...criteria,
        location: { $regex: `${location}`, $options: 'i' },
      };
    }

    let count = await Job.countDocuments(criteria);

    const result = await Job.find(criteria)
      .select(
        'id type url created_at company company_url location description title how_to_apply company_logo'
      )
      .limit(limit)
      .skip(limit * (page - 1));

    return res.status(StatusCodes.OK).json({
      data: result,
      page: Number(page),
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (err) {
    next(err);
  }
};

const getDetailJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const result = await Job.findById(jobId).select(
      'id type url created_at company company_url location description title how_to_apply company_logo'
    );

    if (!result) {
      throw new CustomError.NotFoundError(`No Event with id : ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllJobs, getDetailJob };
