// components/preview/ResumePreview.js
'use client'
import { useResumeStore } from '@/lib/store'
import ModernTemplate from '@/components/templates/ModernTemplate'

export default function ResumePreview() {
  const { resume, currentTemplate } = useResumeStore()

  // Add safety check
  if (!resume) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-2xl">
        <div className="text-gray-500">Loading your resume...</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <ModernTemplate resume={resume} />
    </div>
  )
}