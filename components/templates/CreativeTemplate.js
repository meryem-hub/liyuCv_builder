// components/templates/CreativeTemplate.js
'use client'
import { useRef } from 'react'

export default function CreativeTemplate({ resume }) {
  const resumeRef = useRef(null)
  
  if (!resume) {
    return (
      <div className="bg-white text-gray-800 p-8 font-sans text-center">
        <div className="text-purple-600 text-lg">Loading resume...</div>
      </div>
    )
  }

  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], socialMedia = {} } = resume

  const safePersonalInfo = {
    name: personalInfo?.name || 'Your Name',
    title: personalInfo?.title || 'Creative Professional',
    email: personalInfo?.email || 'your.email@example.com',
    phone: personalInfo?.phone || '+1234567890',
    location: personalInfo?.location || 'City, Country',
    ...personalInfo
  }

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div ref={resumeRef} className="bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={handleExportPDF}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 ml-auto text-sm mb-8"
          >
            <span>📄</span>
            <span>Save as PDF</span>
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {safePersonalInfo.name}
            </h1>
            <p className="text-xl text-purple-600 mb-6 font-medium">{safePersonalInfo.title}</p>
            
            <div className="flex justify-center flex-wrap gap-6 text-gray-600 mb-4">
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
                <span>✉️</span>
                <span>{safePersonalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
                <span>📱</span>
                <span>{safePersonalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
                <span>📍</span>
                <span>{safePersonalInfo.location}</span>
              </div>
            </div>

            {socialMedia && (
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {socialMedia.linkedin && (
                  <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm">LinkedIn</span>
                )}
                {socialMedia.github && (
                  <span className="text-pink-600 bg-pink-50 px-3 py-1 rounded-full text-sm">GitHub</span>
                )}
                {socialMedia.portfolio && (
                  <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm">Portfolio</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* About */}
            <section className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Creative problem-solver with a passion for innovation and design. 
                Dedicated to creating meaningful experiences and delivering exceptional results.
              </p>
            </section>

            {/* Experience */}
            {experience.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-purple-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <span className="text-purple-600 text-sm bg-purple-50 px-2 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-purple-700 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-purple-700 text-sm">{edu.school}</p>
                      </div>
                      <span className="text-purple-600 font-medium text-sm">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                      <h3 className="font-semibold text-purple-900 mb-2">{project.name}</h3>
                      {project.techStack && (
                        <p className="text-purple-700 text-sm mb-2">
                          <strong>Tech:</strong> {project.techStack}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex gap-3 text-sm">
                        {project.demoLink && (
                          <a href={project.demoLink} className="text-purple-600 hover:text-purple-800 font-medium">
                            Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} className="text-gray-600 hover:text-gray-800 font-medium">
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            <section className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Interests
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <span className="text-center bg-purple-50 text-purple-700 py-2 rounded-lg">UI/UX Design</span>
                <span className="text-center bg-pink-50 text-pink-700 py-2 rounded-lg">Photography</span>
                <span className="text-center bg-purple-50 text-purple-700 py-2 rounded-lg">Travel</span>
                <span className="text-center bg-pink-50 text-pink-700 py-2 rounded-lg">Music</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}