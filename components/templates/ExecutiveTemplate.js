'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'
import { Download, RefreshCw, Mail, Phone, MapPin, Linkedin, Github, Award, BookOpen, Globe, Star, GraduationCap, Calendar, ExternalLink } from 'lucide-react'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-[#C47D4A] hover:bg-[#B06A3A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-3 sm:px-4 py-1.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-xs sm:text-sm"
      aria-label="Export resume as PDF"
    >
      {isExporting ? (
        <RefreshCw size={14} className="animate-spin" />
      ) : (
        <Download size={14} />
      )}
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
    interests: resume?.interests || [],
    socialMedia: resume?.socialMedia || {
      linkedin: '',
      github: '',
      portfolio: ''
    }
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

  if (!resume) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen p-4 sm:p-8">
        <div className="animate-pulse max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF7F2] font-sans print:bg-[#FAF7F2] min-h-screen">
      <div ref={resumeRef} className="resume-container px-4 sm:px-6 md:px-8 lg:px-9 py-5 sm:py-6 md:py-8 print:min-h-screen print:h-full" style={{ margin: '0 auto', background: '#FAF7F2' }}>
        
        {/* PDF Export Button - positioned absolutely for mobile */}
        <div className="print:hidden sticky top-0 z-10 flex justify-end pb-2 bg-[#FAF7F2]/95 backdrop-blur-sm">
          <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
        </div>

        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 sm:w-16 h-px bg-[#C47D4A]"></div>
            <div className="w-2 h-2 rounded-full bg-[#C47D4A] mx-2"></div>
            <div className="w-12 sm:w-16 h-px bg-[#C47D4A]"></div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C2C2C] tracking-tight mt-0 mb-2 break-words">
            <span className="font-light hover:text-[#C47D4A] transition-colors duration-300">{safeData.personalInfo.firstName} </span>
            <span className="font-bold bg-gradient-to-r from-[#C47D4A] to-[#E8A87C] bg-clip-text text-transparent">{safeData.personalInfo.lastName}</span>
          </h1>
          
          <div className="relative inline-block mt-2">
            <p className="text-sm font-medium text-[#6B5A4B] tracking-wide px-4 py-1 break-words">
              {safeData.personalInfo.title}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C47D4A] to-transparent"></div>
          </div>
          
          {/* Contact Information Row - Responsive wrapping */}
          <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mt-4 text-xs">
            {safeData.personalInfo.email && (
              <a href={`mailto:${safeData.personalInfo.email}`} className="flex items-center gap-1.5 text-[#4A3B2E] hover:text-[#C47D4A] transition-colors duration-200 group">
                <Mail size={12} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="break-all">{safeData.personalInfo.email}</span>
              </a>
            )}
            
            {safeData.personalInfo.phone && (
              <a href={`tel:${safeData.personalInfo.phone}`} className="flex items-center gap-1.5 text-[#4A3B2E] hover:text-[#C47D4A] transition-colors duration-200 group">
                <Phone size={12} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>{safeData.personalInfo.phone}</span>
              </a>
            )}
            
            {safeData.personalInfo.location && (
              <span className="flex items-center gap-1.5 text-[#4A3B2E]">
                <MapPin size={12} className="flex-shrink-0" />
                <span className="break-words">{safeData.personalInfo.location}</span>
              </span>
            )}
            
            {safeData.personalInfo.linkedin && (
              <a href={safeData.personalInfo.linkedin.startsWith('http') ? safeData.personalInfo.linkedin : `https://${safeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#4A3B2E] hover:text-[#C47D4A] transition-colors duration-200 group">
                <Linkedin size={12} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>LinkedIn</span>
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            )}
            
            {safeData.personalInfo.github && (
              <a href={safeData.personalInfo.github.startsWith('http') ? safeData.personalInfo.github : `https://${safeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#4A3B2E] hover:text-[#C47D4A] transition-colors duration-200 group">
                <Github size={12} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>GitHub</span>
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            )}
          </div>
        </div>

        {/* About Section */}
        {safeData.professionalSummary && (
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C47D4A]"></div>
              <h2 className="text-xs font-bold text-[#C47D4A] tracking-[3px] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C47D4A]"></span>
                About
                <span className="w-1.5 h-1.5 rounded-full bg-[#C47D4A]"></span>
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C47D4A]"></div>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-[#E8E0D5]" style={{ backgroundColor: '#FAF7F2' }}>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed text-center print:text-black break-words">
                {safeData.professionalSummary}
              </p>
            </div>
          </section>
        )}

        {/* TWO-COLUMN LAYOUT - Responsive */}
        <div className="resume-two-column-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', width: '100%' }}>
          
          {/* Left Column - Full width on mobile */}
          <div style={{ minWidth: 0 }}>
            {/* Experience */}
            {safeData.experience?.length > 0 && (
              <section className="mb-6 sm:mb-8">
                <h2 className="text-xs font-bold text-[#C47D4A] mb-3 flex items-center uppercase tracking-widest">
                  <div className="w-1 h-3 bg-[#C47D4A] mr-2 rounded-full" />
                  Experience
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {safeData.experience.map((exp) => (
                    <div key={exp.id} className="p-3 sm:p-4 rounded border-b border-dashed border-[#E8E0D5]">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 className="font-serif font-bold text-[#2C2C2C] text-base sm:text-lg italic tracking-wide border-l-3 border-[#C47D4A] pl-2 break-words">
                          {exp.position}
                        </h3>
                        <span className="text-gray-500 text-xs px-2 py-0.5 rounded-full bg-white shadow-sm flex items-center gap-1 whitespace-nowrap">
                          <Calendar size={10} /> {formatDateRange(exp.startDate, exp.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium text-xs sm:text-sm mb-2 break-words">{exp.company}</p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {safeData.projects?.length > 0 && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-[#C47D4A]"></div>
                  <h2 className="text-xs font-bold text-[#C47D4A] tracking-[3px] uppercase">Projects</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C47D4A] to-transparent"></div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {safeData.projects.map((project) => (
                    <div key={project.id} className="p-3 sm:p-4 rounded-lg bg-[#FFF8F0] border border-[#E8E0D5] hover:shadow-md transition-all duration-300">
                      <h3 className="font-bold text-[#C47D4A] text-sm sm:text-base mb-2 flex items-center gap-2 break-words">
                        <Star size={12} className="fill-[#C47D4A] flex-shrink-0" />
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 break-words">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-xs text-[#C47D4A] font-mono bg-white/80 px-2 py-0.5 rounded-full border border-[#E8E0D5] break-words">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Full width on mobile */}
          <div style={{ minWidth: 0 }}>
            {/* Education */}
            {safeData.education?.length > 0 && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-[#C47D4A]"></div>
                  <h2 className="text-xs font-bold text-[#C47D4A] tracking-[3px] uppercase flex items-center gap-1">
                    <GraduationCap size={12} className="flex-shrink-0" /> Education
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C47D4A] to-transparent"></div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {safeData.education.map((edu) => (
                    <div key={edu.id} className="p-3 sm:p-4 rounded-lg bg-white/50 border border-[#E8E0D5] hover:bg-white transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-[#C47D4A]/10 flex items-center justify-center">
                            <GraduationCap size={14} className="text-[#C47D4A]" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#2C2C2C] text-sm sm:text-base break-words">{edu.degree}</h3>
                          <p className="text-gray-700 text-xs sm:text-sm mt-1 flex items-center gap-1 flex-wrap">
                            <BookOpen size={10} className="text-[#C47D4A] flex-shrink-0" /> <span className="break-words">{edu.school}</span>
                          </p>
                          <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                            <Calendar size={10} className="text-[#C47D4A] flex-shrink-0" /> {edu.year}
                          </p>
                          {edu.gpa && (
                            <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                              <Award size={10} className="text-[#C47D4A] flex-shrink-0" /> GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {safeData.skills?.length > 0 && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-[#C47D4A]"></div>
                  <h2 className="text-xs font-bold text-[#C47D4A] tracking-[3px] uppercase flex items-center gap-1">
                    <Globe size={12} className="flex-shrink-0" /> Skills
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C47D4A] to-transparent"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {safeData.skills.map((skill, index) => (
                    <span key={index} className="bg-gradient-to-r from-[#C47D4A] to-[#E8A87C] text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 break-words">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {safeData.certifications?.length > 0 && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-[#C47D4A]"></div>
                  <h2 className="text-xs font-bold text-[#C47D4A] tracking-[3px] uppercase flex items-center gap-1">
                    <Award size={12} className="flex-shrink-0" /> Certifications
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C47D4A] to-transparent"></div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {safeData.certifications.map((cert) => (
                    <div key={cert.id} className="p-2.5 sm:p-3 rounded-lg bg-white/50 border border-[#E8E0D5] hover:bg-white transition-all duration-300">
                      <p className="font-medium text-gray-900 text-xs sm:text-sm flex items-center gap-2 flex-wrap">
                        <Award size={10} className="text-[#C47D4A] flex-shrink-0" /> <span className="break-words">{cert.name}</span>
                      </p>
                      <p className="text-gray-600 text-xs ml-5 break-words">{cert.organization}</p>
                      {cert.year && <p className="text-gray-500 text-xs ml-5">{cert.year}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {safeData.languages?.length > 0 && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-[#C47D4A]"></div>
                  <h2 className="text-xs font-bold text-[#C47D4A] tracking-[3px] uppercase flex items-center gap-1">
                    <Globe size={12} className="flex-shrink-0" /> Languages
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C47D4A] to-transparent"></div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {safeData.languages.map((lang) => (
                    <div key={lang.id} className="p-2.5 sm:p-3 rounded-lg bg-white/50 border border-[#E8E0D5] flex justify-between items-center hover:bg-white transition-all duration-300 flex-wrap gap-2">
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm flex items-center gap-2">
                        <Globe size={10} className="text-[#C47D4A] flex-shrink-0" /> <span className="break-words">{lang.language}</span>
                      </span>
                      {lang.proficiency && <span className="text-gray-600 text-xs bg-[#FAF7F2] px-2 py-0.5 rounded-full">{lang.proficiency}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {safeData.interests?.length > 0 && (
              <section className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-[#C47D4A]"></div>
                  <h2 className="text-xs font-bold text-[#C47D4A] tracking-[3px] uppercase flex items-center gap-1">
                    <Star size={12} className="flex-shrink-0" /> Interests
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C47D4A] to-transparent"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {safeData.interests.map((interest, index) => (
                    <span key={index} className="text-gray-700 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/50 border border-[#E8E0D5] hover:bg-white hover:border-[#C47D4A] transition-all duration-300 break-words">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .resume-container {
          max-width: 1100px;
          margin: 0 auto;
          background: #FAF7F2;
        }
        
        /* Desktop breakpoint - switch to two columns */
        @media (min-width: 768px) {
          .resume-two-column-layout {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
            gap: 1.5rem !important;
          }
        }
        
        /* Mobile: single column */
        @media (max-width: 767px) {
          .resume-two-column-layout {
            display: block !important;
          }
          .resume-two-column-layout > div {
            width: 100% !important;
          }
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

        .border-l-3 {
          border-left-width: 3px;
        }

        @media print {
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background: #FAF7F2 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }

          .resume-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 20px !important;
            padding-bottom: 20px !important;
            min-height: 100% !important;
            height: 100% !important;
            background: #FAF7F2 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .resume-two-column-layout {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
            gap: 20px !important;
          }

          section, .mb-6, .mb-4, .mb-3 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          .bg-\\[\\#C47D4A\\] {
            background-color: #C47D4A !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-white, .bg-\\[\\#FFF8F0\\] {
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .rounded-lg {
            background-color: #FAF7F2 !important;
            border: 1px solid #E8E0D5 !important;
          }
          
          section p {
            color: #2C2C2C !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          a {
            text-decoration: none !important;
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