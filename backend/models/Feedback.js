const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  stakeholderType: { type: String, required: true },
  registrationNumber: { type: String, required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
