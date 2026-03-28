// components/templates/ModernTemplate.js
'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

// Resume Header Component
const ResumeHeader = ({ personalInfo, socialMedia }) => (
  <div className="text-center mt-10 mb-8 border-b-2 border-yellow-500 pb-6">
    <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
    <p className="text-lg text-gray-600 mt-1">{personalInfo.title}</p>
    <div className="flex justify-center flex-wrap gap-2 mt-2 text-xs text-gray-500">
      <span>{personalInfo.email}</span>
      <span>•</span>
      <span>{personalInfo.phone}</span>
      <span>•</span>
      <span>{personalInfo.location}</span>
    </div>
    
    {socialMedia && Object.keys(socialMedia).length > 0 && (
      <div className="flex justify-center flex-wrap gap-3 mt-2 text-xs">
        {socialMedia.linkedin && (
          <a 
            href={socialMedia.linkedin.startsWith('http') ? socialMedia.linkedin : `https://${socialMedia.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        )}
        {socialMedia.github && (
          <a 
            href={socialMedia.github.startsWith('http') ? socialMedia.github : `https://${socialMedia.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline"
          >
            GitHub
          </a>
        )}
        {socialMedia.portfolio && (
          <a 
            href={socialMedia.portfolio.startsWith('http') ? socialMedia.portfolio : `https://${socialMedia.portfolio}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            Portfolio
          </a>
        )}
        {socialMedia.x && (
          <a 
            href={socialMedia.x.startsWith('http') ? socialMedia.x : `https://${socialMedia.x}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline"
          >
            X (Twitter)
          </a>
        )}
      </div>
    )}
  </div>
)

// Professional Summary Component
const ProfessionalSummary = ({ summary }) => {
  if (!summary) return null
  
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Professional Summary
      </h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{summary}</p>
      </div>
    </section>
  )
}

// Experience Section
const ExperienceSection = ({ experiences }) => {
  if (!experiences?.length) return null
  
  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return null
    if (!endDate || endDate.trim() === '') return startDate
    if (endDate === 'Present') return `${startDate} - Present`
    return `${startDate} - ${endDate}`
  }
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Experience
      </h2>
      {experiences.map((exp) => {
        const dateRange = formatDateRange(exp.startDate, exp.endDate)
        
        return (
          <div key={exp.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <h3 className="font-semibold text-gray-900">{exp.position}</h3>
              {dateRange && (
                <span className="text-gray-500 text-sm bg-yellow-100 px-2 py-1 rounded">
                  {dateRange}
                </span>
              )}
            </div>
            <p className="text-gray-700 font-medium text-sm mb-2">{exp.company}</p>
            <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
          </div>
        )
      })}
    </section>
  )
}

