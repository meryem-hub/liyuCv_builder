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
  ExternalLink 
} from 'lucide-react'

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
    if (safeData.socialMedia.linkedin) links.push(<a key="linkedin" href={safeData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1"><Linkedin size={11} /><span>LinkedIn</span></a>)
    if (safeData.socialMedia.portfolio) links.push(<a key="portfolio" href={safeData.socialMedia.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1"><Globe size={11} /><span>Portfolio</span></a>)
    if (safeData.personalInfo.website && !safeData.socialMedia.portfolio) links.push(<a key="website" href={safeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1"><Globe size={11} /><span>Website</span></a>)
    if (safeData.socialMedia.github) links.push(<a key="github" href={safeData.socialMedia.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1"><Github size={11} /><span>GitHub</span></a>)
    return links
  }

  if (!resume) return <div className="bg-white text-gray-800 p-6 font-sans">Loading resume...</div>

  const socialLinks = renderSocialLinks()

  return (
    <div className="bg-white min-h-screen font-serif">
      <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
      
      <div ref={resumeRef} className="resume-content bg-white">
        
        <div className="pdf-page">
          <header className="bg-[#2C2118] text-white py-4 px-7">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white mb-0.5">
                {safeData.personalInfo.name}
              </h1>
              <p className="text-amber-300 text-[15px] font-light tracking-widest">
                {safeData.personalInfo.title}
              </p>
            </div>

            {/* Contact info - reduced space */}
            <div className="flex justify-center flex-wrap gap-2 mt-2 text-xs text-amber-100">
              <span className="flex items-center gap-1"><Mail size={11} />{safeData.personalInfo.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Phone size={11} />{safeData.personalInfo.phone}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{safeData.personalInfo.location}</span>
              {socialLinks.length > 0 && socialLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <span>•</span>
                  {link}
                </React.Fragment>
              ))}
            </div>
          </header>

          <div className="px-6 py-4 bg-white">
            
            {safeData.professionalSummary && (
              <section className="mb-4">
                <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">ABOUT ME</h2>
                <p className="text-gray-700 leading-relaxed text-xs">
                  {safeData.professionalSummary}
                </p>
                <AccentLine />
              </section>
            )}

            <div className="flex gap-5 resume-two-column-layout">
              
              {/* Left Column */}
              <div className="flex-1 min-w-0">
                {safeData.experience?.length > 0 && (
                  <section className="mb-3">
                    <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">EXPERIENCE</h2>
                    <div className="space-y-3">
                      {safeData.experience.map((exp, idx) => (
                        <div key={exp.id || idx} className="experience-item border-l-2 border-amber-300 pl-3">
                          <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                            <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                            <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded">
                              {formatDateRange(exp.startDate, exp.endDate)}
                            </span>
                          </div>
                          <p className="text-amber-800 font-medium text-0.5xl mb-0.5">{exp.company}</p>
                          <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {safeData.projects?.length > 0 && (
                  <section className="mb-3">
                    <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">SELECTED PROJECTS</h2>
                    <div className="space-y-2">
                      {safeData.projects.map((project, idx) => (
                        <div key={project.id || idx} className="project-item bg-gray-50 p-2.5 rounded">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{project.name}</h3>
                          {project.techStack && <p className="text-amber-700 text-xs mb-0.5">• {project.techStack}</p>}
                          <p className="text-gray-600 text-xs leading-relaxed mb-1">{project.description}</p>
                          {(project.demoLink || project.githubLink) && (
                            <div className="flex gap-3 text-xs">
                              {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1"><ExternalLink size={10} />Live Demo →</a>}
                              {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline flex items-center gap-1"><Github size={10} />GitHub →</a>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {safeData.education?.length > 0 && (
                  <section className="mb-3">
                    <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">EDUCATION</h2>
                    <div className="space-y-2">
                      {safeData.education.map((edu, idx) => (
                        <div key={edu.id || idx} className="education-item bg-gray-50 p-2 rounded">
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

              {/* Right Column */}
              <div className="w-72 shrink-0 min-w-0">
                {safeData.skills?.length > 0 && (
                  <section className="mb-3">
                    <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">SKILLS</h2>
                    <div className="flex flex-wrap gap-1.5">
                      {safeData.skills.map((skill, idx) => (
                        <span key={idx} className="inline-block bg-[#2C2118] text-white text-xs px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {safeData.certifications?.length > 0 && (
                  <section className="mb-3">
                    <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">CERTIFICATIONS</h2>
                    <div className="space-y-1.5">
                      {safeData.certifications.map((cert, idx) => (
                        <div key={cert.id || idx} className="cert-item bg-gray-50 p-2 rounded">
                          <p className="font-medium text-gray-900 text-xs">{cert.name}</p>
                          <p className="text-amber-700 text-xs mt-0.5">{cert.organization}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{cert.year}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {safeData.languages?.length > 0 && (
                  <section className="mb-3">
                    <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">LANGUAGES</h2>
                    <div className="space-y-1">
                      {safeData.languages.map((lang, idx) => (
                        <div key={lang.id || idx} className="language-item flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-medium text-gray-800 text-xs">{lang.language}</span>
                          <span className="text-amber-700 text-xs">{lang.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {safeData.interests?.length > 0 && (
                  <section className="mb-3">
                    <h2 className="text-[#2C2118] text-xs font-bold tracking-[3px] mb-1">INTERESTS</h2>
                    <div className="flex flex-wrap gap-1.5">
                      {safeData.interests.map((interest, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
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
      </div>

      <style jsx>{`
        .resume-content {
          font-family: 'Inter', system-ui, sans-serif;
        }
        
        .resume-two-column-layout {
          display: grid !important;
          grid-template-columns: 2fr 1fr !important;
          gap: 22px !important;
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
        
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          
          .pdf-page {
            padding: 0 !important;
          }
          
          .resume-two-column-layout {
            gap: 22px !important;
          }
          
          p, li, .text-xs {
            orphans: 3;
            widows: 3;
          }
        }
        
        @page {
          size: A4;
          margin: 8mm;
        }
      `}</style>
    </div>
  )
}

export default ProfessionalTemplate