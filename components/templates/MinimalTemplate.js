'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Download, RefreshCw, ExternalLink, Github } from 'lucide-react'

import { exportToPDF } from '../../app/utils/exportPDF'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-gray-900 border-2 border-white hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-3 sm:px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ml-auto text-xs"
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

export default function MinimalTemplate({ resume }) {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  const {
    personalInfo = {},
    professionalSummary = '',
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = [],
    projects = []
  } = resume || {}

  const hasPhoto = !!personalInfo?.photo

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    const fileName = `resume-${personalInfo?.name?.replace(/\s+/g, '-') || 'resume'}.pdf`
    setIsExporting(true)
    try {
      await exportToPDF(resumeRef.current, fileName)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen print:bg-white">
      <div 
        ref={resumeRef} 
        className="mx-auto bg-white shadow-2xl overflow-hidden print:max-w-none print:shadow-none print:rounded-none"
      >
        {/* PDF Export Button - Sticky on mobile */}
        <div className="print:hidden sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-2 px-3 flex justify-end">
          <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
        </div>
        
        {/* Main Layout - Column on mobile, Row on desktop */}
        <div className="flex flex-col md:flex-row print:flex print:flex-row">          
          {/* Sidebar - Full width on mobile */}
          <div className="w-full md:w-[380px] flex-shrink-0 bg-gray-100 print:w-[380px] print:bg-gray-100">
            <div style={{ 
              backgroundColor: '#1e293b',
              backgroundImage: 'linear-gradient(to bottom right, #1e293b, #1f2937)',
              color: 'white',
              padding: '20px',
              height: '100%'
            }}>
              {/* Profile Section */}
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                {hasPhoto && (
                  <div style={{ 
                    width: '96px', 
                    height: '96px', 
                    margin: '0 auto 12px auto',
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    border: '2px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}>
                    <Image
                      src={personalInfo.photo}
                      alt={personalInfo.name || 'Profile'}
                      width={96}
                      height={96}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, wordBreak: 'break-word' }}>
                  {personalInfo.name || 'Professional Name'}
                </h1>
                <p style={{ fontSize: '14px', color: '#e5e7eb', marginTop: '4px', wordBreak: 'break-word' }}>
                  {personalInfo.title || 'Professional Title'}
                </p>
              </div>

              {/* Contact */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Contact</h3>
                <div style={{ fontSize: '14px' }}>
                  {personalInfo.phone && <p style={{ color: '#e5e7eb', margin: '4px 0', wordBreak: 'break-word' }}>{personalInfo.phone}</p>}
                  {personalInfo.email && <p style={{ color: '#e5e7eb', margin: '4px 0', wordBreak: 'break-all' }}>{personalInfo.email}</p>}
                  {personalInfo.location && <p style={{ color: '#e5e7eb', margin: '4px 0', wordBreak: 'break-word' }}>{personalInfo.location}</p>}
                </div>
              </div>

              {/* Education */}
              {education?.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '12px' }}>Education</h3>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '8px' }}>
                      <p style={{ fontWeight: '500', fontSize: '15px', margin: 0, wordBreak: 'break-word' }}>{edu.degree}</p>
                      <p style={{ fontSize: '14px', color: '#d1d5db', margin: '2px 0', wordBreak: 'break-word' }}>{edu.school}</p>
                      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0' }}>{edu.year}</p>
                      {edu.details && <p style={{ fontSize: '11px', color: '#9ca3af', margin: '2px 0', wordBreak: 'break-word' }}>{edu.details}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {skills?.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Skills</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.slice(0, 8).map((skill, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications?.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Certifications</h3>
                  {certifications.slice(0, 2).map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '6px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: 0, wordBreak: 'break-word' }}>{cert.name}</p>
                      <p style={{ fontSize: '12px', color: '#d1d5db', margin: '2px 0', wordBreak: 'break-word' }}>{cert.organization}</p>
                      <p style={{ fontSize: '11px', color: '#9ca3af', margin: '2px 0' }}>{cert.year}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Languages */}
              {languages?.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Languages</h3>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontSize: '13px', color: '#e5e7eb', wordBreak: 'break-word' }}>{lang.language}</span>
                      <span style={{ fontSize: '11px', color: '#d1d5db' }}>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* White Content Area - Full width on mobile */}
          <div className="flex-1 p-5 sm:p-6 md:p-8 lg:p-10 bg-white min-w-0 overflow-hidden">
            {/* About Me */}
            {professionalSummary && (
              <div className="mb-6 sm:mb-8">
                <h2 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  borderBottom: '1px solid #d1d5db', 
                  paddingBottom: '4px', 
                  marginBottom: '12px',
                  color: '#1f2937'
                }}>About Me</h2>
                <p style={{ color: '#4b5563', lineHeight: '1.5', fontSize: '13px', wordBreak: 'break-word' }}>
                  {professionalSummary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
              <div className="mb-10 sm:mb-14">
                <h2 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  borderBottom: '1px solid #d1d5db', 
                  paddingBottom: '4px', 
                  marginBottom: '12px',
                  color: '#1f2937'
                }}>Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ flex: '1' }}>
                        <h3 style={{ 
                          fontWeight: '800', 
                          fontSize: '15px', 
                          margin: 0, 
                          color: '#111827',
                          wordBreak: 'break-word'
                        }}>
                          → {exp.position}
                        </h3>
                        <p style={{ 
                          color: '#4b5563', 
                          fontSize: '13px', 
                          margin: '4px 0 0 0',
                          fontWeight: '500',
                          wordBreak: 'break-word'
                        }}>
                          {exp.company}
                        </p>
                      </div>
                      <p style={{ 
                        fontSize: '11px', 
                        color: '#6b7280',
                        whiteSpace: 'nowrap'
                      }}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                    </div>
                    <p style={{ marginTop: '6px', color: '#6b7280', fontSize: '13px', lineHeight: '1.45', wordBreak: 'break-word' }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <div>
                <h2 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  borderBottom: '1px solid #d1d5db', 
                  paddingBottom: '4px', 
                  marginBottom: '12px',
                  color: '#1f2937'
                }}>Projects</h2>
                {projects.map((project) => (
                  <div key={project.id} style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <h3 style={{ fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0', color: '#1f2937', wordBreak: 'break-word' }}>
                      {project.name}
                    </h3>
                    
                    <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px', lineHeight: '1.5', wordBreak: 'break-word' }}>
                      {project.description}
                    </p>
                    
                    {project.techStack && (
                      <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {typeof project.techStack === 'string' ? (
                          project.techStack.split(',').map((tech, i) => (
                            <span
                              key={i}
                              style={{
                                backgroundColor: '#f3f4f6',
                                color: '#374151',
                                padding: '2px 10px',
                                borderRadius: '20px',
                                fontSize: '10px',
                                fontWeight: '500'
                              }}
                            >
                              {tech.trim()}
                            </span>
                          ))
                        ) : (
                          <span
                            style={{
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              padding: '2px 10px',
                              borderRadius: '20px',
                              fontSize: '10px',
                              fontWeight: '500'
                            }}
                          >
                            {project.techStack}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div style={{ marginTop: '8px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {project.demoLink && (
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ 
                            fontSize: '10px', 
                            color: '#3b82f6', 
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <ExternalLink size={10} /> Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ 
                            fontSize: '10px', 
                            color: '#3b82f6', 
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Github size={10} /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        * {
          max-width: 100%;
          word-wrap: break-word;
          word-break: break-word;
        }

        @media print {
          @page { 
            size: A4 portrait; 
            margin: 0 !important; 
          }
          
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .sidebar-first-page {
            width: 380px !important;
            background-color: #f3f4f6 !important;
            height: auto !important;
            min-height: 0 !important;
            page-break-after: avoid !important;
            break-inside: avoid !important;
          }
          
          .sidebar-first-page > div {
            height: auto !important;
            min-height: 0 !important;
          }
          
          p, h1, h2, h3, h4, span, a, div {
            word-wrap: break-word !important;
            word-break: break-word !important;
            white-space: normal !important;
          }
          
          .flex {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </div>
  )
}