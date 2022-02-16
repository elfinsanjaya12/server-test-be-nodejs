const express = require('express');
const router = express.Router();
const { getAllJobs, getDetailJob } = require('./controller');
const { authenticateUser } = require('../../middleware/full-auth');

router.get('/', authenticateUser, getAllJobs);
router.get('/:id', authenticateUser, getDetailJob);

module.exports = router;
