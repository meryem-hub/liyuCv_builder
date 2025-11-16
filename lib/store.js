// lib/store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useResumeStore = create(
  persist(
    (set, get) => ({
      // Current resume data
      resume: {
        personalInfo: {
          name: 'Your Name',
          email: 'email@example.com',
          phone: '+1234567890',
          location: 'City, Country',
          title: 'Professional Title'
        },
        experience: [
          {
            id: 1,
            company: 'Company Name',
            position: 'Your Position',
            startDate: '2020',
            endDate: 'Present',
            description: 'Describe your responsibilities and achievements...'
          }
        ],
        education: [
          {
            id: 1,
            school: 'University Name',
            degree: 'Your Degree',
            year: '2020'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Team Leadership']
      },
      
      // Current template
      currentTemplate: 'modern',
      
      // Actions
      updatePersonalInfo: (info) => set((state) => ({
        resume: { ...state.resume, personalInfo: { ...state.resume.personalInfo, ...info } }
      })),
      updateProjects: (projects) =>
  set((state) => ({ resume: { ...state.resume, projects } })),

updateSocialMedia: (socialMedia) =>
  set((state) => ({ 
    resume: { 
      ...state.resume, 
      socialMedia: { ...state.resume.socialMedia, ...socialMedia } 
    } 
  })),

updateAchievements: (achievements) =>
  set((state) => ({ resume: { ...state.resume, achievements } })),

updateReferences: (references) =>
  set((state) => ({ resume: { ...state.resume, references } })),
      updateExperience: (experience) => set((state) => ({
        resume: { ...state.resume, experience }
      })),
      
      updateEducation: (education) => set((state) => ({
        resume: { ...state.resume, education }
      })),
      
      updateSkills: (skills) => set((state) => ({
        resume: { ...state.resume, skills }
      })),
      
      setTemplate: (template) => set({ currentTemplate: template })
    }),
    {
      name: 'resume-storage', // localStorage key
    }
  )
) 