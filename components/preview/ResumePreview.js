// components/preview/ResumePreview.js
'use client'
import { useResumeStore } from '@/lib/store'
import ModernTemplate from '@/components/templates/ModernTemplate'
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate'
import CreativeTemplate from '@/components/templates/CreativeTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate'

export default function ResumePreview() {
  const { resume, currentTemplate } = useResumeStore()

  if (!resume) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-2xl">
        <div className="text-gray-500">Loading your resume...</div>
      </div>
    )
  }

  const templates = {
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate
  }

  const TemplateComponent = templates[currentTemplate] || ModernTemplate

  return (
    <div className="w-full resume-preview">
      <TemplateComponent resume={resume} />
    </div>
  )
}