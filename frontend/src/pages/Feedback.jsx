import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const selectOptions = ['--- Select ---', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
const departments = ['--- Select ---', 'CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'CHEMICAL'];

export default function Feedback() {
  const [searchParams] = useSearchParams()
  const stakeholderType = searchParams.get('type') || ''
  const registrationNumber = searchParams.get('reg') || ''
  const isStudent = stakeholderType === 'Students'
  
  // Student feedback form data
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    department: '',
    facultyName: '',
    courseCode: '',
    teachingQuality: '',
    courseContent: '',
    communication: '',
    evaluationMethod: '',
    feedback: ''
  })

  // Industry/Other stakeholder form data
  const [otherFormData, setOtherFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    organizationAddress: '',
    facultyId: '',
    faculty: '',
    curriculumReadiness: '',
    studentMotivation: '',
    criticalThinking: '',
    problemSolving: '',
    designThinking: '',
    softSkills: '',
    practicalLearningImprovement: '',
    interdisciplinaryCourses: '',
    multiDisciplinaryCourses: '',
    entrepreneurshipCourses: '',
    industryMentorsWillingness: '',
    comment: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (!stakeholderType) {
    return (
      <div className="max-w-md w-full">
        <div className="bg-white shadow-md rounded-lg p-6">Missing parameters. Return to home.</div>
      </div>
    )
  }

  const handleStudentChange = (e) => {
    const { name, value } = e.target
    setStudentFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOtherChange = (e) => {
    const { name, value } = e.target
    setOtherFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStudentSubmit = async (e) => {
    e.preventDefault()
    if (!studentFormData.name || !studentFormData.email || !studentFormData.facultyName || !studentFormData.courseCode) {
      setError('Name, Email, Faculty Name, and Course Code are required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          stakeholderType, 
          registrationNumber, 
          ...studentFormData 
        })
      })
      if (res.ok) {
        navigate('/thankyou')
      } else {
        const body = await res.json()
        setError(body.message || 'Submission failed')
      }
    } catch (err) {
      setError('Network error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOtherSubmit = async (e) => {
    e.preventDefault()
    if (!otherFormData.name || !otherFormData.email) {
      setError('Name and Email are required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          stakeholderType, 
          registrationNumber, 
          ...otherFormData 
        })
      })
      if (res.ok) {
        navigate('/thankyou')
      } else {
        const body = await res.json()
        setError(body.message || 'Submission failed')
      }
    } catch (err) {
      setError('Network error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Conditional render based on stakeholder type
  if (isStudent) {
    return (
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Student Faculty Feedback Form</h2>

          {/* Basic Information */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Registration Number</label>
                <input 
                  type="text"
                  value={registrationNumber}
                  className="w-full border rounded px-3 py-2 bg-gray-100 focus:outline-none"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Name *
                </label>
                <input 
                  type="text"
                  name="name"
                  value={studentFormData.name}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email *
                </label>
                <input 
                  type="email"
                  name="email"
                  value={studentFormData.email}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.11.33.27.645.45.925a10.025 10.025 0 003.302 3.302c.28.18.595.34.925.45l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 3 13.18 3 7V5a1 1 0 011-1h2.153z" />
                  </svg>
                  Mobile
                </label>
                <input 
                  type="tel"
                  name="mobile"
                  value={studentFormData.mobile}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mobile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Department
                </label>
                <select 
                  name="department"
                  value={studentFormData.department}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Faculty Evaluation */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700">Faculty Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Faculty Name *</label>
                <input 
                  type="text"
                  name="facultyName"
                  value={studentFormData.facultyName}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Faculty Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Course Code *</label>
                <input 
                  type="text"
                  name="courseCode"
                  value={studentFormData.courseCode}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Course Code"
                />
              </div>
            </div>
          </div>

          {/* Teaching Quality Evaluation */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Teaching Quality Evaluation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Teaching Quality</label>
                <select 
                  name="teachingQuality"
                  value={studentFormData.teachingQuality}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Course Content Quality</label>
                <select 
                  name="courseContent"
                  value={studentFormData.courseContent}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Communication Skills</label>
                <select 
                  name="communication"
                  value={studentFormData.communication}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Evaluation Method Effectiveness</label>
                <select 
                  name="evaluationMethod"
                  value={studentFormData.evaluationMethod}
                  onChange={handleStudentChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="pb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Feedback</h3>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Your Feedback</label>
              <textarea 
                name="feedback"
                value={studentFormData.feedback}
                onChange={handleStudentChange}
                rows="5"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please share any additional feedback or suggestions..."
              />
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div className="flex gap-3 pt-4">
            <button 
              onClick={handleStudentSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
            <button 
              onClick={() => window.history.back()}
              className="border border-gray-300 px-6 py-2 rounded font-medium hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Industry/Other Stakeholder Form
  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Stakeholder Feedback Form</h2>

        {/* Basic Information */}
        <div className="border-b pb-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Name *
              </label>
              <input 
                type="text"
                name="name"
                value={otherFormData.name}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email *
              </label>
              <input 
                type="email"
                name="email"
                value={otherFormData.email}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.11.33.27.645.45.925a10.025 10.025 0 003.302 3.302c.28.18.595.34.925.45l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 3 13.18 3 7V5a1 1 0 011-1h2.153z" />
                </svg>
                Mobile
              </label>
              <input 
                type="tel"
                name="mobile"
                value={otherFormData.mobile}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mobile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h.01a1 1 0 100-2H6zm2 0a1 1 0 000 2h2.01a1 1 0 100-2H8zm4 0a1 1 0 000 2h.01a1 1 0 100-2h-.01zm2 0a1 1 0 000 2h2.01a1 1 0 100-2h-2.01z" clipRule="evenodd" />
                </svg>
                Designation
              </label>
              <input 
                type="text"
                name="designation"
                value={otherFormData.designation}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Designation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Organization Address
              </label>
              <input 
                type="text"
                name="organizationAddress"
                value={otherFormData.organizationAddress}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Organization"
              />
            </div>

            {stakeholderType === 'Academic Faculty Expert' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Faculty ID
                  </label>
                  <input 
                    type="text"
                    name="facultyId"
                    value={otherFormData.facultyId}
                    onChange={handleOtherChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Faculty ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Faculty
                  </label>
                  <select 
                    name="faculty"
                    value={otherFormData.faculty}
                    onChange={handleOtherChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">--- Select Faculty ---</option>
                    <option value="LBRCE Faculty">LBRCE Faculty</option>
                    <option value="Visiting Faculty">Visiting Faculty</option>
                    <option value="Guest Faculty">Guest Faculty</option>
                    <option value="Contract Faculty">Contract Faculty</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Curriculum Feedback Questions */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Curriculum Feedback For Industry</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                How do you rate our curriculum readiness level with respect to present and future needs of your industry?
              </label>
              <select 
                name="curriculumReadiness"
                value={otherFormData.curriculumReadiness}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                How do you rate our curriculum with respect to students' motivation in innovation?
              </label>
              <select 
                name="studentMotivation"
                value={otherFormData.studentMotivation}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                How do you rate the contents relevant to critical thinking in the curriculum?
              </label>
              <select 
                name="criticalThinking"
                value={otherFormData.criticalThinking}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                How do you rate the contents relevant to problem-solving abilities in the curriculum?
              </label>
              <select 
                name="problemSolving"
                value={otherFormData.problemSolving}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                How do you rate the contents relevant to design thinking in the curriculum?
              </label>
              <select 
                name="designThinking"
                value={otherFormData.designThinking}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                How do you rate the soft skill components provided in the curriculum?
              </label>
              <select 
                name="softSkills"
                value={otherFormData.softSkills}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                How can we improve the practical or experiential learning aspects of our program?
              </label>
              <textarea 
                name="practicalLearningImprovement"
                value={otherFormData.practicalLearningImprovement}
                onChange={handleOtherChange}
                rows="3"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your feedback..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Can you recommend to add a few interdisciplinary courses based on the future technology?
              </label>
              <textarea 
                name="interdisciplinaryCourses"
                value={otherFormData.interdisciplinaryCourses}
                onChange={handleOtherChange}
                rows="3"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your recommendations..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Can you recommend to add a few multi-disciplinary courses based on the emerging technology?
              </label>
              <textarea 
                name="multiDisciplinaryCourses"
                value={otherFormData.multiDisciplinaryCourses}
                onChange={handleOtherChange}
                rows="3"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your recommendations..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Can you recommend to add a few more entrepreneurship courses into our existing curriculum?
              </label>
              <textarea 
                name="entrepreneurshipCourses"
                value={otherFormData.entrepreneurshipCourses}
                onChange={handleOtherChange}
                rows="3"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your recommendations..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Willingness of Industry mentors and experts in the academic bodies such as Board of studies?
              </label>
              <select 
                name="industryMentorsWillingness"
                value={otherFormData.industryMentorsWillingness}
                onChange={handleOtherChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="pb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Comments</h3>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Comments
            </label>
            <textarea 
              name="comment"
              value={otherFormData.comment}
              onChange={handleOtherChange}
              rows="5"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please share any additional comments or suggestions..."
            />
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="flex gap-3 pt-4">
          <button 
            onClick={handleOtherSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
          <button 
            onClick={() => window.history.back()}
            className="border border-gray-300 px-6 py-2 rounded font-medium hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
