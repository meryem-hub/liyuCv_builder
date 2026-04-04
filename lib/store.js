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
    // ====================== CREATIVE TEMPLATE ======================
    case 'creative':
      return {
        ...baseData,
        personalInfo: {
          name: 'James H.',
          firstName: 'James',
          lastName: 'H.',
          title: 'Product Manager & Creative Director',
          email: 'James.h@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          linkedin: 'linkedin.com/in/James-h',
          github: 'github.com/Jamesh',
          website: 'Jamesh.dev',
          photo: '' 
        },
        professionalSummary: `Results-driven Product Manager with 8+ years of experience in SaaS and consumer products. Expert in product strategy, user research, and cross-functional leadership.`,
        
        experience: [
          {
            id: 'exp1',
            position: 'Senior Product Manager',
            company: 'Tech Innovations Inc.',
            startDate: 'Jan 2022',
            endDate: 'Present',
            description: 'Leading product strategy for B2B analytics platform serving 500+ enterprise clients. .'
          },
          {
            id: 'exp2',
            position: 'Product Manager',
            company: 'Digital Solutions Co.',
            startDate: 'Jun 2019',
            endDate: 'Dec 2024',
            description: 'Managed full product lifecycle for mobile app with 2M+ downloads. Collaborated with engineering, design, and marketing to deliver 12 major releases. '
          },
          {
            id: 'exp3',
            position: 'Associate Product Manager',
            company: 'Startup Labs',
            startDate: 'Aug 2017',
            endDate: 'May 2019',
            description: 'Conducted user research and competitive analysis to inform product roadmap. Worked closely with stakeholders to define requirements and prioritize features. Launched 5 successful MVP products.'
          }
        ],
        
        education: [
      
          {
            id: 'edu2',
            degree: 'B.S. Computer Science',
            school: 'University of California, Berkeley',
            year: '2013',
            gpa: '3.6',
            honors: 'Cum Laude'
          }
        ],
        
        skills: [
          'Product Strategy', 'User Research', 'Agile Methodology', 
          'Data Analytics', 'Roadmap Planning', 'A/B Testing', 
          'Wireframing', 'JIRA/Confluence', 'Google Analytics', 
        ],
        
        projects: [
          {
            id: 'proj1',
            name: 'AI-Powered Analytics Dashboard',
            description: 'Led development of real-time analytics dashboard using machine learning to predict user behavior. Achieved 95% accuracy and reduced churn by 30%.',
            techStack: 'React, Python, TensorFlow, AWS',
            demoLink: '',
            githubLink: ''
          },
          {
            id: 'proj2',
            name: 'Mobile Banking App Redesign',
            description: 'Orchestrated complete redesign of banking app resulting in 4.8/5 star rating and 40% increase in daily active users.',
            techStack: 'Figma, Swift, Kotlin',
            demoLink: '',
            githubLink: ''
          },
          {
            id: 'proj3',
            name: 'E-commerce Recommendation Engine',
            description: 'Built personalized recommendation system that increased average order value by 35% and conversion rate by 22%.',
            techStack: 'Python, TensorFlow, MongoDB, Redis',
            demoLink: '',
            githubLink: ''
          }
        ],
        
        certifications: [
          {
            id: 'cert1',
            name: 'Certified Product Manager (CPM)',
            year: '2024'
          },
          {
            id: 'cert2',
            name: 'Advanced Agile Leadership',
            organization: 'Scrum Alliance',
            year: '2020'
          },
          {
            id: 'cert3',
            name: 'Google Analytics Certified',
            organization: 'Google',
            year: '2019'
          }
        ],
        
        languages: [
          { id: 'lang1', language: 'English', proficiency: 'Native' },
          { id: 'lang2', language: 'Spanish', proficiency: 'Fluent' },
          { id: 'lang3', language: 'French', proficiency: 'Intermediate' }
        ],
        
        interests: [
          'Product Management Blogs',
          'Mentoring',
          'Data Science',
          'UX Design'
        ],
        
        socialMedia: {
          linkedin: 'https://linkedin.com/in/James-h',
          github: 'https://github.com/Jamesh',
          portfolio: 'https://Jamesh.dev',
          twitter: 'https://twitter.com/Jamesh'
        }
      }

