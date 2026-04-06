'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'
import Image from 'next/image'
import { Linkedin, Github, Globe, Download, RefreshCw, Camera, Phone, Mail, MapPin, Award, Briefcase, GraduationCap, Code, FolderOpen, User, Calendar, X } from 'lucide-react'

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
    certifications = [],
    socialMedia = {}
  } = resume || {}

  const PDFExportButton = ({ onExport, isExporting }) => (
    <div className="text-right mb-4 print:hidden">
      <button
        onClick={onExport}
        disabled={isExporting}
        className="bg-black border-2 border-white hover:bg-gray-800 text-white font-medium px-3 sm:px-5 py-2 rounded-lg transition flex items-center gap-2 text-xs sm:text-sm"
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

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    const fileName = `${(personalInfo.name || 'resume').replace(/\s+/g, '-')}-resume.pdf`
    
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
      <div ref={resumeRef} className="resume-content w-full bg-white">
        
        {/* PDF Export Button - Sticky on mobile */}
        <div className="print:hidden sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-2 px-3 flex justify-end">
          <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
        </div>
        
        {/* Header Section - Responsive */}
        <div className="bg-black text-white px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
            {/* Left side - Name and Title */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight break-words">
                {personalInfo.name || 'YOUR NAME'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-2 font-light break-words">
                {personalInfo.title || 'Professional Title'}
              </p>
            </div>

            {/* Right side - Clickable Photo Placeholder */}
            <label className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-48 lg:w-48 lg:h-56 border-4 border-white/30 cursor-pointer flex-shrink-0 overflow-hidden rounded-xl shadow-lg relative mx-auto sm:mx-0">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              
              {photo ? (
                <Image
                  src={photo}
                  alt="Profile Photo"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-center p-4">
                  <Camera size={28} className="mb-2 opacity-70 text-gray-400" />
                  <p className="text-xs uppercase tracking-wider font-medium text-gray-400">ADD PHOTO</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Contact Bar - Responsive wrapping */}
        <div className="bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 flex flex-wrap gap-3 sm:gap-4 md:gap-6 border-b border-gray-200">
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5 break-all">
              <Phone size={12} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1.5 break-all">
              <Mail size={12} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5 break-words">
              <MapPin size={12} /> {personalInfo.location}
            </span>
          )}
          
          {/* Social Media Links */}
          {socialMedia.linkedin && (
            <a 
              href={socialMedia.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-600 hover:text-black transition-colors break-all"
            >
              <Linkedin size={12} /> LinkedIn
            </a>
          )}
          {socialMedia.github && (
            <a 
              href={socialMedia.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-600 hover:text-black transition-colors break-all"
            >
              <Github size={12} /> GitHub
            </a>
          )}
          {socialMedia.portfolio && (
            <a 
              href={socialMedia.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-600 hover:text-black transition-colors break-all"
            >
              <Globe size={12} /> Portfolio
            </a>
          )}
          {socialMedia.X && (
            <a 
              href={socialMedia.X} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-600 hover:text-black transition-colors break-all"
            >
              <X size={12} /> X
            </a>
          )}
        </div>

        {/* Main Content - Responsive Two Column */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            
            {/* Left Column - Full width on mobile, 2/3 on desktop */}
            <div className="w-full md:w-2/3">
              {/* Profile Section */}
              {professionalSummary && (
                <div className="mb-6 md:mb-8">
                  <h2 className="text-[11px] font-bold tracking-[2px] uppercase mb-3 pb-2 border-b border-gray-200 flex items-center gap-2 text-black">
                    <User size={14} /> PROFILE
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">
                    {professionalSummary}
                  </p>
                </div>
              )}

              {/* Experience Section */}
              {experience.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h2 className="text-[11px] font-bold tracking-[2px] uppercase mb-4 pb-2 border-b border-gray-200 flex items-center gap-2 text-black">
                    <Briefcase size={14} /> EXPERIENCE
                  </h2>
                  <div className="space-y-5 md:space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                          <h3 className="font-semibold text-base md:text-lg text-gray-900 break-words">
                            {exp.position}
                          </h3>
                          <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
                            <Calendar size={12} /> {exp.startDate} — {exp.endDate || 'Present'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm font-medium mt-1 break-words">
                          {exp.company}
                        </p>
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed break-words">
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
                  <h2 className="text-[11px] font-bold tracking-[2px] uppercase mb-4 pb-2 border-b border-gray-200 flex items-center gap-2 text-black">
                    <FolderOpen size={14} /> SELECTED PROJECTS
                  </h2>
                  <div className="space-y-4 md:space-y-5">
                    {projects.map((project) => (
                      <div key={project.id}>
                        <h3 className="font-semibold text-base md:text-lg text-gray-900 break-words">
                          {project.name}
                        </h3>
                        {project.techStack && (
                          <p className="text-gray-400 text-xs mt-1 flex items-center gap-1 flex-wrap break-words">
                            <Code size={12} /> {project.techStack}
                          </p>
                        )}
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed break-words">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Full width on mobile, 1/3 on desktop */}
            <div className="w-full md:w-1/3">
              {/* Education Section */}
              {education.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h2 className="text-[11px] font-bold tracking-[2px] uppercase mb-3 pb-2 border-b border-gray-200 flex items-center gap-2 text-black">
                    <GraduationCap size={14} /> EDUCATION
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-semibold text-sm md:text-base text-gray-900 break-words">
                          {edu.degree}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1 break-words">
                          {edu.school}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h2 className="text-[11px] font-bold tracking-[2px] uppercase mb-3 pb-2 border-b border-gray-200 flex items-center gap-2 text-black">
                    <Code size={14} /> SKILLS
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span key={i} className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full break-words">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {certifications.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-bold tracking-[2px] uppercase mb-3 pb-2 border-b border-gray-200 flex items-center gap-2 text-black">
                    <Award size={14} /> CERTIFICATIONS
                  </h2>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert.id}>
                        <p className="font-medium text-sm text-gray-900 break-words">
                          {cert.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {cert.organization} • {cert.year}
                        </p>
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
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
          
          .resume-content {
            box-shadow: none;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          
          .bg-black {
            background-color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-gray-100 {
            background-color: #f3f4f6 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          div[style*="marginBottom"] {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          a {
            text-decoration: none !important;
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

export default WhiteBlackMinimalistTemplate