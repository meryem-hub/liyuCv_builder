// components/templates/ModernDarkTemplate.js
'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

// ============================================
// HEADER COMPONENT - Clean & Professional
// ============================================
const ResumeHeader = ({ personalInfo, socialMedia }) => (
  <div className="text-center pt-12 pb-8 border-b border-gray-300 mb-8">
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
      {personalInfo.name || 'Alex Morgan'}
    </h1>
    <p className="text-lg text-gray-600 mb-4">
      {personalInfo.title || 'Senior Software Engineer'}
    </p>
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {personalInfo.email || 'alex.morgan@example.com'}
      </span>
      <span className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {personalInfo.phone || '+1 (555) 123-4567'}
      </span>
      <span className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {personalInfo.location || 'San Francisco, CA'}
      </span>
    </div>
    
    {/* Social Links */}
    {socialMedia && Object.keys(socialMedia).length > 0 && (
      <div className="flex justify-center gap-5 mt-5">
        {socialMedia.github && (
          <a href={socialMedia.github.startsWith('http') ? socialMedia.github : `https://${socialMedia.github}`}
             target="_blank" rel="noopener noreferrer"
             className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            GitHub
          </a>
        )}
        {socialMedia.linkedin && (
          <a href={socialMedia.linkedin.startsWith('http') ? socialMedia.linkedin : `https://${socialMedia.linkedin}`}
             target="_blank" rel="noopener noreferrer"
             className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            LinkedIn
          </a>
        )}
        {socialMedia.portfolio && (
          <a href={socialMedia.portfolio.startsWith('http') ? socialMedia.portfolio : `https://${socialMedia.portfolio}`}
             target="_blank" rel="noopener noreferrer"
             className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            Portfolio
          </a>
        )}
      </div>
    )}
  </div>
)

// ============================================
// PROFILE SUMMARY - Clean & Impactful
// ============================================
const ProfileSummary = ({ summary }) => {
  if (!summary) return null
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Profile
      </h2>
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
      </div>
    </section>
  )
}

