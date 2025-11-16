import Link from 'next/link'
import { Crown, Zap, CheckCircle, Star, Users, Award, ArrowRight, Eye, Download, Settings } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-yellow-600/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Crown className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-yellow-500">ልዩCV</span>
                <div className="h-1 w-8 sm:w-12 bg-yellow-500 mt-1"></div>
              </div>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
              <a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium text-sm lg:text-base">Features</a>
              <a href="#templates" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium text-sm lg:text-base">Templates</a>
              <a href="#success" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium text-sm lg:text-base">Success</a>
            </div>

            {/* CTA Button */}
            <Link 
              href="/editor" 
              className="bg-yellow-500 text-black font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg transition-transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 flex items-center space-x-2 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Create Resume</span>
              <span className="sm:hidden">Create</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center z-10">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="text-white">Build Your</span>
            <br />
            <span className="text-yellow-500">Professional CV</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-12 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            Showcase your experience, skills, and accomplishments in an impressive CV
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-12 mb-12 sm:mb-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 flex items-center justify-center space-x-2">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>96%</span>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Interview Rate</div>
            </div>
            <div className="hidden sm:block h-12 w-px bg-yellow-500/30"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 flex items-center justify-center space-x-2">
                <Star className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>4.9/5</span>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Rating</div>
            </div>
            <div className="hidden sm:block h-12 w-px bg-yellow-500/30"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 flex items-center justify-center space-x-2">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>50K+</span>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Users</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link 
              href="/editor" 
              className="group bg-yellow-500 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 lg:py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/40 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center"
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/templates"
              className="border-2 border-yellow-500/50 text-yellow-300 font-semibold text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 lg:py-5 rounded-xl transition-all duration-300 hover:bg-yellow-500/10 hover:border-yellow-400 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View Templates</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Engineered for </span>
              <span className="text-yellow-500">Career Success</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Create professional CVs that stand out, impress recruiters, and get noticed by top companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-gray-900 border border-yellow-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">ATS Optimized</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Every CV is designed to pass through Applicant Tracking Systems used by recruiters worldwide.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gray-900 border border-yellow-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Quick Setup</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Build a professional CV in under a minute—no design skills required.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gray-900 border border-yellow-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Instant Export</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Download your CV as PDF, PNG, or shareable link with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-16 sm:py-24 lg:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-yellow-500">Templates</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Crafted to highlight your skills and achievements with style and clarity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Template 1 */}
            <div className="bg-gray-900 border border-yellow-500/20 rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Settings className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-black" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">Executive</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Ideal for leadership and management roles</p>
              </div>
            </div>

            {/* Template 2 */}
            <div className="bg-gray-900 border border-yellow-500/20 rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-black" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">Modern</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Modern and contemporary design for any field</p>
              </div>
            </div>

            {/* Template 3 */}
            <div className="bg-gray-900 border border-yellow-500/20 rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-black" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">Professional</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Clean, structured format for formal applications</p>
              </div>
            </div>

            {/* Template 4 */}
            <div className="bg-gray-900 border border-yellow-500/20 rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:border-yellow-400/40 hover:scale-105">
              <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-yellow-700 to-yellow-900 flex items-center justify-center">
                <Crown className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-black" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">Premium</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Luxury layout with extra design flair</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-yellow-500">ልዩCV</span>
            </div>

            {/* Center Quote */}
            <div className="text-gray-500 text-xs sm:text-sm italic text-center md:text-left max-w-md">
              "Helping you create CVs that open doors to exciting opportunities."
            </div>

            {/* Footer Text */}
            <div className="text-center md:text-right">
              <div className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">© 2025 ልዩCV • Created by Meryem Ebrahim</div>
              <div className="text-yellow-400/60 text-xs">Professional CVs for successful journeys</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}