// components/templates/ElegantBrownMinimalTemplate.js
'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-[#2C2118] hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold px-4 py-1.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm"
      aria-label="Export resume as PDF"
    >
      <span aria-hidden="true">{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

const ElegantBrownMinimalTemplate = ({ resume }) => {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  const safeData = {
    personalInfo: {
      name: resume?.personalInfo?.name || 'Bailey Dupont',
      title: resume?.personalInfo?.title || 'Graphic Designer',
      email: resume?.personalInfo?.email || 'hello@baileydupont.com',
      phone: resume?.personalInfo?.phone || '+1 (234) 567-8901',
      location: resume?.personalInfo?.location || 'New York, USA',
      website: resume?.personalInfo?.website || '',
      ...resume?.personalInfo
    },
    professionalSummary: resume?.professionalSummary || '',
    experience: resume?.experience || [],
    education: resume?.education || [],
    skills: resume?.skills || [],
    projects: resume?.projects || [],
    languages: resume?.languages || [],
    certifications: resume?.certifications || [],
    interests: resume?.interests || [],
    socialMedia: resume?.socialMedia || {}
  }

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    const fileName = `${safeData.personalInfo.name.replace(/\s+/g, '-')}-resume.pdf`
    
    setIsExporting(true)
    try {
      await exportToPDF(resumeRef.current, fileName)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return null
    if (!endDate || endDate.trim() === '') return startDate
    if (endDate === 'Present') return `${startDate} — Present`
    return `${startDate} — ${endDate}`
  }

  const AccentLine = () => (
    <div className="h-px bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400 my-5" />
  )

  if (!resume) {
    return (
      <div className="bg-white text-gray-800 p-6 font-sans">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-3">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen font-serif p-4">
      <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
      
      <div ref={resumeRef} className="resume-content  mx-auto bg-white shadow-2xl overflow-hidden">
        
        {/* Header - Dark Brown with Gold Accent */}
        <header className="bg-[#2C2118] text-white py-8 px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full -translate-y-1/3 translate-x-1/3" />
          
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
              {safeData.personalInfo.name}
            </h1>
            <p className="text-amber-300 text-base font-light tracking-widest">
              {safeData.personalInfo.title}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex justify-center flex-wrap gap-4 mt-5 text-xs text-amber-100">
            <span>{safeData.personalInfo.email}</span>
            <span>•</span>
            <span>{safeData.personalInfo.phone}</span>
            <span>•</span>
            <span>{safeData.personalInfo.location}</span>
            {safeData.personalInfo.website && (
              <>
                <span>•</span>
                <a href={safeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Portfolio
                </a>
              </>
            )}
          </div>
        </header>

        <div className="px-8 py-6 bg-white">
          
          {/* Professional Summary */}
          {safeData.professionalSummary && (
            <section className="mb-6">
              <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-2">ABOUT ME</h2>
              <p className="text-gray-700 leading-relaxed text-xs">
                {safeData.professionalSummary}
              </p>
              <AccentLine />
            </section>
          )}

          <div className="resume-two-column-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', width: '100%' }}>
            
            {/* Left Column - Main Content */}
            <div style={{ minWidth: 0 }}>
              
              {/* Experience */}
              {safeData.experience?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">EXPERIENCE</h2>
                  <div className="space-y-4">
                    {safeData.experience.map((exp, idx) => (
                      <div key={exp.id || idx} className="border-l-2 border-amber-300 pl-3">
                        <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                          <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded">
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                        <p className="text-amber-800 font-medium text-xs mb-1.5">{exp.company}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {safeData.projects?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">SELECTED PROJECTS</h2>
                  <div className="space-y-3">
                    {safeData.projects.map((project, idx) => (
                      <div key={project.id || idx} className="bg-gray-50 p-3 rounded">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{project.name}</h3>
                        {project.techStack && (
                          <p className="text-amber-700 text-xs mb-1.5">• {project.techStack}</p>
                        )}
                        <p className="text-gray-600 text-xs leading-relaxed mb-1.5">{project.description}</p>
                        {(project.demoLink || project.githubLink) && (
                          <div className="flex gap-3 text-xs">
                            {project.demoLink && (
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">
                                Live Demo →
                              </a>
                            )}
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">
                                GitHub →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {safeData.education?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">EDUCATION</h2>
                  <div className="space-y-2">
                    {safeData.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="bg-gray-50 p-3 rounded">
                        <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                        <p className="text-amber-800 text-xs mt-0.5">{edu.school}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{edu.year}</p>
                        {edu.gpa && <p className="text-xs text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div style={{ minWidth: 0 }}>
              
              {/* Skills */}
              {safeData.skills?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">SKILLS</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {safeData.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="inline-block bg-[#2C2118] text-white text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {safeData.certifications?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">CERTIFICATIONS</h2>
                  <div className="space-y-2">
                    {safeData.certifications.map((cert, idx) => (
                      <div key={cert.id || idx} className="bg-gray-50 p-2 rounded">
                        <p className="font-medium text-gray-900 text-xs">{cert.name}</p>
                        <p className="text-amber-700 text-xs mt-0.5">{cert.organization}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{cert.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {safeData.languages?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">LANGUAGES</h2>
                  <div className="space-y-1.5">
                    {safeData.languages.map((lang, idx) => (
                      <div key={lang.id || idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium text-gray-800 text-xs">{lang.language}</span>
                        <span className="text-amber-700 text-xs">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Interests */}
              {safeData.interests?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">INTERESTS</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {safeData.interests.map((interest, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-1 bg-gradient-to-r from-[#2C2118] via-amber-700 to-amber-500" />
      </div>

      <style jsx>{`
        .resume-content {
          font-family: 'Inter', system-ui, sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Playfair Display', serif;
        }
        
        /* Print styles - Critical for PDF */
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .resume-content {
            box-shadow: none;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          
          /* Force grid layout in print */
          .resume-two-column-layout {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
            gap: 24px !important;
            page-break-inside: avoid !important;
          }
          
          /* Prevent page breaks */
          section, .space-y-4 > div, .space-y-3 > div, .space-y-2 > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Force background colors */
          .bg-\\[\\#2C2118\\] {
            background-color: #2C2118 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-amber-50 {
            background-color: #fffbeb !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-gray-50 {
            background-color: #f9fafb !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .text-amber-700 {
            color: #b45309 !important;
          }
          
          .text-amber-300 {
            color: #fcd34d !important;
          }
          
          /* Remove shadows */
          .shadow-2xl, .shadow-lg {
            box-shadow: none !important;
          }
          
          /* Optimize spacing for print */
          .px-8 {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          .py-8 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }
          
          .py-6 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }
          
          /* Optimize font sizes for print */
          .text-3xl {
            font-size: 16pt !important;
          }
          
          .text-base {
            font-size: 11pt !important;
          }
          
          .text-sm {
            font-size: 10pt !important;
          }
          
          .text-xs {
            font-size: 9pt !important;
          }
        }
        
        @page {
          size: A4;
          margin: 12mm;
        }
      `}</style>
    </div>
  )
}

export default ElegantBrownMinimalTemplate