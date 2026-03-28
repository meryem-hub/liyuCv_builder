// components/templates/ModernTemplate.js
'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

const ResumeHeader = ({ personalInfo, socialMedia }) => (
  <div className="text-center mb-6 border-b border-yellow-500 pb-4">
    <h1 className="text-2xl font-bold text-gray-900">{personalInfo.name}</h1>
    <p className="text-base text-gray-600 mt-1">{personalInfo.title}</p>
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
            className="text-yellow-700 hover:underline"
          >
            LinkedIn
          </a>
        )}
        {socialMedia.github && (
          <a 
            href={socialMedia.github.startsWith('http') ? socialMedia.github : `https://${socialMedia.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-700 hover:underline"
          >
            GitHub
          </a>
        )}
        {socialMedia.portfolio && (
          <a 
            href={socialMedia.portfolio.startsWith('http') ? socialMedia.portfolio : `https://${socialMedia.portfolio}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-700 hover:underline"
          >
            Portfolio
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
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Professional Summary
      </h2>
      <div className="p-3 bg-gray-50 rounded">
        <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-line">{summary}</p>
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
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Work Experience
      </h2>
      {experiences.map((exp) => {
        const dateRange = formatDateRange(exp.startDate, exp.endDate)
        
        return (
          <div key={exp.id} className="mb-3 p-3 bg-gray-50 rounded">
            <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
              <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
              {dateRange && (
                <span className="text-gray-500 text-xs bg-yellow-100 px-2 py-0.5 rounded">
                  {dateRange}
                </span>
              )}
            </div>
            <p className="text-gray-700 font-medium text-xs mb-1">{exp.company}</p>
            <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-line">{exp.description}</p>
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
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Projects
      </h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-3 p-3 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{project.name}</h3>
          {project.techStack && (
            <p className="text-gray-600 text-xs mb-1">
              <span className="font-medium">Tech:</span> {project.techStack}
            </p>
          )}
          <p className="text-gray-600 text-xs leading-relaxed mb-1">{project.description}</p>
          <div className="flex gap-3 text-xs">
            {project.demoLink && (
              <a 
                href={project.demoLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:underline"
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
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Education
      </h2>
      {education.map((edu) => (
        <div key={edu.id} className="mb-2 p-3 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
          <p className="text-gray-700 text-xs mt-0.5">{edu.school}</p>
          <p className="text-gray-500 text-xs mt-0.5">{edu.year}</p>
          {edu.gpa && <p className="text-gray-500 text-xs mt-0.5">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </section>
  )
}

// Skills Section 
const SkillsSection = ({ skills }) => {
  if (!skills?.length) return null
  
  return (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Technical Skills
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium"
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
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Achievements
      </h2>
      {achievements.map((achievement) => (
        <div key={achievement.id} className="mb-2 p-2 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-900 text-xs">{achievement.title}</h3>
          <p className="text-gray-600 text-xs">{achievement.organization}</p>
          <p className="text-gray-500 text-xs">{achievement.year}</p>
        </div>
      ))}
    </section>
  )
}

// Languages Section 
const LanguagesSection = ({ languages }) => {
  if (!languages?.length) return null
  
  return (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Languages
      </h2>
      <div className="space-y-1.5">
        {languages.map((language) => (
          <div key={language.id} className="p-2 bg-gray-50 rounded">
            <span className="font-semibold text-gray-900 text-xs">{language.language}</span>
            <span className="text-gray-600 text-xs ml-1">- {language.proficiency}</span>
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
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Certifications
      </h2>
      <div className="space-y-1.5">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-2 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-900 text-xs">{cert.name}</h3>
            <p className="text-gray-600 text-xs">{cert.organization}</p>
            <p className="text-gray-500 text-xs">{cert.year}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Interests Section 
const InterestsSection = ({ interests }) => {
  if (!interests?.length) return null
  
  return (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wide">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" aria-hidden="true"></div>
        Interests
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {interests.map((interest, index) => (
          <span 
            key={index}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
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
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-bold px-4 py-1.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm"
      aria-label="Export resume as PDF"
    >
      <span aria-hidden="true">{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="bg-white text-gray-800 p-6 font-sans">
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-3">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-32 bg-gray-200 rounded"></div>
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
        <div className="bg-white text-gray-800 p-6 font-sans text-center">
          <div className="text-red-500 text-base mb-2">⚠️ Failed to load resume</div>
          <p className="text-gray-600 text-xs mb-3">Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-black px-3 py-1 rounded-lg hover:bg-yellow-400 transition text-sm"
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
      <div className="bg-white text-gray-800 p-4 font-sans">
        <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
        
        <div ref={resumeRef} className="resume-content">
          <ResumeHeader 
            personalInfo={safeData.personalInfo}
            socialMedia={safeData.socialMedia}
          />

          <ProfessionalSummary summary={safeData.professionalSummary} />

          {/* Two Column Layout - Optimized */}
          <div 
            className="resume-two-column-layout"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr', 
              gap: '20px',
              width: '100%'
            }}
          >
            {/* Left Column - Main Content (Experience, Projects, Education, Achievements) */}
            <div style={{ minWidth: 0 }}>
              <ExperienceSection experiences={safeData.experience} />
              <ProjectsSection projects={safeData.projects} />
              <EducationSection education={safeData.education} />
              <AchievementsSection achievements={safeData.achievements} />
            </div>

            {/* Right Column - Sidebar (Skills, Certifications, Languages, Interests) */}
            <div style={{ minWidth: 0 }}>
              <SkillsSection skills={safeData.skills} />
              <CertificationsSection certifications={safeData.certifications} />
              <LanguagesSection languages={safeData.languages} />
              <InterestsSection interests={safeData.interests} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Screen styles - Optimized */
        .resume-two-column-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.25rem;
        }
        
        @media (max-width: 768px) {
          .resume-two-column-layout {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        
        /* Print styles - Optimized for one page */
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
            gap: 20px !important;
            page-break-inside: avoid !important;
          }
          
          /* Prevent column breaks */
          .resume-two-column-layout > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Prevent sections from breaking */
          section, .mb-3, .mb-4, .mb-5 {
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
          
          /* Remove shadows and animations */
          .shadow-lg, .shadow-md, .shadow-sm, .hover\\:scale-105 {
            box-shadow: none !important;
            transform: none !important;
          }
          
          /* Ensure borders */
          .border-b {
            border-bottom-width: 1px !important;
          }
          
          /* Optimize spacing for print */
          .mb-2 { margin-bottom: 0.5rem !important; }
          .mb-3 { margin-bottom: 0.75rem !important; }
          .mb-4 { margin-bottom: 1rem !important; }
          .mb-5 { margin-bottom: 1.25rem !important; }
          .mt-1 { margin-top: 0.25rem !important; }
          .p-2 { padding: 0.5rem !important; }
          .p-3 { padding: 0.75rem !important; }
          
          /* Optimize font sizes for print */
          .text-xs { font-size: 9pt !important; }
          .text-sm { font-size: 10pt !important; }
          .text-base { font-size: 11pt !important; }
          .text-lg { font-size: 12pt !important; }
          .text-2xl { font-size: 16pt !important; }
        }
        
        @page {
          size: A4;
          margin: 12mm;
        }
      `}</style>
    </ErrorBoundary>
  )
}