'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-[#C47D4A] hover:bg-[#B06A3A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 flex items-center space-x-2 ml-auto text-sm tracking-wide"
      aria-label="Export resume as PDF"
    >
      <span aria-hidden="true">{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

const ExecutiveTemplate = ({ resume }) => {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  const safeData = {
    personalInfo: {
      firstName: resume?.personalInfo?.firstName || '',
      lastName: resume?.personalInfo?.lastName || '',
      name: resume?.personalInfo?.name || '',
      title: resume?.personalInfo?.title || '',
      email: resume?.personalInfo?.email || '',
      phone: resume?.personalInfo?.phone || '',
      location: resume?.personalInfo?.location || '',
      linkedin: resume?.personalInfo?.linkedin || '',
      github: resume?.personalInfo?.github || '',
      website: resume?.personalInfo?.website || '',
      ...resume?.personalInfo
    },
    professionalSummary: resume?.professionalSummary || '',
    experience: resume?.experience || [],
    education: resume?.education || [],
    skills: resume?.skills || [],
    projects: resume?.projects || [],
    certifications: resume?.certifications || [],
    languages: resume?.languages || [],
    interests: resume?.interests || []
  }

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    const fileName = `${safeData.personalInfo.firstName || 'resume'}-${safeData.personalInfo.lastName || 'export'}-resume.pdf`
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

  const midPoint = Math.ceil(safeData.skills.length / 2)
  const leftSkills = safeData.skills.slice(0, midPoint)
  const rightSkills = safeData.skills.slice(midPoint)

  if (!resume) {
    return <div className="bg-[#FAF7F2] min-h-screen p-8">Loading resume...</div>
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />

      <div 
        ref={resumeRef} 
        className="resume-content max-w-5xl mx-auto px-6 py-5 bg-[#FAF7F2]"
      >
        
        {/* Header - Very tight */}
        <div className="mb-5">
          <h1 className="text-5xl font-light tracking-tight text-[#2C2C2C] leading-none">
            <span className="font-light">{safeData.personalInfo.firstName} </span>
            <span className="font-bold text-[#C47D4A]">{safeData.personalInfo.lastName}</span>
          </h1>
          <div className="flex items-center gap-3 mt-2.5">
            <div className="w-10 h-px bg-[#C47D4A]"></div>
            <p className="text-xs uppercase tracking-[2px] text-[#6B5A4B] font-light">{safeData.personalInfo.title}</p>
          </div>
        </div>

        {/* Contact Row - Tightened */}
        <div className="flex flex-wrap justify-start gap-6 mb-5 text-xs text-[#4A3B2E] border-b border-[#E8E0D5] pb-3">
          {safeData.personalInfo.email && <span>{safeData.personalInfo.email}</span>}
          {safeData.personalInfo.phone && <span>{safeData.personalInfo.phone}</span>}
          {safeData.personalInfo.location && <span>{safeData.personalInfo.location}</span>}
          {safeData.personalInfo.linkedin && <span>{safeData.personalInfo.linkedin}</span>}
          {safeData.personalInfo.github && <span>{safeData.personalInfo.github}</span>}
        </div>

        {/* About */}
        {safeData.professionalSummary && (
          <div className="mb-5">
            <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2 tracking-[2px] uppercase">About</h2>
            <p className="text-sm text-[#3A2E24] leading-relaxed">{safeData.professionalSummary}</p>
          </div>
        )}

        {/* Two-column layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '24px' 
        }}>
          
          {/* Left Column */}
          <div style={{ minWidth: 0 }}>
            {safeData.experience?.length > 0 && (
              <section className="mb-5">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2.5 tracking-[2px] uppercase">Experience</h2>
                <div className="space-y-4">
                  {safeData.experience.map((exp) => (
                    <div 
                      key={exp.id} 
                      style={{ paddingLeft: '16px', borderLeft: '1px solid #E8E0D5' }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h3 className="font-semibold text-base text-[#2C2C2C]">{exp.position}</h3>
                        <span className="text-[11px] text-[#8B735A]" style={{ fontFamily: 'monospace' }}>
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B5A4B] mb-1">{exp.company}</p>
                      <p className="text-sm text-[#4A3B2E] leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {safeData.projects?.length > 0 && (
              <section className="mb-5">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2.5 tracking-[2px] uppercase">Projects</h2>
                <div className="space-y-4">
                  {safeData.projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-semibold text-base text-[#2C2C2C] mb-1">{project.name}</h3>
                      <p className="text-sm text-[#4A3B2E] leading-relaxed mb-2">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-[11px] text-[#8B735A]" style={{ fontFamily: 'monospace' }}>/{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div>
            {safeData.education?.length > 0 && (
              <section className="mb-5">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2.5 tracking-[2px] uppercase">Education</h2>
                <div className="space-y-4">
                  {safeData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-sm text-[#2C2C2C]">{edu.degree}</h3>
                      <p className="text-sm text-[#6B5A4B]">{edu.school}</p>
                      <p className="text-[11px] text-[#8B735A] mt-0.5" style={{ fontFamily: 'monospace' }}>{edu.year}</p>
                      {edu.gpa && <p className="text-[11px] text-[#8B735A] mt-0.5">GPA: {edu.gpa}</p>}
                      {edu.honors && <p className="text-[11px] text-[#8B735A]">{edu.honors}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {safeData.skills?.length > 0 && (
              <section className="mb-5">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2.5 tracking-[2px] uppercase">Technical Skills</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div>
                    {leftSkills.map((skill, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          paddingTop: '5px', 
                          paddingBottom: '5px', 
                          borderBottom: '1px solid #E8E0D5',
                          fontSize: '13px',
                          color: '#4A3B2E'
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  <div>
                    {rightSkills.map((skill, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          paddingTop: '5px', 
                          paddingBottom: '5px', 
                          borderBottom: '1px solid #E8E0D5',
                          fontSize: '13px',
                          color: '#4A3B2E'
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {safeData.certifications?.length > 0 && (
              <section className="mb-5">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2.5 tracking-[2px] uppercase">Certifications</h2>
                <div className="space-y-3">
                  {safeData.certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="font-medium text-sm text-[#2C2C2C]">{cert.name}</p>
                      <p className="text-xs text-[#6B5A4B]">{cert.organization}</p>
                      {cert.year && <p className="text-[11px] text-[#8B735A]">{cert.year}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {safeData.languages?.length > 0 && (
              <section className="mb-5">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2.5 tracking-[2px] uppercase">Languages</h2>
                <div className="space-y-2">
                  {safeData.languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="text-sm text-[#2C2C2C]">{lang.language}</span>
                      {lang.proficiency && <span className="text-xs text-[#8B735A]">{lang.proficiency}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {safeData.interests?.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-2.5 tracking-[2px] uppercase">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {safeData.interests.map((interest, idx) => (
                    <span key={idx} className="text-sm text-[#4A3B2E]">• {interest}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .resume-content {
          font-family: 'Inter', system-ui, sans-serif;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          .resume-content {
            padding-left: 25px !important;
            padding-right: 25px !important;
            padding-top: 25px !important;
            padding-bottom: 25px !important;
          }
          
          section, .mb-5, .mb-4 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          p, li, .text-xs {
            orphans: 3;
            widows: 3;
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

export default ExecutiveTemplate