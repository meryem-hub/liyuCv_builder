// components/templates/ProfessionalTemplate.js
'use client'
import { useRef } from 'react'

export default function ProfessionalTemplate({ resume }) {
  const resumeRef = useRef(null)
  
  if (!resume) {
    return (
      <div className="bg-white text-gray-800 p-8 font-sans text-center">
        <div className="text-blue-600 text-lg">Loading resume...</div>
      </div>
    )
  }

  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], socialMedia = {} } = resume

  const safePersonalInfo = {
    name: personalInfo?.name || 'Your Name',
    title: personalInfo?.title || 'Professional Title',
    email: personalInfo?.email || 'your.email@example.com',
    phone: personalInfo?.phone || '+1234567890',
    location: personalInfo?.location || 'City, Country',
    ...personalInfo
  }

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div ref={resumeRef} className="bg-white text-gray-800 font-sans min-h-screen">
      {/* Header with Blue Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleExportPDF}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm mb-6"
          >
            <span>📄</span>
            <span>Save as PDF</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3">{safePersonalInfo.name}</h1>
            <p className="text-xl text-blue-100 mb-6">{safePersonalInfo.title}</p>
            <div className="flex justify-center flex-wrap gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>{safePersonalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>{safePersonalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>{safePersonalInfo.location}</span>
              </div>
            </div>
            
            {socialMedia && (
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {socialMedia.linkedin && (
                  <span className="text-blue-100">LinkedIn: {socialMedia.linkedin}</span>
                )}
                {socialMedia.github && (
                  <span className="text-blue-100">GitHub: {socialMedia.github}</span>
                )}
                {socialMedia.portfolio && (
                  <span className="text-blue-100">Portfolio: {socialMedia.portfolio}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Experienced professional with a proven track record of delivering exceptional results. 
                Passionate about innovation and continuous improvement.
              </p>
            </section>

            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-blue-500 pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                        <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-lg text-blue-700 font-medium mb-3">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">
                  Projects
                </h2>
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">{project.name}</h3>
                      {project.techStack && (
                        <p className="text-blue-700 mb-3">
                          <strong>Tech Stack:</strong> {project.techStack}
                        </p>
                      )}
                      <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex gap-4">
                        {project.demoLink && (
                          <a href={project.demoLink} className="text-blue-600 hover:text-blue-800 font-medium">
                            Live Demo →
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} className="text-gray-600 hover:text-gray-800 font-medium">
                            Source Code →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start p-4 bg-white border border-blue-200 rounded-lg">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-700">{edu.school}</p>
                      </div>
                      <span className="text-blue-600 font-medium">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">
                  Skills & Expertise
                </h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">
                Languages
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">English</span>
                  <span className="text-blue-600">Fluent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Arabic</span>
                  <span className="text-blue-600">Native</span>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-200">
                Certifications
              </h2>
              <div className="space-y-3">
                <div className="text-gray-700">
                  <div className="font-medium">AWS Certified Solutions Architect</div>
                  <div className="text-sm text-blue-600">2023</div>
                </div>
                <div className="text-gray-700">
                  <div className="font-medium">Google Professional Cloud Architect</div>
                  <div className="text-sm text-blue-600">2022</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}