// lib/store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Template-specific default data
const getTemplateDefaults = (templateId) => {
  const baseData = {
    personalInfo: {
      name: 'Your Name',
      email: 'email@example.com',
      phone: '+123 456 7890',
      location: 'City, Country',
      title: 'Professional Title'
    },
    professionalSummary: 'Experienced professional with a proven track record of delivering exceptional results. Passionate about innovation and continuous improvement.',
    experience: [
      {
        id: 1,
        company: 'Company Name',
        position: 'Your Position',
        startDate: '2024',
        endDate: 'Present',
        description: 'Describe your responsibilities and achievements...'
      }
    ],
    education: [
      {
        id: 1,
        school: 'University Name',
        degree: 'Your Degree',
        year: '2024'
      }
    ],
    skills: ['Skill One', 'Skill Two', 'Skill Three'],
    projects: [
      {
        id: 1,
        name: 'Project Name',
        description: 'Brief description of your project...',
        techStack: 'Tools used',
        demoLink: '',
        githubLink: ''
      }
    ],
    socialMedia: {
      linkedin: '',
      github: '',
      X: '',
      portfolio: ''
    },
    achievements: [],
    references: [],
    languages: [],
    certifications: [],
    interests: []
  }

  switch (templateId) {
    case 'professional':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Senior Frontend Developer'
        },
        professionalSummary: 'Senior Frontend Developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks. Specialized in React ecosystem, responsive design, and performance optimization.',
        skills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'Responsive Design'],
        experience: [
          {
            id: 1,
            company: 'Tech Company Inc.',
            position: 'Senior Frontend Developer',
            startDate: '2024',
            endDate: 'Present',
            description: 'Lead frontend development for multiple web applications using React and TypeScript.'
          }
        ],
        projects: [
          {
            id: 1,
            name: 'E-commerce Platform',
            description: 'Developed a responsive e-commerce platform with React and Redux.',
            techStack: 'React, Redux, TypeScript, Tailwind CSS',
            demoLink: 'https://demo-store.com',
            githubLink: 'https://github.com/username/ecommerce-platform'
          }
        ]
      }

    case 'executive':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Senior Full Stack Developer'
        },
        professionalSummary: 'Senior Full Stack Developer with extensive experience in building scalable web applications and leading technical teams.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'Docker'],
        experience: [
          {
            id: 1,
            company: 'Tech Corporation',
            position: 'Senior Full Stack Developer',
            startDate: '2018',
            endDate: 'Present',
            description: 'Lead full stack development for multiple web applications.'
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
        professionalSummary: 'Creative director with a passion for innovative design solutions and brand storytelling.',
        skills: ['UI/UX Design', 'Brand Strategy', 'Creative Direction', 'Visual Design', 'Adobe Creative Suite'],
        projects: [
          {
            id: 1,
            name: 'Brand Identity Project',
            description: 'Developed comprehensive brand identity including logo and guidelines.',
            techStack: 'Adobe Illustrator, Photoshop, Figma',
            demoLink: 'https://behance.net/project',
            githubLink: ''
          }
        ]
      }

    case 'minimal':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Software Engineer'
        },
        professionalSummary: 'Software engineer specializing in full-stack development and scalable system architecture.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS']
      }

    // ====================== WHITE & BLACK MINIMALIST (Graphic Designer) ======================
    case 'whiteblack':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Graphic Designer'
        },
        professionalSummary: 'Creative and detail-oriented Graphic Designer with a passion for visual storytelling, branding, and digital design. Experienced in creating compelling visuals for print and digital media.',
        skills: [
          'Adobe Photoshop',
          'Adobe Illustrator',
          'Figma',
          'UI/UX Design',
          'Brand Identity',
          'Typography',
          'Motion Graphics',
          'After Effects',
          'Prototyping',
          'Color Theory'
        ],
        experience: [
          {
            id: 1,
            company: 'Creative Studio',
            position: 'Graphic Designer',
            startDate: '2024',
            endDate: 'Present',
            description: 'Designed visual assets, branding materials, social media graphics, and marketing campaigns for various clients.'
          }
        ],
        projects: [
          {
            id: 1,
            name: 'Brand Identity Redesign',
            description: 'Developed a complete brand identity including logo, color palette, typography, and brand guidelines for a tech startup.',
            techStack: 'Figma, Adobe Illustrator, Photoshop',
            demoLink: 'https://behance.net/yourproject',
            githubLink: ''
          }
        ],
        certifications: [
          {
            id: 1,
            name: 'Google UX Design Professional Certificate',
            organization: 'Google',
            year: '2024'
          }
        ],
        interests: ['Digital Art', 'Photography', 'Typography', 'Minimal Design']
      }

    default: // modern
      return baseData
  }
}

export const useResumeStore = create(
  persist(
    (set, get) => ({
      // Current resume data
      resume: getTemplateDefaults('modern'),
      
      // Current template
      currentTemplate: 'modern',

      // Switch template + reset data to template defaults
      updateTemplate: (template) => set({ 
        currentTemplate: template,
        resume: getTemplateDefaults(template)
      }),

      // Personal Info
      updatePersonalInfo: (info) => set((state) => ({
        resume: { 
          ...state.resume, 
          personalInfo: { ...state.resume.personalInfo, ...info } 
        }
      })),

      // Professional Summary
      updateProfessionalSummary: (professionalSummary) => set((state) => ({
        resume: { ...state.resume, professionalSummary }
      })),

      // Experience
      updateExperience: (experience) => set((state) => ({
        resume: { ...state.resume, experience }
      })),

      // Education
      updateEducation: (education) => set((state) => ({
        resume: { ...state.resume, education }
      })),

      // Skills
      updateSkills: (skills) => set((state) => ({
        resume: { ...state.resume, skills }
      })),

      // Projects
      updateProjects: (projects) => set((state) => ({
        resume: { ...state.resume, projects }
      })),

      // Social Media
      updateSocialMedia: (socialMedia) => set((state) => ({ 
        resume: { 
          ...state.resume, 
          socialMedia: { ...state.resume.socialMedia, ...socialMedia } 
        } 
      })),

      // Achievements
      updateAchievements: (achievements) => set((state) => ({ 
        resume: { ...state.resume, achievements } 
      })),

      // References
      updateReferences: (references) => set((state) => ({ 
        resume: { ...state.resume, references } 
      })),

      // Languages
      updateLanguages: (languages) => set((state) => ({ 
        resume: { ...state.resume, languages } 
      })),

      // Certifications
      updateCertifications: (certifications) => set((state) => ({ 
        resume: { ...state.resume, certifications } 
      })),

      // Interests
      updateInterests: (interests) => set((state) => ({ 
        resume: { ...state.resume, interests } 
      })),

      // Reset to current template defaults
      resetResume: () => set((state) => ({
        resume: getTemplateDefaults(state.currentTemplate)
      })),

      // Import full resume
      importResume: (newResume) => set({ resume: newResume }),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({ 
        resume: state.resume,
        currentTemplate: state.currentTemplate
      })
    }
  )
)