// Projects Section
const ProjectsSection = ({ projects }) => {
  if (!projects?.length) return null
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Projects
      </h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
          {project.techStack && (
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium">Tech Stack:</span> {project.techStack}
            </p>
          )}
          <p className="text-gray-600 text-sm mb-2">{project.description}</p>
          <div className="flex gap-4 text-sm">
            {project.demoLink && (
              <a 
                href={project.demoLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}

// Education Section
const EducationSection = ({ education }) => {
  if (!education?.length) return null
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Education
      </h2>
      {education.map((edu) => (
        <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
          <p className="text-gray-700 text-sm mt-1">{edu.school}</p>
          <p className="text-gray-500 text-sm mt-1">{edu.year}</p>
          {edu.gpa && <p className="text-gray-500 text-sm mt-1">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </section>
  )
}

// Skills Section
const SkillsSection = ({ skills }) => {
  if (!skills?.length) return null
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="bg-yellow-500 text-white px-3 py-2 rounded-full text-sm font-semibold"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

// Achievements Section
const AchievementsSection = ({ achievements }) => {
  if (!achievements?.length) return null
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Achievements & Awards
      </h2>
      {achievements.map((achievement) => (
        <div key={achievement.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
          <p className="text-gray-700 text-sm mt-1">{achievement.organization}</p>
          <p className="text-gray-500 text-sm mt-1">{achievement.year}</p>
        </div>
      ))}
    </section>
  )
}

// Languages Section
const LanguagesSection = ({ languages }) => {
  if (!languages?.length) return null
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Languages
      </h2>
      <div className="space-y-2">
        {languages.map((language) => (
          <div key={language.id} className="p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-900">{language.language}</span>
            <span className="text-gray-600 text-sm ml-2">- {language.proficiency}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// Certifications Section
const CertificationsSection = ({ certifications }) => {
  if (!certifications?.length) return null
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Certifications
      </h2>
      {certifications.map((cert) => (
        <div key={cert.id} className="mb-3 p-3 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900">{cert.name}</h3>
          <p className="text-gray-700 text-sm">{cert.organization}</p>
          <p className="text-gray-500 text-sm">{cert.year}</p>
        </div>
      ))}
    </section>
  )
}

// Interests Section
const InterestsSection = ({ interests }) => {
  if (!interests?.length) return null
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Interests
      </h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span 
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm"
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  )
}

// PDF Export Button
const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-6 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-bold px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm"
      aria-label="Export resume as PDF"
    >
      <span aria-hidden="true">{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="bg-white text-gray-800 p-8 font-sans">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
)

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Resume Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white text-gray-800 p-8 font-sans text-center">
          <div className="text-red-500 text-lg mb-2">⚠️ Failed to load resume</div>
          <p className="text-gray-600 text-sm mb-4">Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            Refresh Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Main Component
export default function ModernTemplate({ resume }) {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  const safeData = {
    personalInfo: {
      name: resume?.personalInfo?.name || 'Your Name',
      title: resume?.personalInfo?.title || 'Professional Title',
      email: resume?.personalInfo?.email || 'your.email@example.com',
      phone: resume?.personalInfo?.phone || '+1234567890',
      location: resume?.personalInfo?.location || 'City, Country',
      ...resume?.personalInfo
    },
    professionalSummary: resume?.professionalSummary || '',
    experience: resume?.experience || [],
    education: resume?.education || [],
    skills: resume?.skills || [],
    projects: resume?.projects || [],
    socialMedia: resume?.socialMedia || {},
    achievements: resume?.achievements || [],
    languages: resume?.languages || [],
    certifications: resume?.certifications || [],
    interests: resume?.interests || []
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

  if (!resume) {
    return <LoadingSkeleton />
  }

  return (
    <ErrorBoundary>
      <div className="bg-white text-gray-800 p-3 font-sans">
        <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
        
        <div ref={resumeRef} className="resume-content">
          <ResumeHeader 
            personalInfo={safeData.personalInfo}
            socialMedia={safeData.socialMedia}
          />

          <ProfessionalSummary summary={safeData.professionalSummary} />

          {/* Two Column Layout - Fixed for PDF */}
          <div 
            className="resume-two-column-layout"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr', 
              gap: '24px',
              width: '100%'
            }}
          >
            {/* Left Column - Main Content */}
            <div style={{ minWidth: 0 }}>
              <ExperienceSection experiences={safeData.experience} />
              <ProjectsSection projects={safeData.projects} />
              <EducationSection education={safeData.education} />
              <AchievementsSection achievements={safeData.achievements} />
              <CertificationsSection certifications={safeData.certifications} />
            </div>

            {/* Right Column - Sidebar */}
            <div style={{ minWidth: 0 }}>
              <SkillsSection skills={safeData.skills} />
              <LanguagesSection languages={safeData.languages} />
              <InterestsSection interests={safeData.interests} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Screen styles */
        .resume-two-column-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .resume-two-column-layout {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        
        /* Print styles - Critical for PDF */
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
            padding: 0;
            margin: 0;
            width: 100%;
          }
          
          /* Force grid layout in print */
          .resume-two-column-layout {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
            gap: 24px !important;
            page-break-inside: avoid !important;
          }
          
          /* Prevent column breaks */
          .resume-two-column-layout > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Prevent sections from breaking */
          section, .mb-4, .mb-6, .mb-8 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Force background colors */
          .bg-yellow-500 {
            background-color: #eab308 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-gray-50 {
            background-color: #f9fafb !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-yellow-100 {
            background-color: #fef9c3 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Remove shadows */
          .shadow-lg, .shadow-md, .shadow-sm {
            box-shadow: none !important;
          }
          
          /* Ensure borders */
          .border-b-2 {
            border-bottom-width: 2px !important;
          }
        }
        
        @page {
          size: A4;
          margin: 15mm;
        }
      `}</style>
    </ErrorBoundary>
  )
}