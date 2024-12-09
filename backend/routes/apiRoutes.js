const express = require('express');
const Paper = require('../models/Paper');
const router = express.Router();

// Get papers based on subject, year, and semester
router.get('/getPapers', async (req, res) => {
  try {
    const { subject, year, semester } = req.query;
    const papers = await Paper.find({ subject, year, semester });
    res.json(papers);
  } catch (err) {
    res.status(500).send('Error fetching papers');
  }
});

module.exports = router;
