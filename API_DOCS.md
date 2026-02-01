# API Documentation

POST /api/feedback
- Description: Save a feedback entry.
- Body (JSON):
  - stakeholderType (string, required)
  - registrationNumber (string, required)
  - name (string, required)
  - email (string, required)
  - rating (number 1-5, required)
  - comments (string, optional)

Response: 201 and saved document on success.

GET /api/feedback/:regno
- Description: Retrieve feedback entries by registration number (admin use)
- Response: Array of feedback documents.

MongoDB model: `backend/models/Feedback.js`
