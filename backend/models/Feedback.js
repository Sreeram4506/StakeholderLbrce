const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  stakeholderType: { type: String, required: true },
  registrationNumber: { type: String, required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String },
  department: { type: String },
  designation: { type: String },
  organizationAddress: { type: String },
  facultyId: { type: String },
  faculty: { type: String },
  
  // Student feedback fields (for students evaluating faculty)
  facultyName: { type: String },
  courseCode: { type: String },
  teachingQuality: { type: String },
  courseContent: { type: String },
  communication: { type: String },
  evaluationMethod: { type: String },
  feedback: { type: String },
  
  // Curriculum Feedback Questions
  curriculumReadiness: { type: String },
  studentMotivation: { type: String },
  criticalThinking: { type: String },
  problemSolving: { type: String },
  designThinking: { type: String },
  softSkills: { type: String },
  
  // Text response questions
  practicalLearningImprovement: { type: String },
  interdisciplinaryCourses: { type: String },
  multiDisciplinaryCourses: { type: String },
  entrepreneurshipCourses: { type: String },
  industryMentorsWillingness: { type: String },
  comment: { type: String },
  
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
