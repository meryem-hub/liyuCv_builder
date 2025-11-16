import Link from 'next/link'
import { Crown, Zap, CheckCircle, Star, Users, Award, ArrowRight, Eye, Download, Settings } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-yellow-600/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-2xl font-bold text-yellow-500">ልዩCV</span>
                <div className="h-1 w-12 bg-yellow-500 mt-1"></div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Features</a>
              <a href="#templates" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Templates</a>
              <a href="#success" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Success</a>
            </div>

            {/* CTA Button */}
            <Link 
              href="/editor" 
              className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition-transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 flex items-center space-x-2"
            >
              <span>Create Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
   <section className="relative min-h-screen flex items-center justify-center">
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

  <div className="relative container mx-auto px-6 text-center z-10">
    {/* Main Headline */}
    <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
      <span className="text-white">Build Your</span>
      <br />
      <span className="text-yellow-500">Professional CV</span>
    </h1>

    {/* Subheadline */}
  <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
  Showcase your experience, skills, and accomplishments in an impressive CV
</p>


    {/* Stats */}
    <div className="flex justify-center items-center space-x-12 mb-16">
      <div className="text-center">
        <div className="text-3xl font-bold text-yellow-400 flex items-center justify-center space-x-2">
          <CheckCircle className="w-8 h-8" />
          <span>96%</span>
        </div>
        <div className="text-gray-400 text-sm">Interview Rate</div>
      </div>
      <div className="h-12 w-px bg-yellow-500/30"></div>
      <div className="text-center">
        <div className="text-3xl font-bold text-yellow-400 flex items-center justify-center space-x-2">
          <Star className="w-8 h-8" />
          <span>4.9/5</span>
        </div>
        <div className="text-gray-400 text-sm">Rating</div>
      </div>
      <div className="h-12 w-px bg-yellow-500/30"></div>
      <div className="text-center">
        <div className="text-3xl font-bold text-yellow-400 flex items-center justify-center space-x-2">
          <Users className="w-8 h-8" />
          <span>50K+</span>
        </div>
        <div className="text-gray-400 text-sm">Users</div>
      </div>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Link 
        href="/editor" 
        className="group bg-yellow-500 text-black font-bold text-lg px-12 py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/40 flex items-center space-x-3"
      >
        <span>Start Building Free</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
      
   <Link 
  href="/templates"
  className="border-2 border-yellow-500/50 text-yellow-300 font-semibold text-lg px-12 py-5 rounded-xl transition-all duration-300 hover:bg-yellow-500/10 hover:border-yellow-400 flex items-center space-x-3"
>
  <Eye className="w-5 h-5" />
  <span>View Templates</span>
</Link>
    </div>
  </div>
</section>


      {/* Features Section */}
 <section id="features" className="py-32 bg-gradient-to-b from-black to-gray-900">
  <div className="container mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-5xl font-bold mb-6">
        <span className="text-white">Engineered for </span>
        <span className="text-yellow-500">Career Success</span>
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Create professional CVs that stand out, impress recruiters, and get noticed by top companies worldwide.
      </p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="group bg-gray-900 border border-yellow-500/20 rounded-3xl p-8 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105">
        <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Award className="w-8 h-8 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">ATS Optimized</h3>
        <p className="text-gray-400 leading-relaxed">
          Every CV is designed to pass through Applicant Tracking Systems used by recruiters worldwide.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="group bg-gray-900 border border-yellow-500/20 rounded-3xl p-8 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105">
        <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Zap className="w-8 h-8 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Quick Setup</h3>
        <p className="text-gray-400 leading-relaxed">
          Build a professional CV in under a minute—no design skills required.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="group bg-gray-900 border border-yellow-500/20 rounded-3xl p-8 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105">
        <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Download className="w-8 h-8 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Instant Export</h3>
        <p className="text-gray-400 leading-relaxed">
          Download your CV as PDF, PNG, or shareable link with one click.
        </p>
      </div>
    </div>
  </div>
</section>


     {/* Templates Preview */}
<section id="templates" className="py-32 bg-black">
  <div className="container mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-5xl font-bold mb-6">
        <span className="text-yellow-500">Templates</span>
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Crafted to highlight your skills and achievements with style and clarity
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Template 1 */}
      <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
        <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
          <Settings className="w-12 h-12 text-black" />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 text-white">Executive</h3>
          <p className="text-gray-400 text-sm">Ideal for leadership and management roles</p>
        </div>
      </div>

      {/* Template 2 */}
      <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
        <div className="h-48 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center">
          <Zap className="w-12 h-12 text-black" />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 text-white">Modern</h3>
          <p className="text-gray-400 text-sm">Modern and contemporary design for any field</p>
        </div>
      </div>

      {/* Template 3 */}
      <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
        <div className="h-48 bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
          <Award className="w-12 h-12 text-black" />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 text-white">Professional</h3>
          <p className="text-gray-400 text-sm">Clean, structured format for formal applications</p>
        </div>
      </div>

      {/* Template 4 */}
      <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
        <div className="h-48 bg-gradient-to-br from-yellow-700 to-yellow-900 flex items-center justify-center">
          <Crown className="w-12 h-12 text-black" />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 text-white">Premium</h3>
          <p className="text-gray-400 text-sm">Luxury layout with extra design flair</p>
        </div>
      </div>
    </div>
  </div>
</section>





{/* Footer */}
<footer className="bg-black border-t border-yellow-500/20 py-16">
  <div className="container mx-auto px-6">
    <div className="flex flex-col md:flex-row justify-between items-center">

      {/* Logo */}
      <div className="flex items-center space-x-3 mb-6 md:mb-0">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
          <Crown className="w-4 h-4 text-black" />
        </div>
        <span className="text-xl font-bold text-yellow-500">ልዩCV</span>
      </div>

      {/* Center Quote */}
      <div className="text-gray-500 text-sm italic mb-6 md:mb-0">
      "Helping you create CVs that open doors to exciting opportunities."

      </div>

      {/* Footer Text */}
      <div className="text-center md:text-right">
        <div className="text-gray-400 mb-2">© 2025 ልዩCV • Created by Meryem Ebrahim</div>
        <div className="text-yellow-400/60 text-sm">Professional CVs for successful journeys</div>
      </div>

    </div>
  </div>
</footer>


    </div>
  )
}