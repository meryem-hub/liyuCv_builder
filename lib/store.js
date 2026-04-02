// lib/store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const getTemplateDefaults = (templateId) => {
  const baseData = {
    personalInfo: {
      name: 'Your Name',
      email: 'email@example.com',
      phone: '+251 911 234 567',
      location: 'Addis Ababa, Ethiopia',
      title: 'Professional Title'
    },
    professionalSummary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    socialMedia: { linkedin: '', github: '', portfolio: '', X: '' },
    achievements: [],
    languages: [],
    certifications: [],
    interests: []
  };

  switch (templateId) {
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
        professionalSummary: `Results-driven Accounting and Finance professional with over 6 years of experience in financial reporting, budgeting, tax compliance, and strategic financial analysis.`,

        experience: [
          {
            id: 1,
            company: 'ABC Trading PLC',
            position: 'Senior Accountant',
            startDate: '2023',
            endDate: 'Present',
            description: `• Manage full-cycle accounting and monthly financial closing\n• Prepare financial statements and reports\n• Handle tax compliance and payroll`
          },
          {
            id: 2,
            company: 'Ethio Finance Solutions',
            position: 'Finance Officer',
            startDate: '2021',
            endDate: '2023',
            description: `• Prepared budgets and financial forecasts\n• Conducted financial analysis`
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

        skills: ['Financial Reporting', 'Budgeting & Forecasting', 'Tax Compliance', 'IFRS', 'QuickBooks', 'SAP', 'Advanced Excel', 'Power BI', 'Auditing', 'Payroll Management'],

        projects: [
          {
            id: 1,
            name: 'ERP Accounting System Implementation',
            description: 'Led migration to automated accounting system.',
            techStack: 'QuickBooks, Power BI',
            demoLink: '',
            githubLink: ''
          }
        ],

        certifications: [
          { id: 1, name: 'Certified Public Accountant (CPA)', organization: 'Accounting and Auditing Board of Ethiopia', year: '2022' }
        ],

        languages: [
          { id: 1, language: 'Amharic', proficiency: 'Native' },
          { id: 2, language: 'English', proficiency: 'Fluent' }
        ],

        interests: ['Financial Markets', 'Investment Analysis']
      };

    // Keep all your other templates
    case 'professional':
    case 'executive':
    case 'creative':
    case 'minimal':
    case 'whiteblack':
      return { ...baseData, personalInfo: { ...baseData.personalInfo, title: 'Senior Accountant' } };

    default:
      return baseData;
  }
};

export const useResumeStore = create(
  persist(
    (set, get) => ({
      resume: getTemplateDefaults('modern'),
      currentTemplate: 'modern',

      updateTemplate: (template) => set(() => ({
        currentTemplate: template,
        resume: getTemplateDefaults(template)   // ← Force reset when changing template
      })),

      // ... all your other actions (same as before)
      updatePersonalInfo: (info) => set((state) => ({
        resume: { ...state.resume, personalInfo: { ...state.resume.personalInfo, ...info } }
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
        resume: { ...state.resume, socialMedia: { ...state.resume.socialMedia, ...socialMedia } }
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
);