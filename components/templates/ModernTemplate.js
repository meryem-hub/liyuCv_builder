'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'
import { Linkedin, Github, Globe, Download, RefreshCw } from 'lucide-react'

const ResumeHeader = ({ personalInfo, socialMedia }) => (
  <div className="text-center mb-2 border-b border-yellow-500 pb-4">
    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mt-0">{personalInfo.name}</h1>
    
    <p className="text-sm text-gray-600 mt-0.5">{personalInfo.title}</p>
    
    <div className="flex justify-center flex-wrap gap-2 mt-1 text-0.5xs text-gray-500">
      <span>{personalInfo.email}</span>
      <span>•</span>
      <span>{personalInfo.phone}</span>
      <span>•</span>
      <span>{personalInfo.location}</span>
    </div>

    {socialMedia && Object.keys(socialMedia).length > 0 && (
      <div className="flex justify-center flex-wrap gap-4 mt-3 text-0.5xs">
        {socialMedia.linkedin && (
          <a
            href={socialMedia.linkedin.startsWith('http') ? socialMedia.linkedin : `https://${socialMedia.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-700 hover:text-yellow-600 transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3 h-3" />
            LinkedIn
          </a>
        )}
        {socialMedia.github && (
          <a
            href={socialMedia.github.startsWith('http') ? socialMedia.github : `https://${socialMedia.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            <Github className="w-3 h-3" />
            GitHub
          </a>
        )}
        {socialMedia.portfolio && (
          <a
            href={socialMedia.portfolio.startsWith('http') ? socialMedia.portfolio : `https://${socialMedia.portfolio}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500-700 hover:text-yellow-600 transition-colors flex items-center gap-1"
          >
            <Globe className="w-3 h-3" />
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
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-1 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Professional Summary
      </h2>
      <div className="p-2.5 bg-gray-50 rounded">
        <p className="text-gray-700 text-0.5xs leading-relaxed whitespace-pre-line">{summary}</p>
      </div>
    </section>
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
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Work Experience
      </h2>
      {experiences.map((exp) => {
        const dateRange = formatDateRange(exp.startDate, exp.endDate)

        return (
          <div key={exp.id} className="mb-3 p-2.5 bg-gray-50 rounded">
            <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
              <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
              {dateRange && (
                <span className="text-gray-500 text-0.5xs bg-yellow-100 px-2 py-0.5 rounded">
                  {dateRange}
                </span>
              )}
            </div>
            <p className="text-gray-700 font-medium text-0.5xs mb-1">{exp.company}</p>
            <p className="text-gray-600 text-0.5xs leading-relaxed whitespace-pre-line">{exp.description}</p>
          </div>
        )
      })}
    </section>
  )
}

const ProjectsSection = ({ projects }) => {
  if (!projects?.length) return null

  return (
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Projects
      </h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-3 p-2.5 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{project.name}</h3>
          {project.techStack && (
            <p className="text-gray-600 text-0.5xs mb-1">
              <span className="font-medium">Tech:</span> {project.techStack}
            </p>
          )}
          <p className="text-gray-600 text-0.5xs leading-relaxed mb-1.5">{project.description}</p>
          <div className="flex gap-3 text-0.5xs">
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline">
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
    </section>
  )
}

const EducationSection = ({ education }) => {
  if (!education?.length) return null

  return (
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Education
      </h2>
      {education.map((edu) => (
        <div key={edu.id} className="mb-3 p-2.5 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
          <p className="text-gray-700 text-0.5xs mt-0.5">{edu.school}</p>
          <p className="text-gray-500 text-0.5xs mt-0.5">{edu.year}</p>
          {edu.gpa && <p className="text-gray-500 text-0.5xs mt-0.5">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </section>
  )
}

const SkillsSection = ({ skills }) => {
  if (!skills?.length) return null

  return (
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Technical Skills
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-yellow-500 px-3 py-1 rounded text-0.5xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

const AchievementsSection = ({ achievements }) => {
  if (!achievements?.length) return null

  return (
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Achievements
      </h2>
      {achievements.map((achievement) => (
        <div key={achievement.id} className="mb-2.5 p-2 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-900 text-0.5xs">{achievement.title}</h3>
          <p className="text-gray-600 text-0.5xs">{achievement.organization}</p>
          <p className="text-gray-500 text-0.5xs">{achievement.year}</p>
        </div>
      ))}
    </section>
  )
}

const LanguagesSection = ({ languages }) => {
  if (!languages?.length) return null

  return (
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Languages
      </h2>
      <div className="space-y-2">
        {languages.map((language) => (
          <div key={language.id} className="p-2.5 bg-gray-50 rounded">
            <span className="font-semibold text-gray-900 text-0.5xs">{language.language}</span>
            <span className="text-gray-600 text-0.5xs ml-1">- {language.proficiency}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const CertificationsSection = ({ certifications }) => {
  if (!certifications?.length) return null

  return (
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Certifications
      </h2>
      <div className="space-y-2">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-2.5 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-900 text-0.5xs">{cert.name}</h3>
            <p className="text-gray-600 text-0.5xs">{cert.organization}</p>
            <p className="text-gray-500 text-0.5xs">{cert.year}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const InterestsSection = ({ interests }) => {
  if (!interests?.length) return null

  return (
    <section className="mb-4">
      <h2 className="text-0.5xs font-bold text-gray-900 mb-2 flex items-center uppercase tracking-widest">
        <div className="w-1 h-3 bg-yellow-500 mr-2 rounded-full" />
        Interests
      </h2>
      <div className="space-y-2">
        {interests.map((interest, index) => (
          <div
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-0.5xs"
          >
            {interest}
          </div>
        ))}
      </div>
    </section>
  )
}

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-4 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-bold px-4 py-1.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm"
    >
      {isExporting ? (
        <RefreshCw className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.error('Resume Error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white text-gray-800 p-6 font-sans text-center">
          <div className="text-red-500 text-base mb-2">Failed to load resume</div>
          <p className="text-gray-600 text-0.5xs mb-3">Please refresh the page or try again later.</p>
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
      <div className="bg-white text-gray-800 font-sans">

        <div ref={resumeRef} className="resume-container px-7 py-5 md:px-9">
                  <div className="print:hidden absolute top-4 right-4 z-10">

                  <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
</div>
          <ResumeHeader
            personalInfo={safeData.personalInfo}
            socialMedia={safeData.socialMedia}
          />
          <ProfessionalSummary summary={safeData.professionalSummary} />

          <div
            className="resume-two-column-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '20px',
              width: '100%'
            }}
          >
            <div style={{ minWidth: 0 }}>
              <ExperienceSection experiences={safeData.experience} />
              <ProjectsSection projects={safeData.projects} />
              <EducationSection education={safeData.education} />
              <AchievementsSection achievements={safeData.achievements} />
            </div>
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
        .resume-two-column-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .resume-two-column-layout {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
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

          .resume-container {
            padding-left: 25px !important;
            padding-right: 25px !important;
            padding-top: 28px !important;
            padding-bottom: 28px !important;
          }

          .resume-two-column-layout {
            gap: 20px !important;
          }

          section, .mb-3, .mb-4, .mb-2.5 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          .bg-yellow-500 {
            background-color: #eab308 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .bg-gray-50, .bg-yellow-100, .bg-gray-100 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </ErrorBoundary>
  )
}