'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'
import { 
  Linkedin, 
  Globe, 
  Github, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Download,
  RefreshCw
} from 'lucide-react'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-[#835128] hover:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold px-3 sm:px-4 py-1.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-xs sm:text-sm"
      aria-label="Export resume as PDF"
    >
      {isExporting ? (
        <>
          <RefreshCw size={14} className="animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Download size={14} />
          <span>Save as PDF</span>
        </>
      )}
    </button>
  </div>
)

const ProfessionalTemplate = ({ resume }) => {
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
    socialMedia: resume?.socialMedia || {
      linkedin: '',
      github: '',
      portfolio: ''
    }
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
    <div className="h-px bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400 my-2" />
  )

  const renderSocialLinks = () => {
    const links = []
    if (safeData.socialMedia.linkedin) links.push(
      <a key="linkedin" href={safeData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
        <Linkedin size={11} /><span>LinkedIn</span>
      </a>
    )
    if (safeData.socialMedia.portfolio) links.push(
      <a key="portfolio" href={safeData.socialMedia.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
        <Globe size={11} /><span>Portfolio</span>
      </a>
    )
    if (safeData.personalInfo.website && !safeData.socialMedia.portfolio) links.push(
      <a key="website" href={safeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
        <Globe size={11} /><span>Website</span>
      </a>
    )
    if (safeData.socialMedia.github) links.push(
      <a key="github" href={safeData.socialMedia.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
        <Github size={11} /><span>GitHub</span>
      </a>
    )
    return links
  }

  if (!resume) return <div className="bg-white text-gray-800 p-4 sm:p-6 font-sans">Loading resume...</div>

  const socialLinks = renderSocialLinks()

  return (
    <div className="min-h-screen font-serif bg-white">
      <div ref={resumeRef} className="resume-container px-4 sm:px-6 md:px-8 pb-5 md:pb-8" style={{ paddingTop: 0 }}>

        <header className="bg-[#2C2118] text-white -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 relative">
          {/* PDF Export Button - positioned absolutely inside header on mobile */}
          <div className="print:hidden absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
            <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
          </div>
          
          <div className="text-center pt-4 sm:pt-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-0.5 break-words px-2">
              {safeData.personalInfo.name}
            </h1>
            <p className="text-amber-300 text-base sm:text-lg md:text-[20px] font-light tracking-widest break-words px-2">
              {safeData.personalInfo.title}
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4 text-xs text-amber-100 px-2">
            <span className="flex items-center gap-1 break-all"><Mail size={11} className="flex-shrink-0" />{safeData.personalInfo.email}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><Phone size={11} className="flex-shrink-0" />{safeData.personalInfo.phone}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><MapPin size={11} className="flex-shrink-0" />{safeData.personalInfo.location}</span>
            {socialLinks.length > 0 && socialLinks.map((link, index) => (
              <React.Fragment key={index}>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">{link}</span>
              </React.Fragment>
            ))}
          </div>
        </header>

        <div className="bg-white px-0 sm:px-2">
          
          {safeData.professionalSummary && (
            <section className="mb-5 sm:mb-6 mt-3 sm:mt-4">
              <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-2">ABOUT ME</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">
                {safeData.professionalSummary}
              </p>
              <AccentLine />
            </section>
          )}

          {/* Responsive Two Column Layout */}
          <div className="resume-two-column-layout">
            
            {/* Left Column */}
            <div className="min-w-0">
              {safeData.experience?.length > 0 && (
                <section className="mb-5 sm:mb-6">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">EXPERIENCE</h2>
                  <div className="space-y-4">
                    {safeData.experience.map((exp, idx) => (
                      <div key={exp.id || idx} className="experience-item border-l-2 border-amber-300 pl-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-1">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-900 break-words">
                            {exp.position}
                          </h3>
                          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded whitespace-nowrap">
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                        <p className="text-amber-800 font-medium text-sm sm:text-base mb-1 break-words">
                          {exp.company}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.projects?.length > 0 && (
                <section className="mb-5 sm:mb-6">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">SELECTED PROJECTS</h2>
                  <div className="space-y-3">
                    {safeData.projects.map((project, idx) => (
                      <div key={project.id || idx} className="project-item bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 break-words">
                          {project.name}
                        </h3>
                        {project.techStack && (
                          <p className="text-amber-700 text-xs sm:text-sm mb-1 break-words">
                            • {project.techStack}
                          </p>
                        )}
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 break-words">
                          {project.description}
                        </p>
                        {(project.demoLink || project.githubLink) && (
                          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                            {project.demoLink && (
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1 break-all">
                                <ExternalLink size={12} />Live Demo →
                              </a>
                            )}
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1 break-all">
                                <Github size={12} />GitHub →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.education?.length > 0 && (
                <section className="mb-5 sm:mb-6">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">EDUCATION</h2>
                  <div className="space-y-3">
                    {safeData.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="education-item bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                          {edu.degree}
                        </h3>
                        <p className="text-amber-800 text-xs sm:text-sm mt-1 break-words">
                          {edu.school}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                          {edu.year}
                        </p>
                        {edu.gpa && (
                          <p className="text-xs text-gray-500 mt-1">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="min-w-0">
              {safeData.skills?.length > 0 && (
                <section className="mb-5 sm:mb-6">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">SKILLS</h2>
                  <div className="flex flex-wrap gap-2">
                    {safeData.skills.map((skill, idx) => (
                      <span key={idx} className="inline-block bg-[#2C2118] text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full break-words">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {safeData.certifications?.length > 0 && (
                <section className="mb-5 sm:mb-6">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">CERTIFICATIONS</h2>
                  <div className="space-y-2">
                    {safeData.certifications.map((cert, idx) => (
                      <div key={cert.id || idx} className="cert-item bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                        <p className="font-medium text-gray-900 text-xs sm:text-sm break-words">
                          {cert.name}
                        </p>
                        <p className="text-amber-700 text-xs sm:text-sm mt-1 break-words">
                          {cert.organization}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                          {cert.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.languages?.length > 0 && (
                <section className="mb-5 sm:mb-6">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">LANGUAGES</h2>
                  <div className="space-y-2">
                    {safeData.languages.map((lang, idx) => (
                      <div key={lang.id || idx} className="language-item flex flex-wrap justify-between items-center gap-2 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800 text-xs sm:text-sm break-words">
                          {lang.language}
                        </span>
                        <span className="text-amber-700 text-xs sm:text-sm">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.interests?.length > 0 && (
                <section className="mb-5 sm:mb-6">
                  <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-3">INTERESTS</h2>
                  <div className="flex flex-wrap gap-2">
                    {safeData.interests.map((interest, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs sm:text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .resume-content {
          font-family: 'Inter', system-ui, sans-serif;
          padding-top: 0 !important;
        }
        
        .resume-two-column-layout {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 1.5rem !important;
        }
        
        /* Desktop breakpoint - switch to two columns */
        @media (min-width: 768px) {
          .resume-two-column-layout {
            grid-template-columns: 2fr 1fr !important;
            gap: 1.5rem !important;
          }
        }
        
        .resume-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .experience-item,
        .project-item,
        .education-item,
        .cert-item,
        .language-item {
          break-inside: avoid-page !important;
          page-break-inside: avoid !important;
        }
        
        h2 {
          break-after: avoid-page !important;
          page-break-after: avoid !important;
        }
        
        header {
          break-inside: avoid-page !important;
          page-break-inside: avoid !important;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          .print\\:hidden {
            display: none !important;
          }

          .resume-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 0 !important;
            padding-bottom: 20px !important;
          }

          .resume-two-column-layout {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
            gap: 20px !important;
          }

          section, .mb-5, .mb-4, .mb-2.5 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          .bg-\\[\\#2C2118\\] {
            background-color: #2C2118 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .bg-amber-50, .bg-gray-50, .bg-gray-100 {
            background-color: #f9fafb !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          p, h1, h2, h3, h4, span, a, div {
            word-wrap: break-word !important;
            word-break: break-word !important;
          }
        }

        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default ProfessionalTemplate