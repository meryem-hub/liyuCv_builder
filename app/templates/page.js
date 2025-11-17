// app/templates/page.js
'use client'
import Link from 'next/link'
import { useResumeStore } from '@/lib/store'
import { ArrowLeft, Eye, Check, Crown, Zap, Award, Palette, User, X } from 'lucide-react'
import { useState } from 'react'

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with yellow accents',
    category: 'Popular',
    color: 'from-yellow-400 to-yellow-600',
    icon: Zap,
    features: ['Modern Layout', 'Mobile Optimized']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate design perfect for Software Engineer',
    category: 'Software',
    color: 'from-blue-500 to-blue-700',
    icon: Award,
    features: ['Professional Layout',  'Formal Design']
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium design with profile photo for Software Engineer',
    category: 'Premium',
    color: 'from-indigo-600 to-purple-700',
    icon: User, 
    features: ['Profile Photo', 'Premium Design']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern gradient-based design for creatives',
    category: 'Design',
    color: 'from-gray-500 to-pink-600',
    icon: Palette,
    features: ['Creative Layout', 'Gradient Design', 'Visual Appeal']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean, minimalist design for developers',
    category: 'Tech',
    color: 'from-green-500 to-green-700',
    icon: Crown,
    features: ['Minimal Layout', 'Clean Design', 'Developer Focused']
  }
]

// Import your template components
import ModernTemplate from '@/components/templates/ModernTemplate'
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate'
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate'
import CreativeTemplate from '@/components/templates/CreativeTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'

const templateComponents = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate
}

export default function TemplatesPage() {
  const { updateTemplate, resume } = useResumeStore()
  const [previewTemplate, setPreviewTemplate] = useState(null)

  const handleTemplateSelect = (templateId) => {
    updateTemplate(templateId)
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
      {/* Navigation */}
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

      {/* Hero Section */}
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

      {/* Templates Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {templates.map((template, index) => (
              <TemplateCard 
                key={template.id}
                template={template}
                index={index}
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
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Link
                href="/editor"
                onClick={() => {
                  handleTemplateSelect(previewTemplate)
                  closePreview()
                }}
                className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2"
              >
                <span>Use This Template</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
              <button
                onClick={closePreview}
                className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="h-[90vh] overflow-y-auto">
              {TemplatePreview && <TemplatePreview resume={resume} />}
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {templates.find(t => t.id === previewTemplate)?.name} Template
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {templates.find(t => t.id === previewTemplate)?.description}
                    </p>
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

function TemplateCard({ template, index, onSelect, onPreview }) {
  const Icon = template.icon

  return (
    <div className="group relative cursor-pointer">
      {/* Card Wrapper */}
      <div className="
        relative rounded-3xl overflow-hidden
        bg-gray-900/80 border border-gray-800
        transition-all duration-500 ease-out
        hover:scale-[1.03] hover:border-yellow-500/40
        hover:shadow-[0_0_35px_-5px_rgba(234,179,8,0.25)]
      ">
        
        {/* Gradient Header */}
        <div
          className={`
            h-40 relative overflow-hidden
            bg-gradient-to-br ${template.color}
          `}
        >
          {/* Soft Glow */}
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>

          {/* Floating Icon Badge */}
          <div className="
            absolute bottom-4 left-4
            w-16 h-16 rounded-2xl
            flex items-center justify-center
            bg-black/20 backdrop-blur-md
            border border-white/10
            shadow-[0_8px_20px_rgba(0,0,0,0.25)]
          ">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 pt-10">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">{template.name}</h3>
            <span className="text-yellow-500 text-sm font-medium">
              {template.category}
            </span>
            <p className="text-gray-400 text-sm mt-2">
              {template.description}
            </p>
          </div>

         

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {template.features.map((feature, idx) => (
              <span 
                key={idx}
                className="
                  inline-flex items-center gap-1
                  bg-gray-800 text-gray-300 
                  px-3 py-1 rounded-full text-xs
                "
              >
                <Check className="w-3 h-3 text-yellow-500" />
                {feature}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onSelect(template.id)}
              className="
                w-full bg-yellow-500 text-black font-bold py-3 rounded-xl
                hover:scale-[1.02] transition-all flex items-center justify-center gap-2
              "
            >
              Use This Template
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>

            <button
              onClick={() => onPreview(template.id)}
              className="
                w-full border border-white text-white font-semibold py-3 rounded-xl
                hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2
              "
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Halo on Hover */}
      <div
        className={`
          absolute inset-0 rounded-3xl blur-3xl opacity-0
          bg-gradient-to-br ${template.color}
          transition-opacity duration-500 -z-10
          group-hover:opacity-20
        `}
      />
    </div>
  )
}
