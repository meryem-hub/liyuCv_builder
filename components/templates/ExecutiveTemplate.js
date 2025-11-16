// components/templates/ExecutiveTemplate.js
'use client'
import { useRef, useState } from 'react'
import { Camera, Upload, User } from 'lucide-react'

export default function ExecutiveTemplate({ resume }) {
  const resumeRef = useRef(null)
  const [profileImage, setProfileImage] = useState(null)
  
  if (!resume) {
    return (
      <div className="bg-white text-gray-800 p-3 font-sans text-center">
        <div className="text-indigo-600 text-lg">Loading resume...</div>
      </div>
    )
  }

  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], socialMedia = {} } = resume

  const safePersonalInfo = {
    name: personalInfo?.name || 'Your Name',
    title: personalInfo?.title || 'Executive Professional',
    email: personalInfo?.email || 'your.email@example.com',
    phone: personalInfo?.phone || '+1234567890',
    location: personalInfo?.location || 'City, Country',
    ...personalInfo
  }

 // IN ProfessionalTemplate.js - ADD THIS PDF FUNCTION (same as ModernTemplate)
const handleExportPDF = () => {
  try {
    // Use the resumeRef instead of querySelector
    const resumeElement = resumeRef.current
    if (!resumeElement) {
      console.error('Resume element not found')
      alert('Cannot generate PDF. Please refresh and try again.')
      return
    }

    // Clone the element to remove the button
    const clone = resumeElement.cloneNode(true)
    const button = clone.querySelector('button')
    if (button) {
      button.remove()
    }

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Please allow popups for PDF generation')
      return
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${safePersonalInfo.name || 'My Resume'}</title>
          <style>
            /* Import Tailwind-like styles */
            @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
            
            /* Custom print styles */
            body { 
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
              padding: 20mm;
              background: white;
              color: #1f2937;
              width: 210mm;
              min-height: 297mm;
            }
            
            /* Resume container */
            .resume-container {
              max-width: 100%;
              margin: 0 auto;
            }
            
            /* Professional Template Specific Styles */
            .header {
              text-align: center;
              margin-bottom: 2rem;
              padding-bottom: 1.5rem;
              border-bottom: 2px solid #4f46e5;
            }
            
            .name {
              font-size: 1.875rem;
              font-weight: bold;
              color: #111827;
              margin-bottom: 0.5rem;
            }
            
            .title {
              font-size: 1.125rem;
              color: #4b5563;
              margin-bottom: 1rem;
            }
            
            .contact-info {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 0.5rem;
              font-size: 0.75rem;
              color: #6b7280;
            }
            
            /* Section styles */
            .section {
              margin-bottom: 1.5rem;
            }
            
            .section-title {
              font-size: 1.125rem;
              font-weight: bold;
              color: #111827;
              margin-bottom: 0.75rem;
              display: flex;
              align-items: center;
            }
            
            .section-title::before {
              content: "";
              width: 0.25rem;
              height: 1rem;
              background-color: #4f46e5;
              margin-right: 0.5rem;
              border-radius: 0.125rem;
            }
            
            /* Experience/Education/Project items */
            .item-card {
              background-color: #f9fafb;
              padding: 1rem;
              border-radius: 0.5rem;
              margin-bottom: 1rem;
            }
            
            .item-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 0.5rem;
            }
            
            .item-title {
              font-weight: 600;
              color: #111827;
            }
            
            .item-date {
              color: #6b7280;
              font-size: 0.875rem;
              background-color: #dbeafe;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
            }
            
            .item-company {
              color: #374151;
              font-weight: 500;
              font-size: 0.875rem;
              margin-bottom: 0.5rem;
            }
            
            .item-description {
              color: #4b5563;
              font-size: 0.875rem;
              white-space: pre-line;
            }
            
            /* Skills */
            .skills-container {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
            }
            
            .skill-tag {
              background-color: #4f46e5;
              color: white;
              padding: 0.5rem 0.75rem;
              border-radius: 9999px;
              font-size: 0.875rem;
              font-weight: 600;
            }
            
            /* Grid layout */
            .grid-container {
              display: grid;
              grid-template-columns: 2fr 1fr;
              gap: 1.5rem;
            }
            
            /* Links */
            a {
              color: #2563eb;
              text-decoration: none;
            }
            
            a:hover {
              text-decoration: underline;
            }
            
            /* Hide print button */
            button {
              display: none !important;
            }
            
            @media print {
              body {
                padding: 15mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${clone.innerHTML}
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    
    // Wait a bit for content to load then print
    setTimeout(() => {
      printWindow.print()
    }, 1000)
    
  } catch (error) {
    console.error('PDF Error:', error)
    alert('Failed to generate PDF. Please try the browser print (Ctrl+P) and choose "Save as PDF".')
  }
}

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div ref={resumeRef} className="bg-white text-gray-800 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Profile */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <div className="p-8">
            <button
              onClick={handleExportPDF}
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm mb-6"
            >
              <span>📄</span>
              <span>Save as PDF</span>
            </button>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Profile Image Section */}
              <div className="relative group">
                <div className="w-48 h-48 rounded-2xl border-4 border-white/20 bg-indigo-500 flex items-center justify-center overflow-hidden shadow-2xl">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white/60" />
                  )}
                </div>
                
                {/* Upload Button */}
                <label className="absolute bottom-4 right-4 bg-white text-indigo-600 p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform group-hover:opacity-100 opacity-0">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Personal Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-5xl font-bold mb-4">{safePersonalInfo.name}</h1>
                <p className="text-xl text-indigo-100 mb-6">{safePersonalInfo.title}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-100">
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span>📧</span>
                    </div>
                    <span>{safePersonalInfo.email}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span>📱</span>
                    </div>
                    <span>{safePersonalInfo.phone}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span>📍</span>
                    </div>
                    <span>{safePersonalInfo.location}</span>
                  </div>
                </div>

                {socialMedia && (
                  <div className="flex justify-center lg:justify-start flex-wrap gap-4 mt-6">
                    {socialMedia.linkedin && (
                      <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">LinkedIn</span>
                    )}
                    {socialMedia.github && (
                      <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">GitHub</span>
                    )}
                    {socialMedia.portfolio && (
                      <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">Portfolio</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Skills & Education */}
            <div className="lg:col-span-1 space-y-8">
              {/* Professional Summary */}
              <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-indigo-500 rounded mr-3"></div>
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Results-driven executive with extensive experience in leadership and strategic planning. 
                  Proven track record of driving growth and innovation in dynamic environments.
                </p>
              </section>

              {/* Skills */}
              {skills.length > 0 && (
                <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-indigo-500 rounded mr-3"></div>
                    Core Competencies
                  </h2>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {education.length > 0 && (
                <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-indigo-500 rounded mr-3"></div>
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-indigo-300 pl-4">
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-indigo-700 text-sm">{edu.school}</p>
                        <p className="text-gray-600 text-sm">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-indigo-500 rounded mr-3"></div>
                  Languages
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>English</span>
                    <span className="text-indigo-600 font-medium">Native</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Arabic</span>
                    <span className="text-indigo-600 font-medium">Fluent</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Experience & Projects */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experience */}
              {experience.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-indigo-800 mb-6 pb-2 border-b border-indigo-200">
                    Professional Experience
                  </h2>
                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                            <p className="text-indigo-700 font-medium text-lg">{exp.company}</p>
                          </div>
                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-indigo-800 mb-6 pb-2 border-b border-indigo-200">
                    Key Projects
                  </h2>
                  <div className="grid gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.name}</h3>
                        {project.techStack && (
                          <p className="text-indigo-700 mb-3">
                            <strong>Technologies:</strong> {project.techStack}
                          </p>
                        )}
                        <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                        <div className="flex gap-4">
                          {project.demoLink && (
                            <a href={project.demoLink} className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-1">
                              <span>Live Demo</span>
                              <span>→</span>
                            </a>
                          )}
                          {project.githubLink && (
                            <a href={project.githubLink} className="text-gray-600 hover:text-gray-800 font-medium flex items-center space-x-1">
                              <span>Source Code</span>
                              <span>→</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Achievements */}
              <section>
                <h2 className="text-2xl font-bold text-indigo-800 mb-6 pb-2 border-b border-indigo-200">
                  Awards & Recognition
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-200">
                    <h3 className="font-semibold text-indigo-900">Executive of the Year</h3>
                    <p className="text-indigo-700 text-sm">Global Business Awards 2023</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-200">
                    <h3 className="font-semibold text-indigo-900">Leadership Excellence</h3>
                    <p className="text-indigo-700 text-sm">Industry Leadership Summit 2022</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}