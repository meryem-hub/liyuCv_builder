'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { exportToPDF } from '../../app/utils/exportPDF'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-3 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-gray-900 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ml-auto text-xs"
      aria-label="Export resume as PDF"
    >
      <span aria-hidden="true">{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
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
  } = resume

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
    <div className="bg-white">
      <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
      
      <div ref={resumeRef} className="resume-content bg-white">
        
        {/* FIXED: Using inline styles for guaranteed 2-column layout */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'white'
        }}>
          
          {/* Sidebar - 1/3 width (33.33%) */}
          <div style={{ 
            width: '33.33%', 
            backgroundColor: '#1e293b',
            backgroundImage: 'linear-gradient(to bottom right, #1e293b, #1f2937)',
            color: 'white',
            padding: '20px'
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
                    alt={personalInfo.name}
                    width={96}
                    height={96}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                {personalInfo.name || 'Professional Name'}
              </h1>
              <p style={{ fontSize: '12px', color: '#e5e7eb', marginTop: '4px' }}>
                {personalInfo.title || 'Professional Title'}
              </p>
            </div>

            {/* Contact */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Contact</h3>
              <div style={{ fontSize: '12px', spaceY: '4px' }}>
                {personalInfo.phone && <p style={{ color: '#e5e7eb', margin: '4px 0' }}>{personalInfo.phone}</p>}
                {personalInfo.email && <p style={{ color: '#e5e7eb', margin: '4px 0', wordBreak: 'break-all' }}>{personalInfo.email}</p>}
                {personalInfo.location && <p style={{ color: '#e5e7eb', margin: '4px 0' }}>{personalInfo.location}</p>}
              </div>
            </div>

            {/* Education */}
            {education.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Education</h3>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '8px' }}>
                    <p style={{ fontWeight: '500', fontSize: '12px', margin: 0 }}>{edu.degree}</p>
                    <p style={{ fontSize: '10px', color: '#d1d5db', margin: '2px 0' }}>{edu.school}</p>
                    <p style={{ fontSize: '10px', color: '#9ca3af', margin: '2px 0' }}>{edu.year}</p>
                    {edu.details && <p style={{ fontSize: '10px', color: '#9ca3af', margin: '2px 0' }}>{edu.details}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skills.slice(0, 8).map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '10px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Certifications</h3>
                {certifications.slice(0, 2).map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '500', margin: 0 }}>{cert.name}</p>
                    <p style={{ fontSize: '10px', color: '#d1d5db', margin: '2px 0' }}>{cert.organization}</p>
                    <p style={{ fontSize: '10px', color: '#9ca3af', margin: '2px 0' }}>{cert.year}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d1d5db', marginBottom: '8px' }}>Languages</h3>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#e5e7eb' }}>{lang.language}</span>
                    <span style={{ fontSize: '10px', color: '#d1d5db' }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Content - 2/3 width (66.66%) */}
          <div style={{ 
            width: '66.66%', 
            padding: '24px',
            backgroundColor: 'white'
          }}>

            {/* About Me */}
            {professionalSummary && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  borderBottom: '1px solid #d1d5db', 
                  paddingBottom: '4px', 
                  marginBottom: '12px',
                  color: '#1f2937'
                }}>About Me</h2>
                <p style={{ color: '#4b5563', lineHeight: '1.5', fontSize: '12px' }}>
                  {professionalSummary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  borderBottom: '1px solid #d1d5db', 
                  paddingBottom: '4px', 
                  marginBottom: '12px',
                  color: '#1f2937'
                }}>Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px', marginBottom: '2px' }}>
                      <div>
                        <h3 style={{ fontWeight: '600', fontSize: '14px', margin: 0, color: '#1f2937' }}>{exp.position}</h3>
                        <p style={{ color: '#6b7280', fontSize: '12px', margin: '2px 0' }}>{exp.company}</p>
                      </div>
                      <p style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'monospace' }}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                    </div>
                    <p style={{ marginTop: '4px', color: '#6b7280', fontSize: '12px', lineHeight: '1.4' }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Key Initiatives / Projects */}
            {projects.length > 0 && (
              <div>
                <h2 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  borderBottom: '1px solid #d1d5db', 
                  paddingBottom: '4px', 
                  marginBottom: '12px',
                  color: '#1f2937'
                }}>Key Initiatives</h2>
                {projects.slice(0, 2).map((project) => (
                  <div key={project.id} style={{ marginBottom: '12px' }}>
                    <h3 style={{ fontWeight: '600', fontSize: '12px', margin: 0, color: '#1f2937' }}>{project.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px', lineHeight: '1.4' }}>{project.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .resume-content {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
          
          .resume-content {
            box-shadow: none;
            margin: 0;
            padding: 0;
          }
          
          .mb-3, .mb-4, .mb-5 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
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