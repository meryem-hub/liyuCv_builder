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
      className="bg-[#835128] hover:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold px-4 py-1.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-1sm"
      aria-label="Export resume as PDF"
    >
      {isExporting ? (
        <>
          <RefreshCw size={16} className="animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Download size={16} />
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

  if (!resume) return <div className="bg-white text-gray-800 p-6 font-sans">Loading resume...</div>

  const socialLinks = renderSocialLinks()

  return (
    <div className="min-h-screen font-serif">
<div ref={resumeRef} className="resume-container px-7 pb-5 md:px-9" style={{ paddingTop: 0 }}>

        <header className="bg-[#2C2118] text-white  md:-mx-9 px-7 py-10">
        <div className="print:hidden absolute top-4 right-4 z-10">
                  <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
</div>
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white mb-0.5">
              {safeData.personalInfo.name}
            </h1>
            <p className="text-amber-300 text-[20px] font-light tracking-widest">
              {safeData.personalInfo.title}
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2 mt-2 text-0.5xs text-amber-100">
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

        <div className="bg-white">
          
          {safeData.professionalSummary && (
            <section className="mb-5">
              <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-2 mt-3">ABOUT ME</h2>
              <p className="text-gray-700 leading-relaxed text-1sm">
                {safeData.professionalSummary}
              </p>
              <AccentLine />
            </section>
          )}

          <div className="resume-two-column-layout">
            
            <div className="flex-1 min-w-0">
              {safeData.experience?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-3">EXPERIENCE</h2>
                  <div className="space-y-4">
                    {safeData.experience.map((exp, idx) => (
                      <div key={exp.id || idx} className="experience-item border-l-2 border-amber-300 pl-3">
                        <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                          <h3 className="font-semibold text-1sm text-gray-900">{exp.position}</h3>
                          <span className="text-0.5xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded">
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                        <p className="text-amber-800 font-medium text-1sm mb-1">{exp.company}</p>
                        <p className="text-gray-600 text-0.5xs leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.projects?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-3">SELECTED PROJECTS</h2>
                  <div className="space-y-3">
                    {safeData.projects.map((project, idx) => (
                      <div key={project.id || idx} className="project-item bg-gray-50 p-3 rounded">
                        <h3 className="font-semibold text-gray-900 text-1sm mb-1">{project.name}</h3>
                        {project.techStack && <p className="text-amber-700 text-0.5xs mb-1">• {project.techStack}</p>}
                        <p className="text-gray-600 text-0.3xs leading-relaxed mb-1">{project.description}</p>
                        {(project.demoLink || project.githubLink) && (
                          <div className="flex gap-3 text-0.5xs">
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
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-3">EDUCATION</h2>
                  <div className="space-y-3">
                    {safeData.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="education-item bg-gray-50 p-3 rounded">
                        <h3 className="font-semibold text-gray-900 text-1sm">{edu.degree}</h3>
                        <p className="text-amber-800 text-0.5xs mt-1">{edu.school}</p>
                        <p className="text-gray-500 text-0.5xs mt-1">{edu.year}</p>
                        {edu.gpa && <p className="text-0.5xs text-gray-500 mt-1">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="w-72 shrink-0 min-w-0">
              {safeData.skills?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-3">SKILLS</h2>
                  <div className="flex flex-wrap gap-2">
                    {safeData.skills.map((skill, idx) => (
                      <span key={idx} className="inline-block bg-[#2C2118] text-white text-0.5xs px-4 py-1.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {safeData.certifications?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-3">CERTIFICATIONS</h2>
                  <div className="space-y-2">
                    {safeData.certifications.map((cert, idx) => (
                      <div key={cert.id || idx} className="cert-item bg-gray-50 p-2.5 rounded">
                        <p className="font-medium text-gray-900 text-0.5xs">{cert.name}</p>
                        <p className="text-amber-700 text-0.5xs mt-1">{cert.organization}</p>
                        <p className="text-gray-500 text-0.5xs mt-1">{cert.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.languages?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-3">LANGUAGES</h2>
                  <div className="space-y-2">
                    {safeData.languages.map((lang, idx) => (
                      <div key={lang.id || idx} className="language-item flex justify-between items-center p-2.5 bg-gray-50 rounded">
                        <span className="font-medium text-gray-800 text-0.5xs">{lang.language}</span>
                        <span className="text-amber-700 text-0.5xs">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.interests?.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[#2C2118] text-0.5xs font-bold tracking-[3px] mb-3">INTERESTS</h2>
                  <div className="flex flex-col gap-2">
                    {safeData.interests.map((interest, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-0.5xs w-fit">
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
          grid-template-columns: 2fr 1fr !important;
          gap: 20px !important;
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
            padding-left: 25px !important;
            padding-right: 25px !important;
            padding-top: 28px !important;
            padding-bottom: 28px !important;
          }

          .resume-two-column-layout {
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
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
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