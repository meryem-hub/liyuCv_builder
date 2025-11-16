// components/templates/ProfessionalTemplate.js
'use client'
import { useRef } from 'react'

export default function ProfessionalTemplate({ resume }) {
  const resumeRef = useRef(null)
  
  if (!resume) {
    return (
      <div className="bg-white text-gray-800 p-3 font-sans text-center">
        <div className="text-gray-600 text-lg">Loading resume...</div>
      </div>
    )
  }

  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], socialMedia = {} } = resume

  const safePersonalInfo = {
    name: personalInfo?.name || 'Your Name',
    title: personalInfo?.title || 'Professional Title',
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
              border-bottom: 2px solid #2563eb;
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
              background-color: #2563eb;
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
              background-color: #2563eb;
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

  return (
    <div ref={resumeRef} className="bg-white text-gray-800 font-sans min-h-screen">
      {/* Header with gray Gradient */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleExportPDF}
            className="bg-white text-gray-600 hover:bg-gray-50 font-bold px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm mb-6"
          >
            <span>📄</span>
            <span>Save as PDF</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3">{safePersonalInfo.name}</h1>
            <p className="text-xl text-gray-100 mb-6">{safePersonalInfo.title}</p>
            <div className="flex justify-center flex-wrap gap-4 text-gray-100">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>{safePersonalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>{safePersonalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>{safePersonalInfo.location}</span>
              </div>
            </div>
            
            {socialMedia && (
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {socialMedia.linkedin && (
                  <span className="text-gray-100">LinkedIn: {socialMedia.linkedin}</span>
                )}
                {socialMedia.github && (
                  <span className="text-gray-100">GitHub: {socialMedia.github}</span>
                )}
                {socialMedia.portfolio && (
                  <span className="text-gray-100">Portfolio: {socialMedia.portfolio}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Experienced professional with a proven track record of delivering exceptional results. 
                Passionate about innovation and continuous improvement.
              </p>
            </section>

            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-gray-500 pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                        <span className="text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-lg text-gray-700 font-medium mb-3">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                  Projects
                </h2>
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.name}</h3>
                      {project.techStack && (
                        <p className="text-gray-700 mb-3">
                          <strong>Tech Stack:</strong> {project.techStack}
                        </p>
                      )}
                      <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex gap-4">
                        {project.demoLink && (
                          <a href={project.demoLink} className="text-gray-600 hover:text-gray-800 font-medium">
                            Live Demo →
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} className="text-gray-600 hover:text-gray-800 font-medium">
                            Source Code →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start p-4 bg-white border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.school}</p>
                      </div>
                      <span className="text-gray-600 font-medium">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                  Skills & Expertise
                </h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                Languages
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">English</span>
                  <span className="text-gray-600">Fluent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Arabic</span>
                  <span className="text-gray-600">Native</span>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                Certifications
              </h2>
              <div className="space-y-3">
                <div className="text-gray-700">
                  <div className="font-medium">AWS Certified Solutions Architect</div>
                  <div className="text-sm text-gray-600">2023</div>
                </div>
                <div className="text-gray-700">
                  <div className="font-medium">Google Professional Cloud Architect</div>
                  <div className="text-sm text-gray-600">2022</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}