'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'
import { Download, RefreshCw } from 'lucide-react'

const HeaderBar = ({ name, title }) => (
  <div className="bg-gray-900 text-white py-6 pr-10 flex items-center justify-between print:bg-gray-900">
    <div className="pl-10">
      <h1 className="text-4xl font-bold tracking-[-1px] break-words">{name}</h1>
      <p className="text-2xl text-yellow-400 font-light mt-1 break-words">{title || 'Product Manager'}</p>
    </div>
  </div>
)

const Sidebar = ({ personalInfo, skills, languages, certifications, socialMedia }) => (
  <div className="p-9 flex flex-col h-full overflow-hidden">
    {personalInfo.photo && (
      <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-8 border-yellow-400 shadow-xl flex-shrink-0">
        <img src={personalInfo.photo} alt={personalInfo.name} className="w-full h-full object-cover" />
      </div>
    )}

    <div className="mt-8 space-y-9 flex-1 overflow-y-auto">
      <div>
        <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">CONTACT</h3>
        <div className="space-y-4 text-sm text-gray-700">
          {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p className="break-words">{personalInfo.location}</p>}
        </div>
      </div>

      {socialMedia && Object.keys(socialMedia).some(key => socialMedia[key]) && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">LINKS</h3>
          <div className="flex flex-col gap-2 text-yellow-600 text-sm">
            {socialMedia.linkedin && <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{socialMedia.linkedin}</a>}
            {socialMedia.github && <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{socialMedia.github}</a>}
            {socialMedia.portfolio && <a href={socialMedia.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{socialMedia.portfolio}</a>}
            {socialMedia.twitter && <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{socialMedia.twitter}</a>}
          </div>
        </div>
      )}

      {skills?.length > 0 && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">SKILLS</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="bg-white text-gray-800 text-xs font-medium px-4 py-2 rounded-3xl shadow-sm break-words max-w-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {certifications?.length > 0 && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">CERTIFICATIONS</h3>
          <div className="space-y-3 text-sm">
            {certifications.map((cert, i) => (
              <div key={i} className="text-gray-700">
                <span className="font-medium break-words">{cert.name}</span>
                {cert.organization && <p className="text-gray-500 text-xs mt-0.5 break-words">{cert.organization}</p>}
                {cert.year && <p className="text-gray-500 text-xs">{cert.year}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {languages?.length > 0 && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">LANGUAGES</h3>
          <div className="space-y-3 text-sm">
            {languages.map((lang, i) => (
              <div key={i} className="flex justify-between flex-wrap gap-2">
                <span className="text-gray-500 font-medium break-words">{lang.language}</span>
                <span className="text-gray-500">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)

const TimelineItem = ({ exp }) => {
  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return '';
    const start = startDate.trim();
    const end = endDate ? endDate.trim() : '';

    if (!end) return start;
    if (end.toLowerCase() === 'present') return `${start} — Present`;
    return `${start} — ${end}`;
  };

  return (
    <div className="relative pl-12 pb-12 last:pb-0 print:pl-10">
      <div className="absolute left-5 top-3 bottom-0 w-px bg-yellow-400 print:left-3"></div>
      <div className="absolute left-0 top-2 w-10 h-10 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 print:w-8 print:h-8 print:left-0">
        <div className="w-4 h-4 bg-yellow-400 rounded-full print:w-3 print:h-3"></div>
      </div>
      <div className="flex justify-between items-baseline flex-wrap gap-2">
        <h3 className="font-semibold text-xl text-gray-900 break-words flex-1 print:text-base">{exp.position}</h3>
        <span className="text-sm bg-yellow-100 text-yellow-700 px-5 py-1 rounded-3xl font-medium whitespace-nowrap flex-shrink-0 print:text-xs print:px-3">
          {formatDateRange(exp.startDate, exp.endDate)}
        </span>
      </div>
      <p className="text-yellow-600 font-medium mt-1 break-words">{exp.company}</p>
      <p className="mt-5 text-gray-600 leading-relaxed text-[15px] break-words whitespace-normal print:text-sm">
        {exp.description}
      </p>
    </div>
  );
};

const ProjectsCard = ({ projects }) => (
  <div className="grid grid-cols-1 gap-6">
    {projects.map((project) => (
      <div key={project.id} className="bg-white border border-gray-800 p-3 rounded-3xl overflow-hidden print:p-5">
        <h3 className="font-semibold text-lg break-words print:text-base text-black">{project.name}</h3>
        {project.techStack && (
          <p className="text-xs text-gray-400 mt-1 tracking-widest break-words">{project.techStack}</p>
        )}
        <p className="mt-4 text-gray-600 text-[15px] leading-relaxed break-words whitespace-normal print:text-sm">{project.description}</p>
      </div>
    ))}
  </div>
);

export default function CreativeTemplate({ resume }) {
  const resumeRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const personalInfo = resume?.personalInfo || {};
  const professionalSummary = resume?.professionalSummary || '';
  const experience = resume?.experience || [];
  const projects = resume?.projects || [];
  const skills = resume?.skills || [];
  const languages = resume?.languages || [];
  const certifications = resume?.certifications || [];
  const socialMedia = resume?.socialMedia || {};

  const handleExport = async () => {
    if (!resumeRef.current) return;
    const fileName = `${personalInfo.name?.replace(/\s+/g, '-') || 'resume'}-resume.pdf`;
    setIsExporting(true);
    try {
      await exportToPDF(resumeRef.current, fileName);
    } catch (e) {
      console.error(e);
      alert('Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen print:bg-white">
      <div 
        ref={resumeRef} 
        className="mx-auto bg-white shadow-2xl overflow-hidden print:max-w-none print:shadow-none print:rounded-none"
      >
        {/* Export Button */}
        <div className="print:hidden absolute top-4 right-4 z-10">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-black font-semibold px-4 py-1.5 rounded-lg shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm"
          >
            {isExporting ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Save as PDF</span>
              </>
            )}
          </button>
        </div>
        
        <HeaderBar name={personalInfo.name} title={personalInfo.title} />
        
        {/* Main Layout */}
<div className="flex print:flex">          
<div className="sidebar-first-page w-[380px] flex-shrink-0 bg-gray-100 print:w-[320px] print:bg-gray-100" style={{ height: '1429px' }}>            <Sidebar
              personalInfo={personalInfo}
              skills={skills}
              languages={languages}
              certifications={certifications}
              socialMedia={socialMedia}
            />
          </div>

          {/* White Content Area */}
          <div className="flex-1 p-10 print:p-8 bg-white min-w-0 overflow-hidden">
            {professionalSummary && (
              <div className="mb-8">
                <h2 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-4">PROFESSIONAL SUMMARY</h2>
                <p className="text-gray-700 text-[15.2px] leading-relaxed break-words whitespace-normal print:text-sm">
                  {professionalSummary}
                </p>
              </div>
            )}

            {experience.length > 0 && (
              <div className="mb-14">
                <h2 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-6">EXPERIENCE</h2>
                {experience.map((exp) => (
                  <TimelineItem key={exp.id} exp={exp} />
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-6">KEY PROJECTS</h2>
                <ProjectsCard projects={projects} />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Global text wrapping styles */
        * {
          max-width: 100%;
          word-wrap: break-word;
          word-break: break-word;
        }

        @media print {
  @page { 
    size: A4 portrait; 
    margin: 0 !important; 
  }
  
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    height: auto !important;  
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  .sidebar-first-page {
    width: 320px !important;
    background-color: #f3f4f6 !important;
    height: auto !important; 
    min-height: 0 !important;  
    page-break-after: avoid !important;
    break-inside: avoid !important;
  }
  
  .sidebar-first-page > div {
    height: auto !important;
    min-height: 0 !important;
  }
  
  p, h1, h2, h3, h4, span, a, div {
    word-wrap: break-word !important;
    word-break: break-word !important;
    white-space: normalf !important;
  }
  
  .flex {
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important;
  }
}
      `}</style>
    </div>
  );
}