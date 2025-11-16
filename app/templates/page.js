// app/templates/page.js
'use client'
import Link from 'next/link'
import { useResumeStore } from '@/lib/store'
import { ArrowLeft, Eye, Check, Crown, Zap, Award, Palette } from 'lucide-react'

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with yellow accents',
    category: 'Popular',
    color: 'from-yellow-400 to-yellow-600',
    icon: Zap,
    features: ['Modern Layout', 'ATS Friendly', 'Mobile Optimized']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate design perfect for traditional industries',
    category: 'Business',
    color: 'from-blue-500 to-blue-700',
    icon: Award,
    features: ['Professional Layout', 'Executive Style', 'Formal Design']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern gradient-based design for creatives',
    category: 'Design',
    color: 'from-purple-500 to-pink-600',
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

export default function TemplatesPage() {
  const { updateTemplate } = useResumeStore()

  const handleTemplateSelect = (templateId) => {
    updateTemplate(templateId)
    // You can also redirect to editor automatically if needed
  }

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
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {templates.map((template, index) => (
              <TemplateCard 
                key={template.id}
                template={template}
                index={index}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Template Card Component
function TemplateCard({ template, index, onSelect }) {
  const Icon = template.icon

  return (
    <div className="group relative">
      {/* Main Card */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10">
        
        {/* Template Preview */}
        <div className="relative h-80 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          {/* Animated Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          {/* Template Content Preview */}
          <div className="absolute inset-0 p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="w-20 h-2 bg-gray-700 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-600 rounded mb-1"></div>
                <div className="w-24 h-3 bg-gray-500 rounded"></div>
              </div>
              <div className="w-16 h-6 bg-gray-700 rounded"></div>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 flex-1">
              <div className="w-full h-4 bg-gray-700 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-500 rounded"></div>
              <div className="w-full h-16 bg-gray-800 rounded mt-4"></div>
            </div>

            {/* Skills Preview */}
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
              <div className="w-20 h-6 bg-gray-700 rounded-full"></div>
              <div className="w-14 h-6 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-4">
              <Link
                href="/editor"
                onClick={() => onSelect(template.id)}
                className="bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform flex items-center space-x-3"
              >
                <span>Use This Template</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
              
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all flex items-center space-x-3">
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{template.name}</h3>
                  <span className="text-yellow-500 text-sm font-medium">{template.category}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{template.description}</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {template.features.map((feature, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center space-x-1 bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
              >
                <Check className="w-3 h-3 text-yellow-500" />
                <span>{feature}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${template.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
    </div>
  )
}