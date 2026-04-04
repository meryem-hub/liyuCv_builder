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
        professionalSummary: `Results-driven Accounting and Finance professional with over 6 years of experience in financial reporting, budgeting, tax compLeyannce, and strategic financial analysis. Skilled in streamlining accounting processes and providing actionable insights to support business decisions.`,

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
          'Financial Reporting', 'Budgeting & Forecasting', 'Tax CompLeyannce', 
          'IFRS', 'Financial Analysis', 'Accounts ReconciLeyantion', 
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

    // ====================== PROFESSIONAL TEMPLATE ======================
    case 'professional':
      return {
        ...baseData,
        personalInfo: {
          name: 'Meryem Ebrahim',
          title: 'Web Developer',
          email: 'meryemebrahim.46@gmail.com',
          phone: '+251965717483',
          location: 'Addis Ababa, Ethiopia',
          website: 'https://meryem-portfolio.netlify.app',
        },
        professionalSummary: `Web Developer | Build vibrant, user-friendly websites with a passion for clean code and creative problem-solving. From front-end finesse to back-end logic, I love turning ideas into functional, stylish digital experiences. Always building, always learning.`,
        
        experience: [
          {
            id: 1,
            company: 'Kuraz Technology, Ethiopia',
            position: 'FRONTEND DEVELOPER INTERN',
            startDate: '2025',
            endDate: '',
            description: 'Developed interactive and responsive web applications with React.js and JavaScript.'
          },
          {
            id: 2,
            company: 'Information Network Security Administration, Ethiopia',
            position: 'WEB DEVELOPMENT TRAINEE',
            startDate: '2025',
            endDate: '',
            description: 'Participated in an intensive software development training program. Gained hands-on experience in modern software engineering and security practices. Collaborated on real-world projects in an on-site environment.'
          },
          {
            id: 3,
            company: 'Nile Technology, Ethiopia',
            position: 'WEB DEVELOPER INTERN',
            startDate: '2025',
            endDate: '',
            description: 'Assisted in full-stack web application development using the MERN stack (MongoDB, Express.js, React, Node.js).'
          },
          {
            id: 4,
            company: 'Nejm student developers association, Ethiopia',
            position: 'WEB DEVELOPMENT MENTOR',
            startDate: '',
            endDate: '',
            description: 'Mentored beginners in web development fundamentals including HTML, CSS, and JavaScript. Conducted coding workshops and practical sessions to strengthen hands-on learning.'
          }
        ],
        
        projects: [
          {
            id: 1,
            name: 'Foodie Finder',
            description: 'Discover restaurants and get meal suggestions based on ingredients entered by the user.',
            techStack: 'React.js, JavaScript',
            demoLink: '',
            githubLink: ''
          },
          {
            id: 2,
            name: 'Travel Website',
            description: 'Platform for travel planning and bookings.',
            techStack: 'React.js',
            demoLink: '',
            githubLink: ''
          },
          {
            id: 3,
            name: 'EthioAI Data Labeling Platform',
            description: 'Platform for labeling AI training data',
            techStack: 'MERN Stack',
            demoLink: '',
            githubLink: ''
          }
        ],
        
        education: [
          {
            id: 1,
            school: 'Hawassa University',
            degree: 'Bachelor of Science in Electrical and Computer Engineering',
            year: '2024-2028',
            gpa: ''
          }
        ],
        
        skills: [
          'JavaScript', 'TypeScript', 'CSS', 'Tailwind', 'MongoDB', 'Git', 'Vs code'
        ],
        
        certifications: [
          {
            id: 1,
            name: 'Full-Stack Development',
            organization: 'Safaricom Talent Cloud',
            year: ''
          },
          {
            id: 2,
            name: 'Web Development',
            organization: 'IBM skillsbuild',
            year: ''
          },
          {
            id: 3,
            name: 'Artificial Intelligence',
            organization: 'IBM skillsbuild',
            year: ''
          }
        ],
        
        languages: [
          { id: 1, language: 'Amharic', proficiency: '' },
          { id: 2, language: 'English', proficiency: '' },
          { id: 3, language: 'Arabic', proficiency: '' }
        ],
        
        interests: [
          'AI & Machine Learning Projects',
          'Blogging about Tech'
        ],
        
        socialMedia: {
          linkedin: '',
          github: '',
          portfolio: 'https://meryem-portfolio.netlify.app'
        }
      }

    // ====================== EXECUTIVE TEMPLATE ======================
    case 'executive':
      return {
        ...baseData,
        personalInfo: {
          firstName: 'Leyan',
          lastName: 'Rojas',
          name: 'Leyan Rojas',
          title: 'Backend Engineer',
          email: 'Leyan.rojas@email.com',
          phone: '+1 (555) 234-7890',
          location: 'Austin, Texas',
          linkedin: 'linkedin.com/in/Leyanrojas',
          github: 'github.com/Leyanrojas',
          website: 'https://Leyanrojas.dev'
        },
        professionalSummary: `Backend Engineer with 5+ years of experience designing and building scalable distributed systems. Expert in high-performance API development, microservices architecture, and database optimization.`,
        
        experience: [
          {
            id: 1,
            position: 'Senior Backend Engineer',
            company: 'ScaleFlow Technologies',
            startDate: '2023',
            endDate: 'Present',
            description: 'Lead backend development for high-traffic microservices handling 1M+ daily requests. Designed and implemented RESTful and GraphQL APIs.'
          },
          {
            id: 2,
            position: 'Backend Developer',
            company: 'DataCore Systems',
            startDate: '2021',
            endDate: '2023',
            description: 'Developed and maintained scalable backend services using Node.js and Python.'
          },
        ],
        
        education: [
     
          {
            id: 1,
            degree: 'Bachelor of Science in Software Engineering',
            school: 'California State University',
            year: '2015 — 2019',
            gpa: '3.85',
            honors: 'Cum Laude'
          }
        ],
        
        skills: [
          'Go', 'Python', 'Node.js', 'TypeScript',
          'Java', 'PostgreSQL', 'MongoDB', 'Redis',
          'Docker', 'Kubernetes', 'AWS', 'Terraform',
          'GraphQL', 'gRPC', 'RabbitMQ', 'Kafka',
        ],
        
        projects: [
          {
            id: 1,
            name: 'Distributed Task Queue System',
            description: 'Built a high-throughput task queue system supporting 10K+ tasks/second using Go and Redis.',
            tags: ['Go', 'Redis', 'Docker', 'Prometheus']
          },
          {
            id: 2,
            name: 'Real-Time Analytics Pipeline',
            description: 'Designed and implemented event streaming pipeline processing 500K events/minute using Kafka and Python.',
            tags: ['Kafka', 'Python', 'WebSocket', 'ClickHouse']
          },
          {
            id: 3,
            name: 'API Gateway with Rate Limiting',
            description: 'Created scalable API gateway handling authentication, rate limiting, and request routing for 50+ microservices.',
            tags: ['Node.js', 'Redis', 'JWT', 'Express']
          },
          {
            id: 4,
            name: 'Database Migration Tool',
            description: 'Developed zero-downtime database migration tool for PostgreSQL supporting rollbacks and version control.',
            tags: ['Go', 'PostgreSQL', 'CLI', 'Migrations']
          }
        ],
        
        certifications: [
          {
            id: 1,
            name: 'AWS Solutions Architect - Professional',
            organization: 'Amazon Web Services',
            year: '2023'
          },
          {
            id: 2,
            name: 'Kubernetes Certified Administrator (CKA)',
            organization: 'CNCF',
            year: '2023'
          },
        
        ],
        
        languages: [
          { id: 1, language: 'English', proficiency: 'Native' },
          { id: 2, language: 'Spanish', proficiency: 'Fluent' }
        ],
        
        interests: [
          'Open Source Contributions',
          'System Design',
          'Tech Writing',
          'Cloud Architecture'
        ],
        
        socialMedia: {
          linkedin: 'linkedin.com/in/Leyanrojas',
          github: 'github.com/Leyanrojas',
          portfolio: 'https://Leyanrojas.dev'
        }
      }

    // ====================== OTHER TEMPLATES ======================
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
      resume: getTemplateDefaults('professional'),
      currentTemplate: 'professional',

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