// components/preview/ResumePreview.js
'use client'
import { useResumeStore } from '@/lib/store'

// Import all templates including the new one
import ModernTemplate from '@/components/templates/ModernTemplate'
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate'
import CreativeTemplate from '@/components/templates/CreativeTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate'
import WhiteBlackMinimalistTemplate from '@/components/templates/WhiteBlackMinimalistTemplate'

export default function ResumePreview() {
  const { resume, currentTemplate } = useResumeStore()

  if (!resume) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-2xl">
        <div className="text-gray-500">Loading your resume...</div>
      </div>
    )
  }

  // ←←← UPDATED TEMPLATE MAP ←←←
  const templates = {
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate,
    whiteblack: WhiteBlackMinimalistTemplate,   // ← This was missing!
  }

  const TemplateComponent = templates[currentTemplate] || ModernTemplate

  return (
    <div className="w-full resume-preview bg-white shadow-xl">
      <TemplateComponent resume={resume} />
    </div>
  )
}