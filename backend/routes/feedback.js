const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { stakeholderType, registrationNumber, name, email, rating, comments } = req.body;
    if (!stakeholderType || !registrationNumber || !name || !email || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const feedback = new Feedback({ stakeholderType, registrationNumber, name, email, rating, comments });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:regno', async (req, res) => {
  try {
    const regno = req.params.regno;
    const items = await Feedback.find({ registrationNumber: regno }).sort({ submittedAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
