// components/templates/CreativeTemplate.js
'use client'
import { useRef } from 'react'

export default function CreativeTemplate({ resume }) {
  const resumeRef = useRef(null)
  
  if (!resume) {
    return (
      <div className="bg-white text-gray-800 p-8 font-sans text-center">
        <div className="text-gray-600 text-lg">Loading resume...</div>
      </div>
    )
  }

  const { 
    personalInfo = {}, 
    professionalSummary = '',
    experience = [], 
    education = [], 
    skills = [], 
    projects = [], 
    socialMedia = {},
    languages = [],
    certifications = [],
    achievements = [],
    interests = []
  } = resume

  const safePersonalInfo = {
    name: personalInfo?.name || 'Your Name',
    title: personalInfo?.title || 'Creative Professional',
    email: personalInfo?.email || 'your.email@example.com',
    phone: personalInfo?.phone || '+1234567890',
    location: personalInfo?.location || 'City, Country',
    ...personalInfo
  }

  // PDF Export Function
  const handleExportPDF = () => {
    try {
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
                border-bottom: 2px solid #a855f7;
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
                background-color: #a855f7;
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
                background-color: #f3e8ff;
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
                background-color: #a855f7;
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
    <div ref={resumeRef} className="bg-gradient-to-br from-gray-50 to-pink-50 text-gray-800 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={handleExportPDF}
            className="bg-gradient-to-r from-gray-600 to-pink-600 text-white font-bold px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm mb-8"
          >
            <span>📄</span>
            <span>Save as PDF</span>
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {safePersonalInfo.name}
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-medium">{safePersonalInfo.title}</p>
            
            <div className="flex justify-center flex-wrap gap-6 text-gray-600 mb-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                <span>✉️</span>
                <span>{safePersonalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                <span>📱</span>
                <span>{safePersonalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                <span>📍</span>
                <span>{safePersonalInfo.location}</span>
              </div>
            </div>

            {socialMedia && (
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {socialMedia.linkedin && (
                  <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm">LinkedIn</span>
                )}
                {socialMedia.github && (
                  <span className="text-pink-600 bg-pink-50 px-3 py-1 rounded-full text-sm">GitHub</span>
                )}
                {socialMedia.portfolio && (
                  <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm">Portfolio</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* About - Updated to use professionalSummary */}
            <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {professionalSummary || 'Creative problem-solver with a passion for innovation and design. Dedicated to creating meaningful experiences and delivering exceptional results.'}
              </p>
            </section>

            {/* Experience */}
            {experience.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <span className="text-gray-600 text-sm bg-gray-50 px-2 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700 text-sm">{edu.school}</p>
                      </div>
                      <span className="text-gray-600 font-medium text-sm">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Languages
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <div key={lang.id} className="text-center bg-gray-50 text-gray-700 py-2 rounded-lg">
                      {lang.language} <span className="text-pink-600">({lang.proficiency})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-gray-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gradient-to-r from-gray-50 to-pink-50 p-4 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                      {project.techStack && (
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>Tech:</strong> {project.techStack}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex gap-3 text-sm">
                        {project.demoLink && (
                          <a href={project.demoLink} className="text-gray-600 hover:text-gray-800 font-medium">
                            Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} className="text-gray-600 hover:text-gray-800 font-medium">
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="bg-gradient-to-r from-gray-50 to-pink-50 p-3 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                      <p className="text-gray-700 text-xs">{cert.organization}</p>
                      <p className="text-pink-600 text-xs">{cert.year}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {interests.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Interests
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest, index) => (
                    <span 
                      key={index}
                      className={`text-center py-2 rounded-lg ${
                        index % 2 === 0 
                          ? 'bg-gray-50 text-gray-700' 
                          : 'bg-pink-50 text-pink-700'
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                  Achievements
                </h2>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-gradient-to-r from-gray-50 to-pink-50 p-3 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm">{achievement.title}</h3>
                      <p className="text-gray-700 text-xs">{achievement.organization}</p>
                      <p className="text-pink-600 text-xs">{achievement.year}</p>
                      {achievement.description && (
                        <p className="text-gray-600 text-xs mt-1">{achievement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}