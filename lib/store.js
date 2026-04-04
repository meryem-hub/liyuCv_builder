// lib/store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Template-specific default data
const getTemplateDefaults = (templateId) => {
  const baseData = {
    personalInfo: {
      name: 'Your Name',
      email: 'email@example.com',
      phone: '+251 911 234 567',
      location: 'Addis Ababa, Ethiopia',
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
      portfolio: ''
    },
    achievements: [],
    languages: [],
    certifications: [],
    interests: []
  }

  switch (templateId) {
    // ====================== ACCOUNTANT / FINANCE ======================
    case 'modern':
      return {
        ...baseData,
        personalInfo: {
          name: 'Abebe Kebede',
          title: 'Senior Accountant & Finance Officer',
          email: 'abebe.kebede@email.com',
          phone: '+251 911 234 567',
          location: 'Addis Ababa, Ethiopia'
        },
        professionalSummary: `Results-driven Accounting and Finance professional with over 6 years of experience in financial reporting, budgeting, tax compliance, and strategic financial analysis. Skilled in streamlining accounting processes and providing actionable insights to support business decisions.`,

        experience: [
          {
            id: 1,
            company: 'ABC Trading PLC',
            position: 'Senior Accountant',
            startDate: '2023',
            endDate: 'Present',
            description: `• Manage full-cycle accounting and monthly financial closing\n• Prepare financial statements (Balance Sheet, Income Statement, Cash Flow)`
          },
          {
            id: 2,
            company: 'Ethio Finance Solutions',
            position: 'Finance Officer',
            startDate: '2021',
            endDate: '2023',
            description: `• Prepared annual budgets and quarterly forecasts\n• Performed financial analysis and management reporting\n• Implemented cost control measures resulting in 12% expense reduction\n• Assisted in external audit processes`
          }
        ],

        education: [
          {
            id: 1,
            school: 'Addis Ababa University',
            degree: 'Bachelor of Arts in Accounting and Finance',
            year: '2020',
            gpa: '3.75'
          }
        ],

        skills: [
          'Financial Reporting', 'Budgeting & Forecasting', 'Tax Compliance', 
          'IFRS', 'Financial Analysis', 'Accounts Reconciliation', 
        ],

        projects: [
          {
            id: 1,
            name: 'ERP Accounting System Implementation',
            description: 'Led migration from manual to automated ERP system, improving reporting efficiency by 60%.',
            techStack: 'QuickBooks, Excel, Power BI',
            demoLink: '',
            githubLink: ''
          },
         
        ],

        certifications: [
          {
            id: 1,
            name: 'Certified Public Accountant (CPA)',
            organization: 'Accounting and Auditing Board of Ethiopia',
            year: '2022'
          },
          {
            id: 2,
            name: 'Advanced Excel for Finance',
            organization: 'Coursera',
            year: '2023'
          }
        ],

        languages: [
          { id: 1, language: 'Amharic', proficiency: 'Native' },
          { id: 2, language: 'English', proficiency: 'Fluent (C1)' }
        ],

        interests: ['Financial Markets', 'Investment Analysis', 'Data Visualization']
      }

    // ====================== ORIGINAL TEMPLATES  ======================
    case 'professional':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Senior Frontend Developer'
        },
        professionalSummary: 'Senior Frontend Developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks.',
        skills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Git'],
        experience: [
          {
            id: 1,
            company: 'Tech Company Inc.',
            position: 'Senior Frontend Developer',
            startDate: '2024',
            endDate: 'Present',
            description: 'Lead frontend development for multiple web applications using React and TypeScript.'
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
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS']
      }

    case 'creative':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Creative Director'
        },
        professionalSummary: 'Creative director with a passion for innovative design solutions and brand storytelling.',
        skills: ['UI/UX Design', 'Brand Strategy', 'Adobe Creative Suite', 'Figma']
      }

    case 'minimal':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Software Engineer'
        },
        professionalSummary: 'Software engineer specializing in full-stack development and scalable system architecture.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python']
      }

    case 'whiteblack':
      return {
        ...baseData,
        personalInfo: {
          ...baseData.personalInfo,
          title: 'Graphic Designer'
        },
        professionalSummary: 'Creative and detail-oriented Graphic Designer with a passion for visual storytelling and branding.',
        skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Brand Identity']
      }

    // Default fallback
    default:
      return baseData
  }
}

export const useResumeStore = create(
  persist(
    (set, get) => ({
      resume: getTemplateDefaults('modern'),
      currentTemplate: 'modern',

      updateTemplate: (template) => set({ 
        currentTemplate: template,
        resume: getTemplateDefaults(template)
      }),

      updatePersonalInfo: (info) => set((state) => ({
        resume: { 
          ...state.resume, 
          personalInfo: { ...state.resume.personalInfo, ...info } 
        }
      })),

      updateProfessionalSummary: (professionalSummary) => set((state) => ({
        resume: { ...state.resume, professionalSummary }
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

      updateLanguages: (languages) => set((state) => ({ 
        resume: { ...state.resume, languages } 
      })),

      updateCertifications: (certifications) => set((state) => ({ 
        resume: { ...state.resume, certifications } 
      })),

      updateInterests: (interests) => set((state) => ({ 
        resume: { ...state.resume, interests } 
      })),

      resetResume: () => set((state) => ({
        resume: getTemplateDefaults(state.currentTemplate)
      })),

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