// ============================================
// EXPERIENCE SECTION
// ============================================
const ExperienceSection = ({ experiences }) => {
  if (!experiences?.length) return null
  
  const formatDate = (start, end) => {
    if (!start) return ''
    if (!end || end === 'Present') return `${start} — Present`
    return `${start} — ${end}`
  }
  
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-5">
        Experience
      </h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-l-2 border-gray-300 pl-5">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-base">{exp.position}</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {formatDate(exp.startDate, exp.endDate)}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-2">{exp.company}</p>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// PROJECTS SECTION - Technical Showcase
// ============================================
const ProjectsSection = ({ projects }) => {
  if (!projects?.length) return null
  
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-5">
        Featured Projects
      </h2>
      <div className="space-y-5">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
            {project.techStack && (
              <div className="flex flex-wrap gap-2 mb-2">
                {project.techStack.split(',').map((tech, idx) => (
                  <span key={idx} className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{project.description}</p>
            <div className="flex gap-4 text-xs font-medium">
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                   className="text-gray-700 hover:text-gray-900 border-b border-gray-300">
                  Live Demo →
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                   className="text-gray-700 hover:text-gray-900 border-b border-gray-300">
                  GitHub →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// EDUCATION SECTION
// ============================================
const EducationSection = ({ education }) => {
  if (!education?.length) return null
  
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-5">
        Education
      </h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="border-l-2 border-gray-300 pl-5">
            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
            <p className="text-gray-600 text-sm">{edu.school}</p>
            <div className="flex gap-3 text-xs text-gray-500 mt-1">
              <span>{edu.year}</span>
              {edu.gpa && <span>GPA: {edu.gpa}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// SKILLS SECTION - Clean Tags
// ============================================
const SkillsSection = ({ skills }) => {
  if (!skills?.length) return null
  
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Technical Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-200 font-medium">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

// ============================================
// CERTIFICATIONS SECTION
// ============================================
const CertificationsSection = ({ certifications }) => {
  if (!certifications?.length) return null
  
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Certifications
      </h2>
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex justify-between items-start border-b border-gray-200 pb-2">
            <div>
              <p className="font-medium text-gray-800 text-sm">{cert.name}</p>
              <p className="text-xs text-gray-500">{cert.organization}</p>
            </div>
            <span className="text-xs text-gray-500">{cert.year}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// LANGUAGES SECTION
// ============================================
const LanguagesSection = ({ languages }) => {
  if (!languages?.length) return null
  
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Languages
      </h2>
      <div className="space-y-2">
        {languages.map((lang) => (
          <div key={lang.id} className="flex justify-between text-sm">
            <span className="text-gray-800 font-medium">{lang.language}</span>
            <span className="text-gray-500 text-xs">{lang.proficiency}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// ACHIEVEMENTS SECTION
// ============================================
const AchievementsSection = ({ achievements }) => {
  if (!achievements?.length) return null
  
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
        Achievements
      </h2>
      <div className="space-y-3">
        {achievements.map((ach) => (
          <div key={ach.id} className="bg-gray-50 p-3 rounded border border-gray-200">
            <p className="font-medium text-gray-800 text-sm">{ach.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{ach.organization} • {ach.year}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// PDF EXPORT BUTTON
// ============================================
const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-6 print:hidden sticky top-4 z-10">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 text-sm flex items-center gap-2 ml-auto"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {isExporting ? 'Generating PDF...' : 'Export as PDF'}
    </button>
  </div>
)

// ============================================
// LOADING SKELETON
// ============================================
const LoadingSkeleton = () => (
  <div className="bg-white text-gray-800 max-w-4xl mx-auto p-8 font-sans">
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-32 bg-gray-100 rounded"></div>
          <div className="h-40 bg-gray-100 rounded"></div>
        </div>
        <div className="space-y-6">
          <div className="h-36 bg-gray-100 rounded"></div>
          <div className="h-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

// ============================================
// ERROR BOUNDARY
// ============================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.error('CV Render Error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white p-12 text-center max-w-2xl mx-auto">
          <div className="text-gray-600 text-lg mb-3">⚠️ Unable to display resume</div>
          <p className="text-gray-500 text-sm mb-5">Please refresh the page or check your data.</p>
          <button onClick={() => window.location.reload()} 
                  className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm">
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// ============================================
// MAIN TEMPLATE COMPONENT
// ============================================
export default function ModernDarkTemplate({ resume }) {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  // Safe data extraction with elegant fallbacks
  const safeData = {
    personalInfo: {
      name: resume?.personalInfo?.name || 'Elena Voss',
      title: resume?.personalInfo?.title || 'Software Engineer · Systems Architect',
      email: resume?.personalInfo?.email || 'elena.voss@devstudio.com',
      phone: resume?.personalInfo?.phone || '+1 (628) 400-2234',
      location: resume?.personalInfo?.location || 'Berlin, Germany',
      ...resume?.personalInfo
    },
    professionalSummary: resume?.professionalSummary || 'Passionate software engineer with 7+ years of experience building scalable web applications and distributed systems. Expert in React, Node.js, and cloud infrastructure. Strong focus on clean code, performance optimization, and mentoring junior developers.',
    experience: resume?.experience || [],
    education: resume?.education || [],
    skills: resume?.skills || [],
    projects: resume?.projects || [],
    socialMedia: resume?.socialMedia || {},
    achievements: resume?.achievements || [],
    languages: resume?.languages || [],
    certifications: resume?.certifications || []
  }

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    setIsExporting(true)
    try {
      const fileName = `CV_${safeData.personalInfo.name.replace(/\s+/g, '_')}.pdf`
      await exportToPDF(resumeRef.current, fileName)
    } catch (error) {
      console.error('PDF export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  if (!resume) {
    return <LoadingSkeleton />
  }

  return (
    <ErrorBoundary>
      <div className="bg-gray-50 min-h-screen py-8 px-4 font-sans" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <div className="max-w-4xl mx-auto">
          <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
          
          {/* MAIN RESUME CARD - Light Gray & Light Black Theme */}
          <div 
            ref={resumeRef} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden resume-content"
          >
            <div className="px-8 md:px-10 py-8">
              <ResumeHeader 
                personalInfo={safeData.personalInfo}
                socialMedia={safeData.socialMedia}
              />
              
              <ProfileSummary summary={safeData.professionalSummary} />
              
              {/* TWO COLUMN LAYOUT: Left (main) + Right (sidebar) */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* LEFT COLUMN - 2/3 width */}
                <div className="md:col-span-2 space-y-6">
                  <ExperienceSection experiences={safeData.experience} />
                  <ProjectsSection projects={safeData.projects} />
                  <EducationSection education={safeData.education} />
                </div>
                
                {/* RIGHT COLUMN - 1/3 width: Skills & Accolades */}
                <div className="space-y-8">
                  <SkillsSection skills={safeData.skills} />
                  <CertificationsSection certifications={safeData.certifications} />
                  <LanguagesSection languages={safeData.languages} />
                  <AchievementsSection achievements={safeData.achievements} />
                  
                  {/* Optional: subtle tech interests */}
                  {resume?.interests?.length > 0 && (
                    <section>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                        Interests
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        {resume.interests.map((interest, idx) => (
                          <span key={idx} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
              
              {/* subtle footer line - light black */}
              <div className="mt-10 pt-5 border-t border-gray-200 text-center text-xs text-gray-400">
                {safeData.personalInfo.name} · software engineer · references available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT STYLES - Optimized for PDF export */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .bg-gray-50 {
            background: white !important;
          }
          .resume-content {
            box-shadow: none !important;
            border: none !important;
            margin: 0;
            padding: 0;
          }
          .shadow-sm, .shadow-md, .border {
            box-shadow: none !important;
            border-color: #e5e7eb !important;
          }
          .bg-gray-100, .bg-gray-50 {
            background-color: #f9fafb !important;
            break-inside: avoid;
          }
          a {
            text-decoration: none;
            color: #1f2937;
          }
          @page {
            size: A4;
            margin: 1.2cm;
          }
          h1, h2, h3, p {
            orphans: 3;
            widows: 3;
          }
          section, .space-y-6 > div {
            break-inside: avoid;
          }
        }
      `}</style>
    </ErrorBoundary>
  )
}