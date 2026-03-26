// components/templates/ModernTemplate.js
'use client'
import React, { useRef, useState, useCallback } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

// Split into smaller components
const ResumeHeader = ({ personalInfo, socialMedia }) => (
  <div className="text-center mt-6 mb-6 border-b-2 border-yellow-500 pb-4">
    <h1 className="text-2xl font-bold text-gray-900">{personalInfo.name}</h1>
    <p className="text-md text-gray-600 mt-1">{personalInfo.title}</p>
    <div className="flex justify-center flex-wrap gap-2 mt-1 text-xs text-gray-500">
      <span>{personalInfo.email}</span>
      <span>•</span>
      <span>{personalInfo.phone}</span>
      <span>•</span>
      <span>{personalInfo.location}</span>
    </div>
    
    {socialMedia && Object.keys(socialMedia).length > 0 && (
      <div className="flex justify-center flex-wrap gap-3 mt-1 text-xs">
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
      </div>
    )}
  </div>
)

const ProfessionalSummary = ({ summary }) => {
  if (!summary) return null
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
        Professional Summary
      </h2>
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
      </div>
    </div>
  )
}

const ExperienceSection = ({ experiences }) => {
  if (!experiences?.length) return null
  
  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return null
    if (!endDate || endDate.trim() === '') return startDate
    if (endDate === 'Present') return `${startDate} - Present`
    return `${startDate} - ${endDate}`
  }
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
        Experience
      </h2>
      {experiences.map((exp) => {
        const dateRange = formatDateRange(exp.startDate, exp.endDate)
        
        return (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
              {dateRange && (
                <span className="text-gray-500 text-xs bg-yellow-100 px-2 py-0.5 rounded">
                  {dateRange}
                </span>
              )}
            </div>
            <p className="text-gray-700 text-xs mb-1">{exp.company}</p>
            <p className="text-gray-600 text-xs whitespace-pre-line">{exp.description}</p>
          </div>
        )
      })}
    </div>
  )
}

const ProjectsSection = ({ projects }) => {
  if (!projects?.length) return null
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
        Projects
      </h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-3">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{project.name}</h3>
          {project.techStack && (
            <p className="text-gray-600 text-xs mb-1">
              <span className="font-medium">Tech:</span> {project.techStack}
            </p>
          )}
          <p className="text-gray-600 text-xs mb-1">{project.description}</p>
          <div className="flex gap-3 text-xs">
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const EducationSection = ({ education }) => {
  if (!education?.length) return null
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
        Education
      </h2>
      {education.map((edu) => (
        <div key={edu.id} className="mb-3">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
            <span className="text-gray-500 text-xs">{edu.year}</span>
          </div>
          <p className="text-gray-700 text-xs">{edu.school}</p>
          {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </div>
  )
}

const SkillsSection = ({ skills }) => {
  if (!skills?.length) return null
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
        Skills
      </h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const LanguagesSection = ({ languages }) => {
  if (!languages?.length) return null
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
        Languages
      </h2>
      <div className="space-y-1">
        {languages.map((language) => (
          <div key={language.id} className="text-sm">
            <span className="font-semibold text-gray-900">{language.language}</span>
            <span className="text-gray-600 ml-2">- {language.proficiency}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const InterestsSection = ({ interests }) => {
  if (!interests?.length) return null
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-4 bg-yellow-500 mr-2 rounded-full"></div>
        Interests
      </h2>
      <div className="interests-container">
        {interests.map((interest, index) => (
          <span key={index} className="interest-badge">
            {interest}
          </span>
        ))}
      </div>
    </div>
  )
}

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-bold px-4 py-1.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm"
    >
      <span>{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

const LoadingSkeleton = () => (
  <div className="bg-white text-gray-800 p-4 font-sans">
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
    </div>
  </div>
)

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Resume Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white text-gray-800 p-4 font-sans text-center">
          <div className="text-red-500 text-sm mb-2">⚠️ Failed to load resume</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm"
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

  const handleExportPDF = () => {
    if (!resumeRef.current) return
    const fileName = `resume-${safeData.personalInfo.name.replace(/\s+/g, '-')}.pdf`
    exportToPDF(resumeRef.current, fileName)
  }

  if (!resume) {
    return <LoadingSkeleton />
  }

  return (
    <ErrorBoundary>
      <div className="bg-white text-gray-800 p-4 font-sans" style={{ maxWidth: '210mm', margin: '0 auto' }}>
        <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
        
        <div ref={resumeRef} className="resume-content">
          <ResumeHeader 
            personalInfo={safeData.personalInfo}
            socialMedia={safeData.socialMedia}
          />

          <ProfessionalSummary summary={safeData.professionalSummary} />

          {/* Main Grid Layout - 2 columns */}
          <div className="resume-main-grid">
            {/* Left Column - 2/3 width */}
            <div className="resume-left-column">
              <ExperienceSection experiences={safeData.experience} />
              <ProjectsSection projects={safeData.projects} />
              <EducationSection education={safeData.education} />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="resume-right-column">
              <SkillsSection skills={safeData.skills} />
              <LanguagesSection languages={safeData.languages} />
              <InterestsSection interests={safeData.interests} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Screen Styles */
        .resume-main-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        
        .resume-left-column,
        .resume-right-column {
          overflow: visible;
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .skill-badge {
          background-color: #eab308;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
        }
        
        .interests-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .interest-badge {
          background-color: #f3f4f6;
          color: #374151;
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          display: inline-block;
        }
        
        /* CRITICAL: Print Styles */
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
          }
          
          /* Force 2-column grid in print */
          .resume-main-grid {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
            gap: 2rem !important;
            page-break-after: avoid;
            page-break-before: avoid;
          }
          
          /* Ensure columns don't break */
          .resume-left-column,
          .resume-right-column {
            display: block !important;
            width: 100% !important;
            page-break-inside: avoid;
          }
          
          /* Force skills badges to show correctly */
          .skills-container {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 0.5rem !important;
          }
          
          .skill-badge {
            background-color: #eab308 !important;
            color: white !important;
            padding: 0.4rem 0.8rem !important;
            border-radius: 9999px !important;
            font-size: 0.75rem !important;
            font-weight: 600 !important;
            display: inline-block !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          .interests-container {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 0.5rem !important;
          }
          
          .interest-badge {
            background-color: #f3f4f6 !important;
            color: #374151 !important;
            padding: 0.4rem 0.8rem !important;
            border-radius: 9999px !important;
            font-size: 0.75rem !important;
            display: inline-block !important;
          }
          
          /* Remove extra backgrounds */
          .bg-gray-50 {
            background: white !important;
            border: 1px solid #e5e7eb !important;
          }
          
          /* Prevent content from breaking */
          div, section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Keep colors in print */
          button, a, .skill-badge, .bg-yellow-100 {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
        
        @page {
          size: A4;
          margin: 1.2cm;
        }
      `}</style>
    </ErrorBoundary>
  )
}