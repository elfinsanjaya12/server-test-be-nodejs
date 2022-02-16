const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please provide type'],
      minlength: 3,
      maxlength: 50,
    },
    url: {
      type: String,
      required: [true, 'Please provide url'],
      minlength: 3,
      maxlength: 50,
    },
    type: {
      type: String,
      required: [true, 'Please provide type'],
      minlength: 3,
      maxlength: 50,
    },
    created_at: {
      type: Date,
    },
    company: {
      type: String,
      required: [true, 'Please provide company'],
      minlength: 3,
      maxlength: 50,
    },
    location: {
      type: String,
      required: [true, 'Please provide urlocationl'],
      minlength: 3,
      maxlength: 50,
    },
    title: {
      type: String,
      required: [true, 'Please provide title'],
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      minlength: 3,
      maxlength: 50,
    },
    how_to_apply: {
      type: String,
      required: [true, 'Please provide how_to_apply'],
      minlength: 3,
      maxlength: 50,
    },
    company_logo: {
      type: String,
      required: [true, 'Please provide company_logo'],
      minlength: 3,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Jobs', JobsSchema);
