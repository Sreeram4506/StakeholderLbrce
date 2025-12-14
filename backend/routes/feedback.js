const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { 
      stakeholderType, registrationNumber, name, email, mobile, department, designation, organizationAddress, facultyId, faculty,
      facultyName, courseCode, teachingQuality, courseContent, communication, evaluationMethod, feedback,
      curriculumReadiness, studentMotivation, criticalThinking, problemSolving, designThinking, softSkills,
      practicalLearningImprovement, interdisciplinaryCourses, multiDisciplinaryCourses, entrepreneurshipCourses, industryMentorsWillingness,
      comment
    } = req.body;

    if (!stakeholderType || !registrationNumber || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFeedback = new Feedback({ 
      stakeholderType, registrationNumber, name, email, mobile, department, designation, organizationAddress, facultyId, faculty,
      facultyName, courseCode, teachingQuality, courseContent, communication, evaluationMethod, feedback,
      curriculumReadiness, studentMotivation, criticalThinking, problemSolving, designThinking, softSkills,
      practicalLearningImprovement, interdisciplinaryCourses, multiDisciplinaryCourses, entrepreneurshipCourses, industryMentorsWillingness,
      comment
    });
    
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback: newFeedback });
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
