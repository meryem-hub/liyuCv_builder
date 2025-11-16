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

  const { 
    personalInfo = {}, 
    professionalSummary = '',
    experience = [], 
    education = [], 
    skills = [], 
    projects = [], 
    socialMedia = {},
    languages = [],
    certifications = []
  } = resume

  const safePersonalInfo = {
    name: personalInfo?.name || 'Your Name',
    title: personalInfo?.title || 'Professional Title',
    email: personalInfo?.email || 'your.email@example.com',
    phone: personalInfo?.phone || '+1234567890',
    location: personalInfo?.location || 'City, Country',
    ...personalInfo
  }

  // PDF Export Function - UPDATED
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
              /* Reset and base styles */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body { 
                font-family: system-ui, -apple-system, sans-serif;
                margin: 0;
                padding: 15mm;
                background: white;
                color: #1f2937;
                width: 210mm;
                min-height: 297mm;
                line-height: 1.6;
              }
              
              /* Resume container */
              .resume-container {
                max-width: 100%;
                margin: 0 auto;
              }
              
              /* Header styles */
              .bg-gradient-to-r {
                background: linear-gradient(to right, #4b5563, #1f2937);
                color: white;
                padding: 2rem;
                margin-bottom: 2rem;
              }
              
              .max-w-6xl {
                max-width: 72rem;
                margin: 0 auto;
              }
              
              .text-center {
                text-align: center;
              }
              
              .text-4xl {
                font-size: 2.25rem;
                font-weight: bold;
                margin-bottom: 0.75rem;
              }
              
              .text-xl {
                font-size: 1.25rem;
                color: #f3f4f6;
                margin-bottom: 1.5rem;
              }
              
              .flex {
                display: flex;
              }
              
              .justify-center {
                justify-content: center;
              }
              
              .flex-wrap {
                flex-wrap: wrap;
              }
              
              .items-center {
                align-items: center;
              }
              
              .gap-4 {
                gap: 1rem;
              }
              
              .space-x-2 > * + * {
                margin-left: 0.5rem;
              }
              
              /* Main content grid */
              .grid {
                display: grid;
              }
              
              .lg\\:grid-cols-3 {
                grid-template-columns: 2fr 1fr;
                gap: 2rem;
              }
              
              .lg\\:col-span-2 {
                grid-column: span 2 / span 2;
              }
              
              /* Section styles */
              .space-y-8 > * + * {
                margin-top: 2rem;
              }
              
              .space-y-6 > * + * {
                margin-top: 1.5rem;
              }
              
              .space-y-4 > * + * {
                margin-top: 1rem;
              }
              
              .space-y-3 > * + * {
                margin-top: 0.75rem;
              }
              
              .space-y-2 > * + * {
                margin-top: 0.5rem;
              }
              
              .text-2xl {
                font-size: 1.5rem;
                font-weight: bold;
                color: #111827;
                margin-bottom: 1.5rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #e5e7eb;
              }
              
              .text-gray-700 {
                color: #374151;
              }
              
              .text-gray-800 {
                color: #1f2937;
              }
              
              .text-gray-900 {
                color: #111827;
              }
              
              .text-gray-600 {
                color: #6b7280;
              }
              
              .leading-relaxed {
                line-height: 1.625;
              }
              
              .whitespace-pre-line {
                white-space: pre-line;
              }
              
              /* Experience items */
              .border-l-4 {
                border-left: 4px solid #6b7280;
                padding-left: 1.5rem;
              }
              
              .border-gray-500 {
                border-color: #6b7280;
              }
              
              .pl-6 {
                padding-left: 1.5rem;
              }
              
              .flex.justify-between {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 0.5rem;
              }
              
              .text-xl {
                font-size: 1.25rem;
                font-weight: 600;
              }
              
              .text-lg {
                font-size: 1.125rem;
              }
              
              .text-sm {
                font-size: 0.875rem;
              }
              
              .bg-gray-50 {
                background-color: #f9fafb;
              }
              
              .px-3 {
                padding-left: 0.75rem;
                padding-right: 0.75rem;
              }
              
              .py-1 {
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
              }
              
              .rounded {
                border-radius: 0.375rem;
              }
              
              .font-medium {
                font-weight: 500;
              }
              
              .font-semibold {
                font-weight: 600;
              }
              
              .font-bold {
                font-weight: 700;
              }
              
              /* Project cards */
              .bg-gray-50 {
                background-color: #f9fafb;
              }
              
              .p-6 {
                padding: 1.5rem;
              }
              
              .rounded-lg {
                border-radius: 0.5rem;
              }
              
              .border {
                border: 1px solid #e5e7eb;
              }
              
              .border-gray-200 {
                border-color: #e5e7eb;
              }
              
              .mb-3 {
                margin-bottom: 0.75rem;
              }
              
              .mb-4 {
                margin-bottom: 1rem;
              }
              
              /* Education items */
              .p-4 {
                padding: 1rem;
              }
              
              .bg-white {
                background-color: white;
              }
              
              /* Skills list */
              .w-2 {
                width: 0.5rem;
              }
              
              .h-2 {
                height: 0.5rem;
              }
              
              .bg-gray-500 {
                background-color: #6b7280;
              }
              
              .rounded-full {
                border-radius: 9999px;
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
              
              /* Margin and padding utilities */
              .p-8 {
                padding: 2rem;
              }
              
              .mb-6 {
                margin-bottom: 1.5rem;
              }
              
              .pb-2 {
                padding-bottom: 0.5rem;
              }
              
              .mt-4 {
                margin-top: 1rem;
              }
              
              .ml-auto {
                margin-left: auto;
              }
              
              /* Flex utilities */
              .flex.items-center.space-x-3 > * + * {
                margin-left: 0.75rem;
              }
              
              /* Grid gap */
              .gap-8 {
                gap: 2rem;
              }
              
              .gap-6 {
                gap: 1.5rem;
              }
              
              /* Print specific styles */
              @media print {
                body {
                  padding: 10mm;
                  width: 100%;
                  min-height: 100%;
                }
                
                .bg-gradient-to-r {
                  background: linear-gradient(to right, #4b5563, #1f2937) !important;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                
                /* Ensure proper page breaks */
                .resume-container {
                  page-break-inside: avoid;
                }
                
                section {
                  page-break-inside: avoid;
                }
                
                /* Prevent elements from being cut off */
                .lg\\:grid-cols-3 {
                  grid-template-columns: 2fr 1fr;
                }
              }
              
              /* Force grid layout for PDF */
              @media all {
                .grid {
                  display: grid !important;
                }
                
                .lg\\:grid-cols-3 {
                  grid-template-columns: 2fr 1fr !important;
                }
                
                .lg\\:col-span-2 {
                  grid-column: 1 / span 2 !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="resume-container">
              ${clone.innerHTML}
            </div>
            <script>
              // Force proper layout before printing
              setTimeout(() => {
                window.print();
              }, 500);
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
      
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
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {professionalSummary || 'Experienced professional with a proven track record of delivering exceptional results. Passionate about innovation and continuous improvement.'}
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
            {languages.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                  Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between">
                      <span className="text-gray-700">{lang.language}</span>
                      <span className="text-gray-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-gray-700">
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-600">{cert.organization} • {cert.year}</div>
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