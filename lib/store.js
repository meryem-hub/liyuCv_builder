// lib/store.js -
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Template-specific default data
const getTemplateDefaults = (templateId) => {
  const baseData = {
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
    skills: ['JavaScript', 'React', 'Node.js', 'Team Leadership'],
    projects: [
      {
        id: 1,
        name: 'Project Name',
        description: 'Brief description of your project and key achievements...',
        techStack: 'React, Node.js, MongoDB',
        demoLink: 'https://demo.example.com',
        githubLink: 'https://github.com/username/project'
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/yourname',
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
      portfolio: 'https://yourportfolio.com'
    },
    achievements: [
      {
        id: 1,
        title: 'Employee of the Year',
        organization: 'Company Name',
        year: '2023',
        description: 'Recognized for outstanding performance and contribution to team success.'
      }
    ],
    references: [
      {
        id: 1,
        name: 'Reference Name',
        position: 'Manager',
        company: 'Company Name',
        email: 'reference@company.com',
        phone: '+1234567890'
      }
    ],
    languages: [
      {
        id: 1,
        language: 'English',
        proficiency: 'Fluent'
      },
      {
        id: 2,
        language: 'Arabic',
        proficiency: 'Native'
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Solutions Architect',
        organization: 'Amazon Web Services',
        year: '2023'
      }
    ],
    interests: [
      'UI/UX Design',
      'Photography',
      'Travel',
      'Open Source'
    ]
  }

  // Template-specific modifications
  switch(templateId) {
    case 'professional':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Senior Professional'
        },
        skills: ['Strategic Planning', 'Team Leadership', 'Project Management', 'Business Development'],
        experience: [
          {
            id: 1,
            company: 'Leading Corporation',
            position: 'Senior Manager',
            startDate: '2019',
            endDate: 'Present',
            description: 'Lead cross-functional teams and drive business growth strategies...'
          }
        ]
      }
    case 'creative':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Creative Director'
        },
        skills: ['UI/UX Design', 'Brand Strategy', 'Creative Direction', 'Visual Design', 'Adobe Creative Suite'],
        projects: [
          {
            id: 1,
            name: 'Brand Identity Project',
            description: 'Developed comprehensive brand identity including logo, color palette, and brand guidelines for major client.',
            techStack: 'Adobe Illustrator, Photoshop, Figma',
            demoLink: 'https://behance.net/project',
            githubLink: ''
          }
        ],
        interests: ['Art Exhibitions', 'Photography', 'Typography', 'Digital Art']
      }
    case 'minimal':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Software Engineer'
        },
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'],
        experience: [
          {
            id: 1,
            company: 'Tech Startup Inc.',
            position: 'Full Stack Developer',
            startDate: '2021',
            endDate: 'Present',
            description: 'Develop and maintain scalable web applications using modern technologies...'
          }
        ],
        projects: [
          {
            id: 1,
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce solution with React frontend and Node.js backend.',
            techStack: 'React, Node.js, MongoDB, Stripe API',
            demoLink: 'https://demo-store.com',
            githubLink: 'https://github.com/username/ecommerce'
          }
        ],
        interests: ['Open Source', 'Machine Learning', 'Blockchain', 'Minimalism']
      }
    default: // modern
      return baseData
  }
}

export const useResumeStore = create(
  persist(
    (set, get) => ({
      // Current resume data - starts with modern template defaults
      resume: getTemplateDefaults('modern'),
      
      // Current template
      currentTemplate: 'modern',
      
      // Template Actions - UPDATED to reset data when changing templates
      updateTemplate: (template) => set({ 
        currentTemplate: template,
        resume: getTemplateDefaults(template) // Reset resume data for new template
      }),
      
      // Resume Data Actions
      updatePersonalInfo: (info) => set((state) => ({
        resume: { 
          ...state.resume, 
          personalInfo: { ...state.resume.personalInfo, ...info } 
        }
      })),
      
      updateExperience: (experience) => set((state) => ({
        resume: { ...state.resume, experience }
      })),
      
      updateEducation: (education) => set((state) => ({
        resume: { ...state.resume, education }
      })),
      
      updateSkills: (skills) => set((state) => ({
        resume: { ...state.resume, skills }
      })),
      
      updateProjects: (projects) => set((state) => ({
        resume: { ...state.resume, projects }
      })),
      
      updateSocialMedia: (socialMedia) => set((state) => ({ 
        resume: { 
          ...state.resume, 
          socialMedia: { ...state.resume.socialMedia, ...socialMedia } 
        } 
      })),
      
      updateAchievements: (achievements) => set((state) => ({ 
        resume: { ...state.resume, achievements } 
      })),
      
      updateReferences: (references) => set((state) => ({ 
        resume: { ...state.resume, references } 
      })),
      
      updateLanguages: (languages) => set((state) => ({ 
        resume: { ...state.resume, languages } 
      })),
      
      updateCertifications: (certifications) => set((state) => ({ 
        resume: { ...state.resume, certifications } 
      })),
      
      updateInterests: (interests) => set((state) => ({ 
        resume: { ...state.resume, interests } 
      })),
      
      // Helper function to add a new item to any array field
      addItem: (field, item) => set((state) => ({
        resume: {
          ...state.resume,
          [field]: [...(state.resume[field] || []), { ...item, id: Date.now() }]
        }
      })),
      
      // Helper function to remove an item from any array field
      removeItem: (field, id) => set((state) => ({
        resume: {
          ...state.resume,
          [field]: state.resume[field].filter(item => item.id !== id)
        }
      })),
      
      // Helper function to update a specific item in any array field
      updateItem: (field, id, updates) => set((state) => ({
        resume: {
          ...state.resume,
          [field]: state.resume[field].map(item => 
            item.id === id ? { ...item, ...updates } : item
          )
        }
      })),
      
      // Reset resume to template-specific initial state
      resetResume: () => set((state) => ({
        resume: getTemplateDefaults(state.currentTemplate)
      })),
      
      // Reset to specific template
      resetToTemplate: (template) => set({
        currentTemplate: template,
        resume: getTemplateDefaults(template)
      }),
      
      // Import resume data
      importResume: (newResume) => set({ resume: newResume }),
      
      // Keep current data but change template (if user wants to keep their data)
      changeTemplateOnly: (template) => set({ 
        currentTemplate: template 
      })
    }),
    {
      name: 'resume-storage', // localStorage key
      // Optional: Only persist certain fields
      partialize: (state) => ({ 
        resume: state.resume,
        currentTemplate: state.currentTemplate
      })
    }
  )
)