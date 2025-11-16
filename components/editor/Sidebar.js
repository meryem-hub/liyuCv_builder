// components/editor/Sidebar.js
'use client'
import { useResumeStore } from '@/lib/store'

export default function Sidebar() {
  const { 
    resume, 
    updatePersonalInfo, 
    updateSkills,
    updateExperience,
    updateEducation,
    updateProjects,
    updateSocialMedia,
    updateAchievements,
    updateReferences
  } = useResumeStore()

  // Delete experience entry
  const deleteExperience = (id) => {
    const newExp = resume.experience.filter(exp => exp.id !== id)
    updateExperience(newExp)
  }

  // Delete project entry
  const deleteProject = (id) => {
    const newProjects = resume.projects.filter(project => project.id !== id)
    updateProjects(newProjects)
  }

  // Delete education entry
  const deleteEducation = (id) => {
    const newEdu = resume.education.filter(edu => edu.id !== id)
    updateEducation(newEdu)
  }

  return (
    <div className="w-80 bg-gray-800 text-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Edit Your CV</h2>
      
      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Personal Information</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={resume.personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Professional Title"
            value={resume.personalInfo.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={resume.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Phone"
            value={resume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={resume.personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Social Media</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={resume.socialMedia?.linkedin || ''}
            onChange={(e) => updateSocialMedia({ linkedin: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={resume.socialMedia?.github || ''}
            onChange={(e) => updateSocialMedia({ github: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Twitter URL"
            value={resume.socialMedia?.twitter || ''}
            onChange={(e) => updateSocialMedia({ twitter: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Portfolio Website"
            value={resume.socialMedia?.portfolio || ''}
            onChange={(e) => updateSocialMedia({ portfolio: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Experience</h3>
        {resume.experience.map((exp, index) => (
          <div key={exp.id} className="mb-6 p-4 bg-gray-700 rounded-lg relative">
            {/* Delete Button */}
            <button
              onClick={() => deleteExperience(exp.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
            >
              ×
            </button>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.position}
                onChange={(e) => {
                  const newExp = [...resume.experience]
                  newExp[index].position = e.target.value
                  updateExperience(newExp)
                }}
                className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...resume.experience]
                  newExp[index].company = e.target.value
                  updateExperience(newExp)
                }}
                className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input
                type="text"
                placeholder="Start Date (e.g., Jan 2020)"
                value={exp.startDate}
                onChange={(e) => {
                  const newExp = [...resume.experience]
                  newExp[index].startDate = e.target.value
                  updateExperience(newExp)
                }}
                className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="End Date (e.g., Present)"
                value={exp.endDate}
                onChange={(e) => {
                  const newExp = [...resume.experience]
                  newExp[index].endDate = e.target.value
                  updateExperience(newExp)
                }}
                className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
              />
            </div>
            <textarea
              placeholder="Job responsibilities and achievements (one per line)"
              value={exp.description}
              onChange={(e) => {
                const newExp = [...resume.experience]
                newExp[index].description = e.target.value
                updateExperience(newExp)
              }}
              rows="3"
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const newExp = [...resume.experience, {
              id: Date.now(),
              company: '',
              position: '',
              startDate: '',
              endDate: 'Present',
              description: ''
            }]
            updateExperience(newExp)
          }}
          className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium"
        >
          + Add Experience
        </button>
      </div>

      {/* Projects */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Projects</h3>
        {resume.projects?.map((project, index) => (
          <div key={project.id} className="mb-6 p-4 bg-gray-700 rounded-lg relative">
            {/* Delete Button */}
            <button
              onClick={() => deleteProject(project.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
            >
              ×
            </button>
            
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => {
                const newProjects = [...resume.projects]
                newProjects[index].name = e.target.value
                updateProjects(newProjects)
              }}
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 mb-2"
            />
            <textarea
              placeholder="Project description and key features"
              value={project.description}
              onChange={(e) => {
                const newProjects = [...resume.projects]
                newProjects[index].description = e.target.value
                updateProjects(newProjects)
              }}
              rows="2"
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 mb-2"
            />
            <input
              type="text"
              placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
              value={project.techStack}
              onChange={(e) => {
                const newProjects = [...resume.projects]
                newProjects[index].techStack = e.target.value
                updateProjects(newProjects)
              }}
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Live Demo URL"
                value={project.demoLink}
                onChange={(e) => {
                  const newProjects = [...resume.projects]
                  newProjects[index].demoLink = e.target.value
                  updateProjects(newProjects)
                }}
                className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="GitHub Repository URL"
                value={project.githubLink}
                onChange={(e) => {
                  const newProjects = [...resume.projects]
                  newProjects[index].githubLink = e.target.value
                  updateProjects(newProjects)
                }}
                className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newProjects = [...(resume.projects || []), {
              id: Date.now(),
              name: '',
              description: '',
              techStack: '',
              demoLink: '',
              githubLink: ''
            }]
            updateProjects(newProjects)
          }}
          className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium"
        >
          + Add Project
        </button>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Skills</h3>
        <input
          type="text"
          placeholder="Add skills (comma separated)"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const newSkill = e.target.value.trim()
              if (newSkill) {
                updateSkills([...resume.skills, newSkill])
                e.target.value = ''
              }
            }
          }}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {resume.skills.map((skill, index) => (
            <span 
              key={index}
              className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center"
            >
              {skill}
              <button
                onClick={() => {
                  const newSkills = resume.skills.filter((_, i) => i !== index)
                  updateSkills(newSkills)
                }}
                className="ml-2 text-black hover:text-gray-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Education</h3>
        {resume.education.map((edu, index) => (
          <div key={edu.id} className="mb-4 p-4 bg-gray-700 rounded-lg relative">
            {/* Delete Button */}
            <button
              onClick={() => deleteEducation(edu.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
            >
              ×
            </button>
            
            <input
              type="text"
              placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
              value={edu.degree}
              onChange={(e) => {
                const newEdu = [...resume.education]
                newEdu[index].degree = e.target.value
                updateEducation(newEdu)
              }}
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 mb-2"
            />
            <input
              type="text"
              placeholder="University/School"
              value={edu.school}
              onChange={(e) => {
                const newEdu = [...resume.education]
                newEdu[index].school = e.target.value
                updateEducation(newEdu)
              }}
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 mb-2"
            />
            <input
              type="text"
              placeholder="Graduation Year"
              value={edu.year}
              onChange={(e) => {
                const newEdu = [...resume.education]
                newEdu[index].year = e.target.value
                updateEducation(newEdu)
              }}
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const newEdu = [...resume.education, {
              id: Date.now(),
              school: '',
              degree: '',
              year: ''
            }]
            updateEducation(newEdu)
          }}
          className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium"
        >
          + Add Education
        </button>
      </div>

      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Templates</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-gray-700 rounded-lg border-2 border-yellow-500 hover:bg-gray-600 transition">
            Modern
          </button>
          <button className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition">
            Classic
          </button>
          <button className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition">
            Executive
          </button>
          <button className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition">
            Creative
          </button>
        </div>
      </div>
    </div>
  )
}