'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { exportToPDF } from '../../app/utils/exportPDF'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-6 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-gray-900 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ml-auto text-sm"
      aria-label="Export resume as PDF"
    >
      <span aria-hidden="true">{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

export default function ElegantProfessionalTemplate({ resume }) {
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
    projects = [],
    achievements = []
  } = resume

  const safePersonalInfo = {
    name: personalInfo?.name || 'Jennifer Martinez',
    title: personalInfo?.title || 'Certified Public Accountant',
    email: personalInfo?.email || 'jennifer.martinez@accounting.com',
    phone: personalInfo?.phone || '+1 (212) 555-7890',
    location: personalInfo?.location || 'New York, NY',
    photo: personalInfo?.photo || null,
    ...personalInfo
  }

  const safeSummary =
    professionalSummary ||
    `Detail-oriented Certified Public Accountant with 7+ years of experience in financial accounting, tax preparation, and audit compliance. Proven expertise in financial statement analysis, GAAP standards, and internal controls. Committed to delivering accurate financial reporting and strategic tax planning for diverse client portfolios.`

  const safeExperience =
    experience.length > 0
      ? experience
      : [
          {
            id: 1,
            position: 'Senior Accountant',
            company: 'Deloitte & Touche LLP',
            startDate: '2021',
            endDate: 'Present',
            description: 'Manage financial audits for Fortune 500 clients, ensuring compliance with GAAP and SEC regulations. Prepare consolidated financial statements and conduct internal control assessments. Reduced audit findings by 35% through enhanced documentation procedures.'
          },
          {
            id: 2,
            position: 'Staff Accountant',
            company: 'Ernst & Young (EY)',
            startDate: '2018',
            endDate: '2021',
            description: 'Prepared quarterly and annual financial reports for 25+ corporate clients. Managed accounts payable/receivable and performed bank reconciliations. Assisted in tax preparation and filing for corporate and individual clients.'
          },
          {
            id: 3,
            position: 'Junior Accountant',
            company: 'PricewaterhouseCoopers (PwC)',
            startDate: '2016',
            endDate: '2018',
            description: 'Supported audit engagements and prepared work papers. Assisted with tax return preparation and financial statement analysis. Collaborated with senior accountants to identify discrepancies and implement corrective measures.'
          }
        ]

  const safeEducation =
    education.length > 0
      ? education
      : [
          {
            id: 1,
            degree: 'Master of Science in Accounting',
            school: 'New York University',
            year: '2016',
            details: 'GPA: 3.9 | Beta Gamma Sigma Honor Society'
          },
          {
            id: 2,
            degree: 'Bachelor of Business Administration - Accounting',
            school: 'University of Texas at Austin',
            year: '2014',
            details: 'Magna Cum Laude | GPA: 3.85'
          }
        ]

  const safeSkills =
    skills.length > 0
      ? skills
      : [
          'Financial Accounting',
          'Tax Preparation',
          'Audit & Assurance',
          'GAAP Standards',
          'QuickBooks',
          'SAP',
          'Microsoft Excel',
          'Financial Analysis',
          'Internal Controls',
          'Budgeting',
          'Payroll Processing',
          'Accounts Reconciliation'
        ]

  const safeLanguages =
    languages.length > 0
      ? languages
      : [
          { id: 1, language: 'English', proficiency: 'Native' },
          { id: 2, language: 'Spanish', proficiency: 'Professional' }
        ]

  const safeCertifications =
    certifications.length > 0
      ? certifications
      : [
          { id: 1, name: 'Certified Public Accountant (CPA)', organization: 'AICPA', year: '2017' },
          { id: 2, name: 'Certified Internal Auditor (CIA)', organization: 'IIA', year: '2019' }
        ]

  const safeProjects =
    projects.length > 0
      ? projects
      : [
          {
            id: 1,
            name: 'Tax Optimization Strategy',
            description: 'Led initiative to restructure tax strategy for corporate clients, resulting in $2.5M in tax savings across portfolio.'
          },
          {
            id: 2,
            name: 'Financial Process Automation',
            description: 'Implemented automated reconciliation system reducing monthly closing time from 10 days to 4 days.'
          }
        ]

  const hasPhoto = !!safePersonalInfo.photo

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    const fileName = `resume-${safePersonalInfo.name.replace(/\s+/g, '-')}.pdf`
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
    <div className="bg-white min-h-screen">
      <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
      
      <div ref={resumeRef} className="resume-content w-full bg-white">
        
        {/* Main Grid - 12 columns - FULL WIDTH */}
        <div className="grid grid-cols-12 min-h-screen">
          
          {/* Sidebar - 4 columns */}
          <div className="md:col-span-4 bg-gradient-to-br from-slate-800 to-gray-800 text-white p-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center mb-8">
              {hasPhoto && (
                <div className="mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-white/40 shadow-xl">
                  <Image
                    src={safePersonalInfo.photo}
                    alt={safePersonalInfo.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h1 className="text-2xl font-bold tracking-tight text-white">
                {safePersonalInfo.name}
              </h1>
              <p className="text-md text-gray-200 mt-2 font-light">
                {safePersonalInfo.title}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <h3 className="uppercase text-xs tracking-widest text-gray-300 mb-3">Contact</h3>
              <div className="space-y-1.5 text-sm">
                <p className="text-gray-200">{safePersonalInfo.phone}</p>
                <p className="text-gray-200 break-all">{safePersonalInfo.email}</p>
                <p className="text-gray-200">{safePersonalInfo.location}</p>
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h3 className="uppercase text-xs tracking-widest text-gray-300 mb-3">Education</h3>
              {safeEducation.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-medium text-white text-sm">{edu.degree}</p>
                  <p className="text-gray-300 text-xs">{edu.school}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{edu.year}</p>
                  {edu.details && <p className="text-gray-400 text-xs mt-0.5">{edu.details}</p>}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="uppercase text-xs tracking-widest text-gray-300 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {safeSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-white px-2.5 py-1 rounded-full text-xs border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h3 className="uppercase text-xs tracking-widest text-gray-300 mb-3">Certifications</h3>
              {safeCertifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <p className="text-white text-xs font-medium">{cert.name}</p>
                  <p className="text-gray-300 text-xs">{cert.organization}</p>
                  <p className="text-gray-400 text-xs">{cert.year}</p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <h3 className="uppercase text-xs tracking-widest text-gray-300 mb-3">Languages</h3>
              <div className="space-y-1.5">
                {safeLanguages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-gray-200 text-sm">{lang.language}</span>
                    <span className="text-gray-300 text-xs">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - 8 columns */}
          <div className="md:col-span-8 p-8 bg-white">

            {/* About Me */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800">About Me</h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {safeSummary}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800">Experience</h2>
              {safeExperience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-base text-gray-800">{exp.position}</h3>
                      <p className="text-gray-600 text-sm">{exp.company}</p>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Initiatives */}
            <div>
              <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800">Key Initiatives</h2>
              {safeProjects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h3 className="font-semibold text-sm text-gray-800">{project.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
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
            width: 100%;
          }
          
          .grid {
            margin: 0;
            padding: 0;
          }
          
          .bg-gradient-to-br {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-white\\/10 {
            background-color: rgba(255, 255, 255, 0.1) !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          section, .mb-5, .mb-6, .mb-8 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
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