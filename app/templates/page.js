// app/templates/page.js
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useResumeStore } from '@/lib/store'
import { ArrowLeft, Eye, Check, Crown, Zap, Award, Palette, User, X, Star } from 'lucide-react'
import { useState } from 'react'

// Updated templates list without Elegant
const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with yellow accents',
    category: 'Popular',
    icon: Zap,
    features: ['Modern Layout', 'Mobile Optimized']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate design perfect for Software Engineer',
    category: 'Software',
    icon: Award,
    features: ['Professional Layout', 'Formal Design']
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium design with profile photo',
    category: 'Premium',
    icon: User,
    features: ['Profile Photo', 'Premium Design']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern gradient-based design for creatives',
    category: 'Design',
    icon: Palette,
    features: ['Creative Layout', 'Gradient Design', 'Visual Appeal']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean, minimalist design for developers',
    category: 'Tech',
    icon: Crown,
    features: ['Minimal Layout', 'Clean Design', 'Developer Focused']
  },
  {
    id: 'whiteblack',
    name: 'White & Black',
    description: 'Elegant minimalist black & white design perfect for Graphic Designers',
    category: 'Premium',
    icon: Palette,
    features: ['Large Photo Area', 'Minimalist', 'Designer Focused', 'High Impact']
  }
]

import ModernTemplate from '@/components/templates/ModernTemplate'
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate'
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate'
import CreativeTemplate from '@/components/templates/CreativeTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import WhiteBlackMinimalistTemplate from '@/components/templates/WhiteBlackMinimalistTemplate'

const templateComponents = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  whiteblack: WhiteBlackMinimalistTemplate,
}

export default function TemplatesPage() {
  const router = useRouter()
  const { updateTemplate, resume } = useResumeStore()
  const [previewTemplate, setPreviewTemplate] = useState(null)

  const handleTemplateSelect = (templateId) => {
    updateTemplate(templateId)
    router.push('/editor')
  }

  const handlePreview = (templateId) => {
    setPreviewTemplate(templateId)
  }

  const closePreview = () => {
    setPreviewTemplate(null)
  }

  const TemplatePreview = templateComponents[previewTemplate]

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-yellow-600/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <ArrowLeft className="w-5 h-5 text-yellow-500 group-hover:-translate-x-1 transition-transform" />
              <span className="text-yellow-500 font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-2xl font-bold text-yellow-500">ልዩCV</span>
                <div className="h-1 w-12 bg-yellow-500 mt-1"></div>
              </div>
            </div>

            <Link 
              href="/editor" 
              className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30"
            >
              Go to Editor
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-white">Choose Your</span>
            <br />
            <span className="text-yellow-500">Perfect Template</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Select from our professionally designed templates. Each is optimized for different industries and career levels.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {templates.map((template) => (
              <TemplateCard 
                key={template.id}
                template={template}
                onSelect={handleTemplateSelect}
                onPreview={handlePreview}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => {
                  handleTemplateSelect(previewTemplate)
                  closePreview()
                }}
                className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2"
              >
                <span>Use This Template</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={closePreview}
                className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[90vh] overflow-y-auto">
              {TemplatePreview && <TemplatePreview resume={resume} />}
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {templates.find(t => t.id === previewTemplate)?.name} Template
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {templates.find(t => t.id === previewTemplate)?.description}
                    </p>
                  </div>
                  <div className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                    {templates.find(t => t.id === previewTemplate)?.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TemplateCard({ template, onSelect, onPreview }) {
  const Icon = template.icon

  const handleSelect = () => {
    onSelect(template.id)
  }

  return (
    <div className="group relative cursor-pointer">
      <div className="
        relative rounded-3xl
        bg-gray-900
        border border-gray-800
        overflow-hidden
        transition-all duration-500
        hover:border-yellow-500/50
        hover:shadow-2xl
        hover:-translate-y-1
      ">
        <div className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">{template.name}</h3>
              <span className="text-yellow-500 text-sm font-mono uppercase tracking-wider">
                {template.category}
              </span>
            </div>
            <div className="p-2 bg-gray-800 rounded-xl">
              <Icon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            {template.description}
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-1.5">
            {template.features.map((feature, idx) => (
              <span 
                key={idx}
                className="text-xs text-gray-300 bg-gray-800 px-3 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-3 border-t border-gray-800">
          <button
            onClick={handleSelect}
            className="flex-1 bg-yellow-500 text-black font-semibold py-3 rounded-2xl hover:bg-yellow-400 transition-all active:scale-95"
          >
            Select Template
          </button>
          <button
            onClick={() => onPreview(template.id)}
            className="px-5 py-3 border border-gray-700 rounded-2xl text-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-all"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}