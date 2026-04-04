'use client'
import React, { useRef, useState } from 'react'
import { exportToPDF } from '../../app/utils/exportPDF'

const HeaderBar = ({ name, title }) => (
  <div className="bg-gray-900 text-white py-6 px-10 flex items-center justify-between">
    <div>
      <h1 className="text-4xl font-bold tracking-[-1px]">{name}</h1>
      <p className="text-2xl text-yellow-400 font-light mt-1">{title || 'Product Manager'}</p>
    </div>
  </div>
)

const Sidebar = ({ personalInfo, skills, languages, certifications, socialMedia }) => (
  <div className="bg-gray-100 h-full p-9 flex flex-col">
    {/* Photo */}
    {personalInfo.photo && (
      <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-8 border-yellow-400 shadow-xl">
        <img src={personalInfo.photo} alt={personalInfo.name} className="w-full h-full object-cover" />
      </div>
    )}

    <div className="mt-1 space-y-9">
      {/* Contact */}
      <div>
        <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">CONTACT</h3>
        <div className="space-y-4 text-sm text-gray-700">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
        </div>
      </div>

      {/* Social Links */}
      {socialMedia && Object.keys(socialMedia).some(key => socialMedia[key]) && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">LINKS</h3>
          <div className="flex flex-col gap-2 text-yellow-600 text-sm">
            {socialMedia.linkedin && <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
            {socialMedia.github && <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>}
            {socialMedia.portfolio && <a href={socialMedia.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>}
            {socialMedia.twitter && <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">SKILLS</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="bg-white text-gray-800 text-xs font-medium px-4 py-2 rounded-3xl shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">CERTIFICATIONS</h3>
          <div className="space-y-3 text-sm">
            {certifications.map((cert, i) => (
              <div key={i} className="text-gray-700">
                <span className="font-medium">{cert.name}</span>
                {cert.organization && <p className="text-gray-500 text-xs mt-0.5">{cert.organization}</p>}
                {cert.year && <p className="text-gray-500 text-xs">{cert.year}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages?.length > 0 && (
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-3">LANGUAGES</h3>
          <div className="space-y-3 text-sm">
            {languages.map((lang, i) => (
              <div key={i} className="flex justify-between">
                <span className="font-medium">{lang.language}</span>
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
    <div className="relative pl-12 pb-12 last:pb-0">
      <div className="absolute left-5 top-3 bottom-0 w-px bg-yellow-400"></div>
      <div className="absolute left-0 top-2 w-10 h-10 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="flex justify-between items-baseline flex-wrap gap-2">
        <h3 className="font-semibold text-xl text-gray-900">{exp.position}</h3>
        <span className="text-sm bg-yellow-100 text-yellow-700 px-5 py-1 rounded-3xl font-medium whitespace-nowrap">
          {formatDateRange(exp.startDate, exp.endDate)}
        </span>
      </div>
      <p className="text-yellow-600 font-medium mt-1">{exp.company}</p>
      <p className="mt-5 text-gray-600 leading-relaxed text-[15px]">
        {exp.description}
      </p>
    </div>
  );
};

const ProjectsCard = ({ projects }) => (
  <div className="grid grid-cols-1 gap-6">
    {projects.map((project) => (
      <div key={project.id} className="bg-white border border-gray-100 p-7 rounded-3xl">
        <h3 className="font-semibold text-lg">{project.name}</h3>
        {project.techStack && (
          <p className="text-xs text-gray-400 mt-1 tracking-widest">{project.techStack}</p>
        )}
        <p className="mt-4 text-gray-600 text-[15px] leading-relaxed">{project.description}</p>
      </div>
    ))}
  </div>
);

export default function CreativeTemplate({ resume }) {
  const resumeRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  
  // Extract data from resume prop
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
    <div className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0 print:overflow-hidden">
      <div className="print:hidden text-right mb-8 max-w-6xl mx-auto px-6">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-3xl shadow-lg transition-all"
        >
          {isExporting ? 'Generating PDF…' : 'Export as PDF'}
        </button>
      </div>

      <div ref={resumeRef} className="mx-auto bg-white shadow-2xl overflow-hidden print:max-w-none print:shadow-none print:rounded-none">
        <HeaderBar name={personalInfo.name} title={personalInfo.title} />
        
        <div className="grid grid-cols-12 print:grid-cols-12">
          <div className="col-span-4 print:col-span-4">
            <Sidebar
              personalInfo={personalInfo}
              skills={skills}
              languages={languages}
              certifications={certifications}
              socialMedia={socialMedia}
            />
          </div>

          <div className="col-span-8 p-9 print:p-10 print:col-span-8">
            {professionalSummary && (
              <div className="mb-1">
                <h2 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-4">PROFESSIONAL SUMMARY</h2>
                <p className="text-gray-700 text-[15.2px] leading-relaxed">
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
        @media print {
          @page { 
            size: A4 portrait; 
            margin: 0 !important; 
          }
          .bg-gray-100, 
          .bg-yellow-400, 
          .border-yellow-400, 
          .bg-yellow-100 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}