case 'minimal':
  return {
    ...baseData,
    personalInfo: {
      name: 'Jennifer Martinez',
      firstName: 'Jennifer',
      lastName: 'Martinez',
      title: 'Human Resources Director',
      email: 'jennifer.martinez@hr-executive.com',
      phone: '+1 (212) 555-8901',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/jennifermartinez-hr',
      github: '',
      website: 'jennifermartinez.com',
      photo: null
    },
    professionalSummary: `Strategic Human Resources Director with 12+ years of experience driving organizational excellence through innovative HR strategies. Expert in talent acquisition, employee relations, performance management, and HR数字化转型. Proven track record of reducing turnover by 45%, improving employee satisfaction by 60%, and implementing successful DEI initiatives across global organizations of 5,000+ employees.`,
    
    experience: [
      {
        id: 1,
        position: 'Human Resources Director',
        company: 'Global Tech Solutions Inc.',
        startDate: '2024',
        endDate: 'Present',
        description: 'Lead HR strategy for 2,500+ employees across 8 global offices. Implemented performance management system resulting in 35% increase in employee productivity. Reduced turnover from 28% to 15% through enhanced retention programs. Managed $8M HR budget and team of 25 HR professionals.'
      },
      {
        id: 2,
        position: 'Senior HR Business Partner',
        company: 'Financial Services Group',
        startDate: '2018',
        endDate: '2024',
        description: 'Partnered with C-suite executives to align HR strategies with business objectives. Led talent acquisition efforts hiring 300+ professionals annually. Developed leadership development program resulting in 40% internal promotion rate. Managed complex employee relations cases with 95% resolution rate.'
      },
      {
        id: 3,
        position: 'Talent Acquisition Manager',
        company: 'Innovative Startups Inc.',
        startDate: '2015',
        endDate: '2018',
        description: 'Built recruitment function from ground up, reducing time-to-hire by 50%. Implemented employer branding strategy increasing quality candidates by 200%. Created diversity hiring initiative increasing underrepresented hires by 45%.'
      },
      {
        id: 4,
        position: 'HR Generalist',
        company: 'Corporate Enterprises',
        startDate: '2012',
        endDate: '2015',
        description: 'Managed full employee lifecycle including onboarding, benefits administration, and offboarding. Coordinated annual performance review process for 500+ employees. Assisted in HR policy development and compliance implementation.'
      }
    ],
    
    education: [
      {
        id: 1,
        degree: 'Master of Science in Human Resources Management',
        school: 'Cornell University',
        year: '2012',
        details: 'GPA: 3.9 | SHRM Certified'
      },
      {
        id: 2,
        degree: 'Bachelor of Business Administration',
        school: 'University of Michigan',
        year: '2008',
        details: 'Magna Cum Laude | GPA: 3.8'
      }
    ],
    
    skills: [
      'Strategic HR Planning',
      'Talent Acquisition',
      'Employee Relations',
      'Performance Management',
      'Succession Planning',
      'HRIS Implementation',
      'Compensation & Benefits',
      'DEI Strategy',
      'Labor Law Compliance',
      'Change Management',
      'Leadership Development',
      'Workforce Planning',
      'HR Analytics',
      'Employee Engagement',
      'Conflict Resolution'
    ],
    
    projects: [
      {
        id: 1,
        name: 'HR Digital Transformation',
        description: 'Led implementation of cloud-based HRIS system (Workday) for 3,000+ employees, reducing administrative time by 60% and improving data accuracy by 95%.',
        techStack: 'Workday, HR Analytics, Automation'
      },
      {
        id: 2,
        name: 'Diversity, Equity & Inclusion Program',
        description: 'Developed and launched comprehensive DEI strategy resulting in 45% increase in diverse leadership hires and recognition as "Best Place for Diversity" by Forbes.',
        techStack: 'DEI Metrics, Training Programs, ERGs'
      },
      {
        id: 3,
        name: 'Employee Wellness Initiative',
        description: 'Created holistic wellness program reducing healthcare costs by 25% and improving employee satisfaction scores by 40%.',
        techStack: 'Wellness Platforms, Mental Health Resources'
      }
    ],
    
    certifications: [
      {
        id: 1,
        name: 'Senior Professional in Human Resources (SPHR)',
        organization: 'HR Certification Institute',
        year: '2016'
      },
      {
        id: 2,
        name: 'SHRM Senior Certified Professional (SHRM-SCP)',
        organization: 'Society for Human Resource Management',
        year: '2017'
      },
      {
        id: 3,
        name: 'Certified Compensation Professional (CCP)',
        organization: 'WorldatWork',
        year: '2019'
      },
      {
        id: 4,
        name: 'Executive Leadership Certificate',
        organization: 'Harvard Business School Online',
        year: '2022'
      }
    ],
    
    languages: [
      { id: 1, language: 'English', proficiency: 'Native' },
      { id: 2, language: 'Spanish', proficiency: 'Fluent' },
      { id: 3, language: 'French', proficiency: 'Professional Working' }
    ],
    
    interests: [
      'Leadership Development',
      'Workplace Psychology',
      'Diversity Advocacy',
      'HR Technology',
      'Mentoring Programs',
      'Employee Wellbeing'
    ],
    
    socialMedia: {
      linkedin: 'https://linkedin.com/in/jennifermartinez-hr',
      github: '',
      portfolio: 'https://jennifermartinez.com'
    }
  }

    // ====================== MODERN / ACCOUNTANT TEMPLATE ======================
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
        professionalSummary: ` Accounting and Finance professional with over 6 years of experience in financial reporting, budgeting, tax compliance, and strategic financial analysis. Skilled in streamlining accounting processes and providing actionable insights to support business decisions.`,

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
            startDate: '2020',
            endDate: '2023',
            description: `• Prepared annual budgets and quarterly forecasts\n• Performed financial analysis and management reporting`
          },
          {
            id: 3,
            company: 'Bunna Bank S.C',
            position: 'Junior Accountant',
            startDate: '2018',
            endDate: '2020',
            description: `• Processed daily transactions and reconciled bank statements\n• Assisted in month-end closing and financial report preparation`
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
          'QuickBooks', 'Peachtree', 'Excel Advanced', 'Payroll Management'
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
          {
            id: 2,
            name: 'Financial Audit Process Optimization',
            description: 'Streamlined audit procedures reducing completion time by 40% while maintaining accuracy.',
            techStack: 'Audit Software, Data Analytics',
            demoLink: '',
            githubLink: ''
          },
          {
            id: 3,
            name: 'Tax Compliance Automation Tool',
            description: 'Developed Excel-based tool to automate VAT and income tax calculations, reducing errors by 90%.',
            techStack: 'Excel VBA, Power Query',
            demoLink: '',
            githubLink: ''
          }
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
            description: 'Developed interactive and responsive web applications with React.js and JavaScript. '
          },
          {
            id: 2,
            company: 'Information Network Security Administration, Ethiopia',
            position: 'WEB DEVELOPMENT TRAINEE',
            startDate: '2025',
            endDate: '',
            description: 'Participated in an intensive software development training program. Gained hands-on experience in modern software engineering and security practices.'
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
            startDate: '2025',
            endDate: '',
            description: 'Mentored beginners in web development fundamentals including HTML, CSS, and JavaScript. Conducted coding workshops and practical sessions to strengthen hands-on learning.'
          }
        ],
        
        projects: [
          {
            id: 1,
            name: 'Foodie Finder',
            description: 'Discover restaurants and get meal suggestions based on ingredients entered by the user.',
            techStack: 'React.js, JavaScript, REST APIs',
            demoLink: '',
            githubLink: ''
          },
          {
            id: 2,
            name: 'Travel Website',
            description: 'Platform for travel planning and bookings with user authentication and payment integration.',
            techStack: 'React.js, Node.js, MongoDB',
            demoLink: '',
            githubLink: ''
          },
          {
            id: 3,
            name: 'EthioAI Data Labeling Platform',
            description: 'Platform for labeling AI training data with collaborative features and quality control.',
            techStack: 'MERN Stack, Socket.io',
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
          'JavaScript', 'TypeScript', 'CSS', 'Tailwind', 'MongoDB', 
          'Git', 'VS Code', 'React', 'Node.js', 'Express', 'HTML5'
        ],
        
        certifications: [
          {
            id: 1,
            name: 'Full-Stack Development',
            organization: 'Safaricom Talent Cloud',
            year: '2024'
          },
          {
            id: 2,
            name: 'Web Development',
            organization: 'IBM skillsbuild',
            year: '2024'
          },
          {
            id: 3,
            name: 'Artificial Intelligence',
            organization: 'IBM skillsbuild',
            year: '2024'
          }
        ],
        
        languages: [
          { id: 1, language: 'Amharic', proficiency: 'Native' },
          { id: 2, language: 'English', proficiency: 'Fluent' },
          { id: 3, language: 'Arabic', proficiency: 'Basic' }
        ],
        
        interests: [
          'AI & Machine Learning Projects',
          'Blogging about Tech',
          'Open Source Contribution'
        ],
        
        socialMedia: {
          linkedin: 'https://linkedin.com/in/meryem-ebrahim',
          github: 'https://github.com/meryem',
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
        professionalSummary: `Backend Engineer with 5+ years of experience designing and building scalable distributed systems. Expert in high-performance API development, microservices architecture, and database optimization. Proven track record of reducing latency by 40% and increasing system throughput by 3x.`,
        
        experience: [
          {
            id: 1,
            position: 'Senior Backend Engineer',
            company: 'ScaleFlow Technologies',
            startDate: '2023',
            endDate: 'Present',
            description: 'Lead backend development for high-traffic microservices handling 1M+ daily requests. Designed and implemented RESTful and GraphQL APIs. Reduced average response time by 35% through query optimization and caching strategies.'
          },
          {
            id: 2,
            position: 'Backend Developer',
            company: 'DataCore Systems',
            startDate: '2024',
            endDate: '2023',
            description: 'Developed and maintained scalable backend services using Node.js and Python. Implemented event-driven architecture using RabbitMQ. Achieved 99.99% uptime for critical services.'
          },
          {
            id: 3,
            position: 'Software Engineer',
            company: 'TechStart Solutions',
            startDate: '2019',
            endDate: '2024',
            description: 'Built and deployed RESTful APIs for mobile applications. Collaborated with frontend team to integrate backend services. Implemented automated testing and CI/CD pipelines.'
          }
        ],
        
        education: [
          {
            id: 1,
            degree: 'Bachelor of Science in Software Engineering',
            school: 'California State University',
            year: '2015 — 2019',
            gpa: '3.85',
            honors: 'Cum Laude'
          },
          {
            id: 2,
            degree: 'Master of Science in Computer Science',
            school: 'Stanford University',
            year: '2019 — 2024',
            gpa: '3.9',
            honors: 'Distinction'
          }
        ],
        
        skills: [
          'Go', 'Python', 'Node.js', 'TypeScript', 'Java', 
          'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 
          'Kubernetes', 'AWS', 'Terraform', 'GraphQL', 
          'gRPC', 'RabbitMQ', 'Kafka', 'CI/CD', 'Git'
        ],
        
        projects: [
          {
            id: 1,
            name: 'Distributed Task Queue System',
            description: 'Built a high-throughput task queue system supporting 10K+ tasks/second using Go and Redis. Implemented retry logic, dead-letter queues, and monitoring dashboards.',
            tags: ['Go', 'Redis', 'Docker', 'Prometheus', 'Grafana']
          },
          {
            id: 2,
            name: 'Real-Time Analytics Pipeline',
            description: 'Designed and implemented event streaming pipeline processing 500K events/minute using Kafka and Python. Built real-time dashboards with WebSocket connections.',
            tags: ['Kafka', 'Python', 'WebSocket', 'ClickHouse', 'Apache Spark']
          },
          {
            id: 3,
            name: 'API Gateway with Rate Limiting',
            description: 'Created scalable API gateway handling authentication, rate limiting, and request routing for 50+ microservices. Implemented JWT validation and request throttling.',
            tags: ['Node.js', 'Redis', 'JWT', 'Express', 'Nginx']
          },
          {
            id: 4,
            name: 'Database Migration Tool',
            description: 'Developed zero-downtime database migration tool for PostgreSQL supporting rollbacks and version control. Used by 20+ engineering teams.',
            tags: ['Go', 'PostgreSQL', 'CLI', 'Migrations', 'CI/CD']
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
          {
            id: 3,
            name: 'MongoDB Certified Developer',
            organization: 'MongoDB University',
            year: '2022'
          }
        ],
        
        languages: [
          { id: 1, language: 'English', proficiency: 'Native' },
          { id: 2, language: 'Spanish', proficiency: 'Fluent' }
        ],
        
        interests: [
          'Open Source Contributions',
          'System Design',
          'Tech Writing',
          'Cloud Architecture',
          'Machine Learning'
        ],
        
        socialMedia: {
          linkedin: 'linkedin.com/in/Leyanrojas',
          github: 'github.com/Leyanrojas',
          portfolio: 'https://Leyanrojas.dev'
        }
      }

    // ====================== MINIMAL TEMPLATE ======================
    case 'minimal':
      return {
        ...baseData,
        personalInfo: {
          name: 'Alex Thompson',
          title: 'Software Engineer',
          email: 'alex.thompson@email.com',
          phone: '+1 (555) 987-6543',
          location: 'Seattle, WA'
        },
        professionalSummary: 'Software engineer specializing in full-stack development and scalable system architecture. Passionate about building efficient, maintainable, and user-focused applications.',
        
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
        
        experience: [
          {
            id: 1,
            company: 'Tech Corp',
            position: 'Full Stack Developer',
            startDate: '2022',
            endDate: 'Present',
            description: 'Developing and maintaining web applications using React and Node.js. Implementing responsive designs and RESTful APIs.'
          }
        ],
        
        education: [
          {
            id: 1,
            school: 'University of Washington',
            degree: 'BS in Computer Science',
            year: '2022'
          }
        ]
      }

    // ====================== WHITEBLACK TEMPLATE ======================
   // Add this case to your switch statement in getTemplateDefaults

case 'whiteblack':
  return {
    ...baseData,
    personalInfo: {
      name: 'Sarah Chen',
      firstName: 'Sarah',
      lastName: 'Chen',
      title: 'Graphic Designer & Creative Director',
      email: 'sarah.chen@designstudio.com',
      phone: '+1 (415) 555-7890',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/sarahchen',
      github: '',
      website: 'sarahchendesign.com',
      photo: null
    },
    professionalSummary: `Award-winning Graphic Designer with 8+ years of experience in branding, visual identity, and digital design. Passionate about creating compelling visual stories that connect brands with their audiences. Expertise in leading creative projects from concept to completion for Fortune 500 companies and innovative startups.`,
    
    experience: [
      {
        id: 1,
        position: 'Senior Graphic Designer',
        company: 'Creative Studio Agency',
        startDate: '2024',
        endDate: 'Present',
        description: 'Lead design projects for major clients including Nike, Google, and Apple. Manage creative team of 5 designers, overseeing brand identity development, marketing materials, and digital assets. Increased client satisfaction by 95% through innovative design solutions.'
      },
      {
        id: 2,
        position: 'Visual Designer',
        company: 'Digital Creative Labs',
        startDate: '2018',
        endDate: '2024',
        description: 'Designed visual assets for web and mobile applications, creating cohesive brand experiences. Collaborated with UX/UI team to develop design systems and component libraries. Redesigned company website resulting in 60% increase in user engagement.'
      },
      {
        id: 3,
        position: 'Junior Graphic Designer',
        company: 'Brand Collective',
        startDate: '2016',
        endDate: '2018',
        description: 'Assisted senior designers in creating marketing collateral, social media graphics, and print materials. Developed skills in Adobe Creative Suite and project management. Contributed to successful rebranding campaign for 10+ clients.'
      }
    ],
    
    education: [
      {
        id: 1,
        degree: 'Bachelor of Fine Arts in Graphic Design',
        school: 'Rhode Island School of Design (RISD)',
        year: '2016',
        details: 'Summa Cum Laude | GPA: 3.9'
      },
      {
        id: 2,
        degree: 'Certificate in UX/UI Design',
        school: 'California College of the Arts',
        year: '2019',
        details: 'Specialization in User Experience'
      }
    ],
    
    skills: [
      'Adobe Creative Suite',
      'Figma',
      'Sketch',
      'Brand Identity',
      'Typography',
      'Color Theory',
      'UI/UX Design',
      'Print Design',
      'Motion Graphics',
      'After Effects',
      'Photoshop',
      'Illustrator',
      'InDesign',
      'Premiere Pro',
      'Web Design'
    ],
    
    projects: [
      {
        id: 1,
        name: 'Nike Brand Campaign',
        description: 'Led creative direction for global brand campaign resulting in 40% increase in brand engagement. Designed visual identity system used across digital and print media.',
        techStack: 'Photoshop, Illustrator, After Effects'
      },
      {
        id: 2,
        name: 'Startup Brand Identity Package',
        description: 'Developed complete brand identity for tech startup including logo, color palette, typography, and marketing materials. Helped secure $5M in Series A funding.',
        techStack: 'Figma, Illustrator, InDesign'
      },
      {
        id: 3,
        name: 'E-commerce Website Redesign',
        description: 'Redesigned e-commerce platform resulting in 50% increase in conversion rate. Created responsive design system and UI component library.',
        techStack: 'Figma, Sketch, Zeplin'
      }
    ],
    
    certifications: [
      {
        id: 1,
        name: 'Adobe Certified Expert (ACE)',
        organization: 'Adobe',
        year: '2020'
      },
      {
        id: 2,
        name: 'Certified UX Designer',
        organization: 'Nielsen Norman Group',
        year: '2024'
      },
      {
        id: 3,
        name: 'Motion Graphics Certificate',
        organization: 'School of Motion',
        year: '2022'
      }
    ],
    
    languages: [
      { id: 1, language: 'English', proficiency: 'Native' },
      { id: 2, language: 'Mandarin', proficiency: 'Fluent' },
      { id: 3, language: 'Spanish', proficiency: 'Intermediate' }
    ],
    
    interests: [
      'Typography',
      'Photography',
      'Art Direction',
      'UI Animation',
      'Design Systems',
      'Creative Coding'
    ],
    
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarahchen',
      github: '',
      portfolio: 'https://sarahchendesign.com',
      behance: 'https://behance.net/sarahchen',
      dribbble: 'https://dribbble.com/sarahchen'
    }
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

      // Template management
      updateTemplate: (template) => set({ 
        currentTemplate: template,
        resume: getTemplateDefaults(template)
      }),

      // Personal Information
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

      // Experience (full array replacement)
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

      // Individual item operations (for more granular control)
      addExperienceItem: (experienceItem) => set((state) => ({
        resume: {
          ...state.resume,
          experience: [...state.resume.experience, { ...experienceItem, id: Date.now() }]
        }
      })),

      removeExperienceItem: (id) => set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.filter(item => item.id !== id)
        }
      })),

      updateExperienceItem: (id, updatedItem) => set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.map(item => 
            item.id === id ? { ...item, ...updatedItem } : item
          )
        }
      })),

      addEducationItem: (educationItem) => set((state) => ({
        resume: {
          ...state.resume,
          education: [...state.resume.education, { ...educationItem, id: Date.now() }]
        }
      })),

      removeEducationItem: (id) => set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.filter(item => item.id !== id)
        }
      })),

      addProjectItem: (projectItem) => set((state) => ({
        resume: {
          ...state.resume,
          projects: [...state.resume.projects, { ...projectItem, id: Date.now() }]
        }
      })),

      removeProjectItem: (id) => set((state) => ({
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter(item => item.id !== id)
        }
      })),

      addCertificationItem: (certItem) => set((state) => ({
        resume: {
          ...state.resume,
          certifications: [...state.resume.certifications, { ...certItem, id: Date.now() }]
        }
      })),

      removeCertificationItem: (id) => set((state) => ({
        resume: {
          ...state.resume,
          certifications: state.resume.certifications.filter(item => item.id !== id)
        }
      })),

      addLanguageItem: (languageItem) => set((state) => ({
        resume: {
          ...state.resume,
          languages: [...state.resume.languages, { ...languageItem, id: Date.now() }]
        }
      })),

      removeLanguageItem: (id) => set((state) => ({
        resume: {
          ...state.resume,
          languages: state.resume.languages.filter(item => item.id !== id)
        }
      })),

      // Reset resume to current template defaults
      resetResume: () => set((state) => ({
        resume: getTemplateDefaults(state.currentTemplate)
      })),

      // Import/Export functionality
      importResume: (newResume) => set({ resume: newResume }),
      
      exportResume: () => get().resume,
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