// components/templates/ComputerScienceGradTemplate.js
'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

const PDFExportButton = ({ onExport, isExporting }) => (
  <div className="text-right mb-6 print:hidden">
    <button
      onClick={onExport}
      disabled={isExporting}
      className="bg-[#C47D4A] hover:bg-[#B06A3A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 flex items-center space-x-2 ml-auto text-sm tracking-wide"
      aria-label="Export resume as PDF"
    >
      <span aria-hidden="true">{isExporting ? '⏳' : '📄'}</span>
      <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
    </button>
  </div>
)

const ExecutiveTemplate = ({ resume }) => {
  const resumeRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  const safeData = {
    personalInfo: {
      firstName: resume?.personalInfo?.firstName || 'Your',
      lastName: resume?.personalInfo?.lastName || 'Name',
      title: resume?.personalInfo?.title || 'Computer Science Graduate',
      email: resume?.personalInfo?.email || 'your.name@email.com',
      phone: resume?.personalInfo?.phone || '+1 (555) 123-4567',
      location: resume?.personalInfo?.location || 'San Francisco, CA',
      linkedin: resume?.personalInfo?.linkedin || 'linkedin.com/in/yourname',
      github: resume?.personalInfo?.github || 'github.com/yourname',
      ...resume?.personalInfo
    },
    about: resume?.professionalSummary || 'Recent Computer Science graduate with strong foundation in software development, algorithms, and full-stack web technologies. Passionate about building scalable applications and solving complex problems through elegant code. Seeking opportunities to contribute to innovative projects and grow as a software engineer.',
    experience: resume?.experience || [
      {
        id: '1',
        position: 'Software Engineering Intern',
        company: 'Tech Solutions Inc.',
        startDate: '2023',
        endDate: '2024',
        description: 'Developed and maintained full-stack web applications using React and Node.js. Collaborated with senior engineers to implement new features and optimize database queries, reducing API response time by 25%. Participated in agile development processes and code reviews.'
      },
      {
        id: '2',
        position: 'Research Assistant',
        company: 'University AI Lab',
        startDate: '2023',
        endDate: '2024',
        description: 'Conducted research on machine learning algorithms for natural language processing. Implemented neural network models using TensorFlow and PyTorch. Published research findings in university journal and presented at undergraduate research symposium.'
      },
      {
        id: '3',
        position: 'Teaching Assistant',
        company: 'Computer Science Department',
        startDate: '2022',
        endDate: '2023',
        description: 'Assisted professor in teaching Data Structures and Algorithms course. Conducted weekly lab sessions for 40+ students. Graded assignments and provided constructive feedback to help students understand complex concepts.'
      }
    ],
    education: resume?.education || [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        year: '2021 — 2025',
        gpa: '3.85',
        honors: 'Cum Laude, Dean\'s List'
      }
    ],
    skills: resume?.skills || [
      'JavaScript/TypeScript',
      'React.js',
      'Node.js',
      'Python',
      'Java',
      'SQL',
      'Git/GitHub',
      'REST APIs',
      'Data Structures',
      'Algorithms',
      'MongoDB',
      'Docker'
    ],
    projects: resume?.projects || [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce application with user authentication, product management, and payment integration using MERN stack. Implemented responsive design and optimized database queries for better performance.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express']
      },
      {
        id: '2',
        name: 'AI Image Classifier',
        description: 'Developed a convolutional neural network for image classification achieving 92% accuracy on CIFAR-10 dataset. Created a web interface using Flask for real-time predictions.',
        tags: ['Python', 'TensorFlow', 'Flask', 'CNN']
      },
      {
        id: '3',
        name: 'Task Management Mobile App',
        description: 'Created cross-platform mobile app for task management with real-time updates, push notifications, and cloud synchronization using React Native and Firebase.',
        tags: ['React Native', 'Firebase', 'Redux']
      }
    ]
  }

  const handleExportPDF = async () => {
    if (!resumeRef.current) return
    const fileName = `${safeData.personalInfo.firstName}-${safeData.personalInfo.lastName}-resume.pdf`
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

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return null
    if (!endDate || endDate.trim() === '') return startDate
    if (endDate === 'Present') return `${startDate} — Present`
    return `${startDate} — ${endDate}`
  }

  // Split skills into two columns
  const midPoint = Math.ceil(safeData.skills.length / 2)
  const leftSkills = safeData.skills.slice(0, midPoint)
  const rightSkills = safeData.skills.slice(midPoint)

  if (!resume) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen p-8">
        <div className="animate-pulse max-w-5xl mx-auto">
          <div className="h-32 bg-[#E8E0D5] rounded-2xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-64 bg-[#E8E0D5] rounded-2xl"></div>
            <div className="h-64 bg-[#E8E0D5] rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen p-6">
      <PDFExportButton onExport={handleExportPDF} isExporting={isExporting} />
      
      <div ref={resumeRef} className="resume-content max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-[#2C2C2C] leading-[1.1] mb-2">
            {safeData.personalInfo.firstName}<br />
            <span className="font-bold text-[#C47D4A]">{safeData.personalInfo.lastName}</span>
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-px bg-[#C47D4A]"></div>
            <p className="text-xs uppercase tracking-[2px] text-[#6B5A4B] font-light">{safeData.personalInfo.title}</p>
          </div>
        </div>

        {/* Contact Information Row */}
        <div className="flex flex-wrap justify-start gap-6 mb-8 text-xs text-[#4A3B2E] border-b border-[#E8E0D5] pb-4">
          <span>{safeData.personalInfo.email}</span>
          <span>{safeData.personalInfo.phone}</span>
          <span>{safeData.personalInfo.location}</span>
          <span>{safeData.personalInfo.linkedin}</span>
          <span>{safeData.personalInfo.github}</span>
        </div>

        {/* About Section */}
        {safeData.about && (
          <div className="mb-8">
            <h2 className="text-[11px] font-bold text-[#C47D4A] mb-3 tracking-[2px] uppercase">About</h2>
            <p className="text-sm text-[#3A2E24] leading-relaxed">{safeData.about}</p>
          </div>
        )}

        {/* TWO-COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Left Column - Experience & Projects */}
          <div style={{ minWidth: 0 }}>
            {/* Experience */}
            {safeData.experience?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-4 tracking-[2px] uppercase">Experience</h2>
                <div className="space-y-5">
                  {safeData.experience.map((exp) => (
                    <div key={exp.id} style={{ paddingLeft: '16px', borderLeft: '1px solid #E8E0D5' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h3 className="font-semibold text-base text-[#2C2C2C]">{exp.position}</h3>
                        <span className="text-[11px] text-[#8B735A]" style={{ fontFamily: 'monospace' }}>{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                      <p className="text-sm text-[#6B5A4B] mb-2">{exp.company}</p>
                      <p className="text-sm text-[#4A3B2E] leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {safeData.projects?.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-4 tracking-[2px] uppercase">Projects</h2>
                <div className="space-y-5">
                  {safeData.projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-semibold text-base text-[#2C2C2C] mb-1">{project.name}</h3>
                      <p className="text-sm text-[#4A3B2E] leading-relaxed mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag, i) => (
                          <span key={i} className="text-[11px] text-[#8B735A]" style={{ fontFamily: 'monospace' }}>/{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Education & Skills 2-COLUMN TABLE */}
          <div>
            
            {/* Education */}
            {safeData.education?.length > 0 && (
              <section className="mb-6">
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-4 tracking-[2px] uppercase">Education</h2>
                <div className="space-y-3">
                  {safeData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-sm text-[#2C2C2C]">{edu.degree}</h3>
                      <p className="text-sm text-[#6B5A4B]">{edu.school}</p>
                      <p className="text-[11px] text-[#8B735A] mt-0.5" style={{ fontFamily: 'monospace' }}>{edu.year}</p>
                      {edu.gpa && <p className="text-[11px] text-[#8B735A] mt-0.5">GPA: {edu.gpa}</p>}
                      {edu.honors && <p className="text-[11px] text-[#8B735A]">{edu.honors}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills - 2 COLUMN TABLE WITH UNDERLINES - USING INLINE STYLES */}
            {safeData.skills?.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold text-[#C47D4A] mb-4 tracking-[2px] uppercase">Technical Skills</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {/* Left Column */}
                  <div>
                    {leftSkills.map((skill, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          paddingTop: '8px', 
                          paddingBottom: '8px', 
                          borderBottom: '1px solid #E8E0D5',
                          fontSize: '14px',
                          color: '#4A3B2E'
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  {/* Right Column */}
                  <div>
                    {rightSkills.map((skill, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          paddingTop: '8px', 
                          paddingBottom: '8px', 
                          borderBottom: '1px solid #E8E0D5',
                          fontSize: '14px',
                          color: '#4A3B2E'
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Space+Mono:wght@400;700&display=swap');
        
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
          
          .bg-\\[\\#FAF7F2\\] {
            background-color: #FAF7F2 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .text-\\[\\#C47D4A\\] {
            color: #C47D4A !important;
          }
          
          section, .space-y-5 > div, .space-y-4 > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
        
        @page {
          size: A4;
          margin: 12mm;
        }
      `}</style>
    </div>
  )
}

export default ExecutiveTemplate