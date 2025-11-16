// components/templates/ModernTemplate.js 
'use client'
import { useRef } from 'react'

export default function ModernTemplate({ resume }) {
  const resumeRef = useRef(null)
  
  // Add safety checks for undefined resume
  if (!resume) {
    return (
      <div className="bg-white text-gray-800 p-8 font-sans text-center">
        <div className="text-yellow-500 text-lg">Loading resume...</div>
      </div>
    )
  }

  // Safe destructuring with fallbacks
  const { 
    personalInfo = {}, 
    experience = [], 
    education = [], 
    skills = [], 
    projects = [], 
    socialMedia = {} 
  } = resume

  // Safe personalInfo with fallbacks
  const safePersonalInfo = {
    name: personalInfo?.name || 'Your Name',
    title: personalInfo?.title || 'Professional Title',
    email: personalInfo?.email || 'your.email@example.com',
    phone: personalInfo?.phone || '+1234567890',
    location: personalInfo?.location || 'City, Country',
    ...personalInfo
  }

  // PDF Export function - WITH PROPER STYLES
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
              
              /* Header styles */
              .header {
                text-align: center;
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 2px solid #eab308;
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
                background-color: #eab308;
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
                background-color: #fef3c7;
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
                background-color: #eab308;
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
        // Optional: close window after print
        // setTimeout(() => printWindow.close(), 1000)
      }, 1000)
      
    } catch (error) {
      console.error('PDF Error:', error)
      alert('Failed to generate PDF. Please try the browser print (Ctrl+P) and choose "Save as PDF".')
    }
  }

  return (
    <div ref={resumeRef} className="bg-white text-gray-800 p-3 font-sans">
      {/* Simple Print Button */}
      <div className="text-right mb-6">
        <button
          onClick={handleExportPDF}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm"
        >
          <span>📄</span>
          <span>Save as PDF</span>
        </button>
      </div>

      {/* Rest of your resume content remains the same */}
      {/* Header */}
      <div className="text-center mt-10 mb-8 border-b-2 border-yellow-500 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{safePersonalInfo.name}</h1>
        <p className="text-lg text-gray-600 mt-1">{safePersonalInfo.title}</p>
        <div className="flex justify-center flex-wrap gap-2 mt-2 text-xs text-gray-500">
          <span>{safePersonalInfo.email}</span>
          <span>•</span>
          <span>{safePersonalInfo.phone}</span>
          <span>•</span>
          <span>{safePersonalInfo.location}</span>
        </div>
        
        {socialMedia && (
          <div className="flex justify-center flex-wrap gap-2 mt-1 text-xs">
            {socialMedia.linkedin && <span className="text-gray-600">LinkedIn: {socialMedia.linkedin}</span>}
            {socialMedia.github && <span className="text-gray-700">GitHub: {socialMedia.github}</span>}
            {socialMedia.portfolio && <span className="text-green-600">Portfolio: {socialMedia.portfolio}</span>}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-gray-500 text-sm bg-yellow-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm mb-2">{exp.company}</p>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
                Projects
              </h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                  {project.techStack && (
                    <p className="text-gray-600 text-sm mb-2">
                      <span className="font-medium">Tech Stack:</span> {project.techStack}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="flex gap-4 text-sm">
                    {project.demoLink && (
                      <a href={project.demoLink} className="text-gray-600 hover:underline">Live Demo</a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} className="text-gray-700 hover:underline">GitHub</a>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700 text-sm mt-1">{edu.school}</p>
                  <p className="text-gray-500 text-sm mt-1">{edu.year}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}