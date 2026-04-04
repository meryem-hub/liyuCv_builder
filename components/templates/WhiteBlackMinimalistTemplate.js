'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'
import Image from 'next/image'

const WhiteBlackMinimalistTemplate = ({ resume }) => {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)
  const [photo, setPhoto] = useState(null)

  const {
    personalInfo = {},
    professionalSummary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = []
  } = resume

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setPhoto(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Save as PDF Button - Top Right */}
      <div className="flex justify-end p-4 print:hidden">
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="bg-black hover:bg-gray-800 text-white font-medium px-5 py-2 rounded-lg transition flex items-center gap-2 text-sm"
        >
          {isExporting ? '⏳ Generating...' : '📄 Save as PDF'}
        </button>
      </div>

      <div ref={resumeRef} className="resume-content w-full bg-white">
        {/* Header with Photo - SIDE BY SIDE LAYOUT */}
        <div className="bg-black text-white px-10 py-8">
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
            {/* Left side - Name and Title */}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', letterSpacing: '-0.025em', lineHeight: 1 }}>
                {personalInfo.name || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '24px', color: '#d1d5db', marginTop: '8px', fontWeight: 300 }}>
                {personalInfo.title || 'Professional Title'}
              </p>
            </div>

            {/* Right side - Clickable Photo Placeholder */}
            <label style={{ width: '160px', height: '192px', border: '4px solid rgba(255,255,255,0.3)', cursor: 'pointer', flexShrink: 0, overflow: 'hidden', borderRadius: '12px', position: 'relative', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              
              {photo ? (
                <Image
                  src={photo}
                  alt="Profile Photo"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#18181b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px', opacity: 0.7 }}>📸</div>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500, color: '#9ca3af' }}>ADD PHOTO</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Contact Bar */}
        <div style={{ backgroundColor: '#f4f4f5', padding: '12px 40px', fontSize: '14px', color: '#4b5563', display: 'flex', flexWrap: 'wrap', gap: '32px', borderBottom: '1px solid #e5e7eb' }}>
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>

        {/* Main Content - FIXED 2-COLUMN USING FLEXBOX */}
        <div style={{ padding: '32px 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
            
            {/* Left Column - 2/3 width */}
            <div style={{ width: '66.66%' }}>
              {/* Profile Section */}
              {professionalSummary && (
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>PROFILE</h2>
                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.6 }}>
                    {professionalSummary}
                  </p>
                </div>
              )}

              {/* Experience Section */}
              {experience.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>EXPERIENCE</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                          <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#111827' }}>{exp.position}</h3>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            {exp.startDate} — {exp.endDate || 'Present'}
                          </span>
                        </div>
                        <p style={{ color: '#4b5563', fontSize: '14px', fontWeight: 500, marginTop: '4px' }}>{exp.company}</p>
                        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px', lineHeight: 1.5 }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {projects.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>SELECTED PROJECTS</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {projects.map((project) => (
                      <div key={project.id}>
                        <h3 style={{ fontWeight: 600, fontSize: '16px', color: '#111827' }}>{project.name}</h3>
                        {project.techStack && (
                          <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>{project.techStack}</p>
                        )}
                        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px', lineHeight: 1.5 }}>
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - 1/3 width */}
            <div style={{ width: '33.33%' }}>
              {/* Education Section */}
              {education.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>EDUCATION</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <h3 style={{ fontWeight: 600, fontSize: '14px', color: '#111827' }}>{edu.degree}</h3>
                        <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>{edu.school}</p>
                        <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>SKILLS</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.map((skill, i) => (
                      <span key={i} style={{ fontSize: '14px', color: '#4b5563', backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: '9999px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {certifications.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>CERTIFICATIONS</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {certifications.map((cert) => (
                      <div key={cert.id}>
                        <p style={{ fontWeight: 500, fontSize: '14px', color: '#111827' }}>{cert.name}</p>
                        <p style={{ color: '#6b7280', fontSize: '12px' }}>{cert.organization} • {cert.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
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
            width: 100%;
          }
          
          /* Force background colors in print */
          .bg-black {
            background-color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Prevent page breaks inside sections */
          div[style*="marginBottom"] {
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

export default WhiteBlackMinimalistTemplate