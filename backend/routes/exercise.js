const express = require('express');
const Exercise = require('../models/Exercise');
const auth = require('../middleware/auth');

const router = express.Router();

// Log Exercise
router.post('/log', auth, async (req, res) => {
  const { type, duration, calories } = req.body;
  try {
    const newExercise = new Exercise({
      userId: req.user.id,
      type,
      duration,
      calories
    });
    const exercise = await newExercise.save();
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
