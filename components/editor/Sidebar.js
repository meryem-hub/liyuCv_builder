// components/editor/Sidebar.js - UPDATED WITH PROFESSIONAL SUMMARY
'use client'
import { useResumeStore } from '@/lib/store'
import { Crown, Zap, Award, Palette, User, Menu, X, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Sidebar() {
  const { 
    resume, 
    currentTemplate,
    updatePersonalInfo, 
    updateProfessionalSummary, // ADD THIS
    updateSkills,
    updateExperience,
    updateEducation,
    updateProjects,
    updateSocialMedia,
    updateAchievements,
    updateReferences,
    updateLanguages,
    updateCertifications,
    updateInterests,
    addItem,
    removeItem,
    updateItem
  } = useResumeStore()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Delete functions
  const deleteExperience = (id) => {
    const newExp = resume.experience.filter(exp => exp.id !== id)
    updateExperience(newExp)
  }

  const deleteProject = (id) => {
    const newProjects = resume.projects.filter(project => project.id !== id)
    updateProjects(newProjects)
  }

  const deleteEducation = (id) => {
    const newEdu = resume.education.filter(edu => edu.id !== id)
    updateEducation(newEdu)
  }

  const deleteAchievement = (id) => {
    const newAchievements = resume.achievements.filter(achievement => achievement.id !== id)
    updateAchievements(newAchievements)
  }

  const deleteReference = (id) => {
    const newReferences = resume.references.filter(reference => reference.id !== id)
    updateReferences(newReferences)
  }

  const deleteLanguage = (id) => {
    const newLanguages = resume.languages.filter(language => language.id !== id)
    updateLanguages(newLanguages)
  }

  const deleteCertification = (id) => {
    const newCertifications = resume.certifications.filter(certification => certification.id !== id)
    updateCertifications(newCertifications)
  }

  // Get template info
  const getTemplateInfo = () => {
    switch(currentTemplate) {
      case 'modern':
        return { icon: Zap, color: 'from-yellow-400 to-yellow-600', name: 'Modern' }
      case 'executive':
        return { icon: User, color: 'from-indigo-600 to-purple-700', name: 'Executive' }
      case 'professional':
        return { icon: Award, color: 'from-blue-500 to-blue-700', name: 'Professional' }
      case 'creative':
        return { icon: Palette, color: 'from-purple-500 to-pink-600', name: 'Creative' }
      case 'minimal':
        return { icon: Crown, color: 'from-green-500 to-green-700', name: 'Minimal' }
      default:
        return { icon: Zap, color: 'from-yellow-400 to-yellow-600', name: 'Modern' }
    }
  }

  const templateInfo = getTemplateInfo()
  const TemplateIcon = templateInfo.icon

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-yellow-500 text-black p-3 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-gray-800 text-white p-6 overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-2xl font-bold text-yellow-400">Edit Your CV</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Title */}
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 hidden lg:block">
          Edit Your CV
        </h2>
      
        {/* Current Template Display */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Current Template</h3>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${templateInfo.color} rounded-lg flex items-center justify-center`}>
                <TemplateIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">{templateInfo.name}</div>
                <Link 
                  href="/templates" 
                  className="text-yellow-400 text-sm hover:text-yellow-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Change Template
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary - UPDATED SECTION */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Professional Summary</h3>
          <textarea
            placeholder="Write a compelling professional summary that highlights your key qualifications, experience, and career objectives..."
            value={resume.professionalSummary || ''} // CHANGED FROM personalInfo.summary
            onChange={(e) => updateProfessionalSummary(e.target.value)} // CHANGED TO updateProfessionalSummary
            rows="4"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
          />
          <p className="text-xs text-gray-400 mt-2">
            This appears at the top of your resume. Keep it concise and impactful (3-5 lines).
          </p>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Personal Information</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={resume.personalInfo.name}
              onChange={(e) => updatePersonalInfo({ name: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
            <input
              type="text"
              placeholder="Professional Title"
              value={resume.personalInfo.title}
              onChange={(e) => updatePersonalInfo({ title: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={resume.personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
            <input
              type="text"
              placeholder="Phone"
              value={resume.personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
            <input
              type="text"
              placeholder="Location"
              value={resume.personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
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
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
            <input
              type="text"
              placeholder="GitHub URL"
              value={resume.socialMedia?.github || ''}
              onChange={(e) => updateSocialMedia({ github: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
            <input
              type="text"
              placeholder="Portfolio Website"
              value={resume.socialMedia?.portfolio || ''}
              onChange={(e) => updateSocialMedia({ portfolio: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
            <input
              type="text"
              placeholder="X URL"
              value={resume.socialMedia?.X || ''}
              onChange={(e) => updateSocialMedia({ X: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Experience</h3>
          {resume.experience.map((exp, index) => (
            <div key={exp.id} className="mb-6 p-4 bg-gray-700 rounded-lg relative">
              <button
                onClick={() => deleteExperience(exp.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
              >
                ×
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.position}
                  onChange={(e) => {
                    const newExp = [...resume.experience]
                    newExp[index].position = e.target.value
                    updateExperience(newExp)
                  }}
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
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
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExp = [...resume.experience]
                    newExp[index].startDate = e.target.value
                    updateExperience(newExp)
                  }}
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => {
                    const newExp = [...resume.experience]
                    newExp[index].endDate = e.target.value
                    updateExperience(newExp)
                  }}
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
                />
              </div>
              <textarea
                placeholder="Job responsibilities and achievements"
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...resume.experience]
                  newExp[index].description = e.target.value
                  updateExperience(newExp)
                }}
                rows="3"
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
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
            className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        </div>

        {/* Projects */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Projects</h3>
          {resume.projects?.map((project, index) => (
            <div key={project.id} className="mb-6 p-4 bg-gray-700 rounded-lg relative">
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
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
              />
              <textarea
                placeholder="Project description"
                value={project.description}
                onChange={(e) => {
                  const newProjects = [...resume.projects]
                  newProjects[index].description = e.target.value
                  updateProjects(newProjects)
                }}
                rows="2"
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
              />
              <input
                type="text"
                placeholder="Tech Stack"
                value={project.techStack}
                onChange={(e) => {
                  const newProjects = [...resume.projects]
                  newProjects[index].techStack = e.target.value
                  updateProjects(newProjects)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Live Demo URL"
                  value={project.demoLink}
                  onChange={(e) => {
                    const newProjects = [...resume.projects]
                    newProjects[index].demoLink = e.target.value
                    updateProjects(newProjects)
                  }}
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={project.githubLink}
                  onChange={(e) => {
                    const newProjects = [...resume.projects]
                    newProjects[index].githubLink = e.target.value
                    updateProjects(newProjects)
                  }}
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
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
            className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Education</h3>
          {resume.education.map((edu, index) => (
            <div key={edu.id} className="mb-4 p-4 bg-gray-700 rounded-lg relative">
              <button
                onClick={() => deleteEducation(edu.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
              >
                ×
              </button>
              
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...resume.education]
                  newEdu[index].degree = e.target.value
                  updateEducation(newEdu)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
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
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
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
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
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
            className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
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
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
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
                  className="ml-2 text-black hover:text-gray-800 text-xs"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Achievements & Awards</h3>
          {resume.achievements?.map((achievement, index) => (
            <div key={achievement.id} className="mb-4 p-4 bg-gray-700 rounded-lg relative">
              <button
                onClick={() => deleteAchievement(achievement.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
              >
                ×
              </button>
              
              <input
                type="text"
                placeholder="Achievement Title"
                value={achievement.title}
                onChange={(e) => {
                  const newAchievements = [...resume.achievements]
                  newAchievements[index].title = e.target.value
                  updateAchievements(newAchievements)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
              />
              <input
                type="text"
                placeholder="Organization"
                value={achievement.organization}
                onChange={(e) => {
                  const newAchievements = [...resume.achievements]
                  newAchievements[index].organization = e.target.value
                  updateAchievements(newAchievements)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
              />
              <input
                type="text"
                placeholder="Year"
                value={achievement.year}
                onChange={(e) => {
                  const newAchievements = [...resume.achievements]
                  newAchievements[index].year = e.target.value
                  updateAchievements(newAchievements)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
              />
            </div>
          ))}
          <button
            onClick={() => {
              const newAchievements = [...(resume.achievements || []), {
                id: Date.now(),
                title: '',
                organization: '',
                year: ''
              }]
              updateAchievements(newAchievements)
            }}
            className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Achievement</span>
          </button>
        </div>

        {/* Languages */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Languages</h3>
          {resume.languages?.map((language, index) => (
            <div key={language.id} className="mb-4 p-4 bg-gray-700 rounded-lg relative">
              <button
                onClick={() => deleteLanguage(language.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
              >
                ×
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Language"
                  value={language.language}
                  onChange={(e) => {
                    const newLanguages = [...resume.languages]
                    newLanguages[index].language = e.target.value
                    updateLanguages(newLanguages)
                  }}
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
                />
                <input
                  type="text"
                  placeholder="Proficiency"
                  value={language.proficiency}
                  onChange={(e) => {
                    const newLanguages = [...resume.languages]
                    newLanguages[index].proficiency = e.target.value
                    updateLanguages(newLanguages)
                  }}
                  className="p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newLanguages = [...(resume.languages || []), {
                id: Date.now(),
                language: '',
                proficiency: ''
              }]
              updateLanguages(newLanguages)
            }}
            className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Language</span>
          </button>
        </div>

        {/* Certifications */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Certifications</h3>
          {resume.certifications?.map((certification, index) => (
            <div key={certification.id} className="mb-4 p-4 bg-gray-700 rounded-lg relative">
              <button
                onClick={() => deleteCertification(certification.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
              >
                ×
              </button>
              
              <input
                type="text"
                placeholder="Certification Name"
                value={certification.name}
                onChange={(e) => {
                  const newCertifications = [...resume.certifications]
                  newCertifications[index].name = e.target.value
                  updateCertifications(newCertifications)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
              />
              <input
                type="text"
                placeholder="Issuing Organization"
                value={certification.organization}
                onChange={(e) => {
                  const newCertifications = [...resume.certifications]
                  newCertifications[index].organization = e.target.value
                  updateCertifications(newCertifications)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm mb-2"
              />
              <input
                type="text"
                placeholder="Year"
                value={certification.year}
                onChange={(e) => {
                  const newCertifications = [...resume.certifications]
                  newCertifications[index].year = e.target.value
                  updateCertifications(newCertifications)
                }}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
              />
            </div>
          ))}
          <button
            onClick={() => {
              const newCertifications = [...(resume.certifications || []), {
                id: Date.now(),
                name: '',
                organization: '',
                year: ''
              }]
              updateCertifications(newCertifications)
            }}
            className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certification</span>
          </button>
        </div>

        {/* Interests */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Interests</h3>
          <input
            type="text"
            placeholder="Add interests (comma separated)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const newInterest = e.target.value.trim()
                if (newInterest) {
                  updateInterests([...(resume.interests || []), newInterest])
                  e.target.value = ''
                }
              }
            }}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {resume.interests?.map((interest, index) => (
              <span 
                key={index}
                className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center"
              >
                {interest}
                <button
                  onClick={() => {
                    const newInterests = resume.interests.filter((_, i) => i !== index)
                    updateInterests(newInterests)
                  }}
                  className="ml-2 text-black hover:text-gray-800 text-xs"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Template Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Need a Different Template?</h3>
          <Link 
            href="/templates"
            onClick={() => setIsSidebarOpen(false)}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium text-center block border border-gray-600 text-sm"
          >
            Browse All Templates
          </Link>
        </div>
      </div>
    </>
  )
}