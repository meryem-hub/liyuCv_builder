'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'
import Image from 'next/image'

const WhiteBlackMinimalistTemplate = ({ resume }) => {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)
  const [photo, setPhoto] = useState(null)

  const safeData = {
    personalInfo: {
      name: resume?.personalInfo?.name || 'YOUR NAME',
      title: resume?.personalInfo?.title || 'Graphic Designer',
      email: resume?.personalInfo?.email || 'your.email@example.com',
      phone: resume?.personalInfo?.phone || '+123 456 7890',
      location: resume?.personalInfo?.location || 'City, Country',
      ...resume?.personalInfo
    },
    professionalSummary: resume?.professionalSummary || 'Creative and detail-oriented Graphic Designer with a passion for visual storytelling, branding, and digital design.',
    experience: resume?.experience || [],
    education: resume?.education || [],
    skills: resume?.skills || [],
    projects: resume?.projects || [],
    certifications: resume?.certifications || [],
  }

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    const fileName = `resume-${safeData.personalInfo.name.replace(/\s+/g, '-')}.pdf`
    
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
          <div className="flex flex-row items-center justify-between gap-8">
            {/* Left side - Name and Title */}
            <div className="flex-1">
              <h1 className="text-5xl font-bold tracking-tighter leading-none">
                {safeData.personalInfo.name}
              </h1>
              <p className="text-2xl text-gray-300 mt-2 font-light">
                {safeData.personalInfo.title}
              </p>
            </div>

            {/* Right side - Clickable Photo Placeholder */}
            <label className="w-40 h-48 border-4 border-white/30 hover:border-white transition-all cursor-pointer flex-shrink-0 overflow-hidden rounded-xl relative group shadow-xl">
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
                <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-center p-4">
                  <div className="text-4xl mb-2 opacity-70">📸</div>
                  <p className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400 group-hover:text-white">
                    ADD PHOTO
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-zinc-100 px-10 py-3 text-sm text-gray-600 flex flex-wrap gap-x-8 gap-y-2 border-b border-gray-200">
          <span>{safeData.personalInfo.phone}</span>
          <span>{safeData.personalInfo.email}</span>
          <span>{safeData.personalInfo.location}</span>
        </div>

        {/* Main Content - FIXED TWO-COLUMN GRID */}
        <div className="px-10 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - 8 columns */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <section>
                <h2 className="uppercase text-[11px] font-bold tracking-[2px] mb-3 text-black border-b border-gray-200 pb-2">PROFILE</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {safeData.professionalSummary}
                </p>
              </section>

              {safeData.experience.length > 0 && (
                <section>
                  <h2 className="uppercase text-[11px] font-bold tracking-[2px] mb-4 text-black border-b border-gray-200 pb-2">EXPERIENCE</h2>
                  <div className="space-y-6">
                    {safeData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-wrap justify-between items-baseline gap-2">
                          <h3 className="font-semibold text-base text-gray-900">{exp.position}</h3>
                          <span className="text-xs text-gray-500">
                            {exp.startDate} — {exp.endDate || 'Present'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm font-medium mt-1">{exp.company}</p>
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.projects.length > 0 && (
                <section>
                  <h2 className="uppercase text-[11px] font-bold tracking-[2px] mb-4 text-black border-b border-gray-200 pb-2">SELECTED PROJECTS</h2>
                  <div className="space-y-5">
                    {safeData.projects.map((project) => (
                      <div key={project.id}>
                        <h3 className="font-semibold text-base text-gray-900">{project.name}</h3>
                        {project.techStack && (
                          <p className="text-gray-500 text-xs mt-1">{project.techStack}</p>
                        )}
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - 4 columns */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {safeData.education.length > 0 && (
                <section>
                  <h2 className="uppercase text-[11px] font-bold tracking-[2px] mb-3 text-black border-b border-gray-200 pb-2">EDUCATION</h2>
                  <div className="space-y-4">
                    {safeData.education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-600 text-xs mt-0.5">{edu.school}</p>
                        <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {safeData.skills.length > 0 && (
                <section>
                  <h2 className="uppercase text-[11px] font-bold tracking-[2px] mb-3 text-black border-b border-gray-200 pb-2">SKILLS</h2>
                  <div className="flex flex-wrap gap-2">
                    {safeData.skills.map((skill, i) => (
                      <span key={i} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {safeData.certifications.length > 0 && (
                <section>
                  <h2 className="uppercase text-[11px] font-bold tracking-[2px] mb-3 text-black border-b border-gray-200 pb-2">CERTIFICATIONS</h2>
                  <div className="space-y-3">
                    {safeData.certifications.map((cert) => (
                      <div key={cert.id}>
                        <p className="font-medium text-sm text-gray-900">{cert.name}</p>
                        <p className="text-gray-500 text-xs">{cert.organization} • {cert.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
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
          
          /* Force side-by-side layout in print */
          .flex-row {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          
          .flex-1 {
            flex: 1 !important;
          }
          
          /* Force grid layout in print */
          .grid {
            display: grid !important;
          }
          
          .col-span-12 {
            grid-column: span 12 / span 12 !important;
          }
          
          .lg\\:col-span-8 {
            grid-column: span 8 / span 8 !important;
          }
          
          .lg\\:col-span-4 {
            grid-column: span 4 / span 4 !important;
          }
          
          /* Force background colors */
          .bg-black {
            background-color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-zinc-100 {
            background-color: #f4f4f5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-gray-100 {
            background-color: #f3f4f6 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Force image container size in print */
          .w-40 {
            width: 10rem !important;
          }
          
          .h-48 {
            height: 12rem !important;
          }
          
          /* Prevent page breaks */
          section, .space-y-6 > div, .space-y-5 > div, .space-y-4 > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Remove shadows */
          .shadow-xl, .shadow-2xl {
            box-shadow: none !important;
          }
          
          /* Remove extra margins */
          body, div, .resume-content {
            margin: 0 !important;
            padding: 0 !important;
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