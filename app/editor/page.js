'use client'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/editor/Sidebar'
import ResumePreview from '@/components/preview/ResumePreview'

export default function Editor() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
<div className="h-screen flex bg-gray-900 overflow-hidden">
      <Sidebar />
      
     <div className="flex-1 flex flex-col p-4 lg:p-6 bg-gradient-to-br from-gray-800 to-black">

        <div className="text-center mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">Live Preview</h2>
          <p className="text-gray-400">Your resume updates in real-time</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
