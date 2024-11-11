const express = require('express');
const { handleURLInput,handleAnalytics } = require('../controllers/url')

const router = express.Router();

router.post('/',handleURLInput);
router.get('/analytics/:shortId',handleAnalytics);

module.exports = router;