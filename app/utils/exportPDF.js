// app/utils/exportPDF.js

export const exportToPDF = async (element, fileName = 'resume.pdf') => {
  if (!element) {
    console.error('No element provided for PDF export')
    alert('Failed to generate PDF: No content found')
    return
  }

  const button = document.querySelector('button[aria-label="Export resume as PDF"]')
  let originalButtonContent = ''
  
  try {
    if (button) {
      originalButtonContent = button.innerHTML
      button.innerHTML = '<span>⏳ Generating PDF...</span>'
      button.disabled = true
    }

    const loadingDiv = document.createElement('div')
    loadingDiv.id = 'pdf-loading-overlay'
    loadingDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `
    loadingDiv.innerHTML = `
      <div style="background: white; padding: 30px; border-radius: 12px; text-align: center;">
        <div style="font-size: 24px;">📄</div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 10px;">Generating PDF</div>
        <div style="font-size: 14px; color: #666; margin-top: 8px;">Please wait...</div>
      </div>
    `
    document.body.appendChild(loadingDiv)

    const cloneContainer = document.createElement('div')
    cloneContainer.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: 1100px;
      background: white;
    `
    
    const cloneElement = element.cloneNode(true)
    cloneContainer.appendChild(cloneElement)
    document.body.appendChild(cloneContainer)

    const cleanedHTML = cloneContainer.innerHTML
    document.body.removeChild(cloneContainer)

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resume</title>
          
          <!-- Tailwind CSS -->
          <script src="https://cdn.tailwindcss.com"></script>
          
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
          
          <style>
            /* Base reset */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              background: white;
              padding: 0;
              margin: 0;
            }
            
            /* Resume container */
            .resume-content {
              width: 100%;
              margin: 0;
              background: white;
            }
            
         /* ========== MODERN TEMPLATE STYLES ========== */
.resume-two-column-layout {
  display: grid !important;
  grid-template-columns: 2fr 1fr !important;
  gap: 24px !important;
  width: 100% !important;
  /* ADD MARGINS HERE */
  margin-left: 24px !important;
  margin-right: 24px !important;
}

/* For smaller screens */
@media (max-width: 768px) {
  .resume-two-column-layout {
    margin-left: 16px !important;
    margin-right: 16px !important;
  }
}

@media print {
  .resume-two-column-layout {
    margin-left: 20px !important;
    margin-right: 20px !important;
  }
}

.bg-yellow-500 { background-color: #eab308 !important; }
.bg-gray-50 { background-color: #f9fafb !important; }
.bg-gray-100 { background-color: #f3f4f6 !important; }
.bg-yellow-100 { background-color: #fef9c3 !important; }
.text-yellow-700 { color: #b45309 !important; }
            
            /* ========== ELEGANT BROWN TEMPLATE STYLES ========== */
            .bg-\\[\\#2C2118\\] { background-color: #2C2118 !important; }
            .text-amber-300 { color: #fcd34d !important; }
            .text-amber-700 { color: #b45309 !important; }
            .text-amber-800 { color: #92400e !important; }
            .border-amber-300 { border-color: #fcd34d !important; }
            .border-amber-200 { border-color: #fde68a !important; }
            .bg-amber-50 { background-color: #fffbeb !important; }
            
            /* ========== COPPER/CS GRAD TEMPLATE STYLES ========== */
            .bg-\\[\\#FAF7F2\\] { background-color: #FAF7F2 !important; }
            .text-\\[\\#C47D4A\\] { color: #C47D4A !important; }
            .text-\\[\\#2C2C2C\\] { color: #2C2C2C !important; }
            .text-\\[\\#6B5A4B\\] { color: #6B5A4B !important; }
            .text-\\[\\#4A3B2E\\] { color: #4A3B2E !important; }
            .text-\\[\\#8B735A\\] { color: #8B735A !important; }
            .text-\\[\\#3A2E24\\] { color: #3A2E24 !important; }
            .border-\\[\\#E8E0D5\\] { border-color: #E8E0D5 !important; }
            
            /* ========== ELEGANT PROFESSIONAL TEMPLATE STYLES ========== */
            .grid-cols-12 {
              display: grid !important;
              grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
            }
            
            .md\\:col-span-4 {
              grid-column: span 4 / span 4 !important;
            }
            
            .md\\:col-span-8 {
              grid-column: span 8 / span 8 !important;
            }
            
            .bg-gradient-to-br {
              background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)) !important;
            }
            
            .from-slate-800 {
              --tw-gradient-from: #1e293b !important;
              --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important;
            }
            
            .to-gray-800 {
              --tw-gradient-to: #1f2937 !important;
            }
            
            .bg-white\\/10 {
              background-color: rgba(255, 255, 255, 0.1) !important;
            }
            
            .border-white\\/10 {
              border-color: rgba(255, 255, 255, 0.1) !important;
            }
            
            .border-white\\/40 {
              border-color: rgba(255, 255, 255, 0.4) !important;
            }
            
            .text-purple-600 {
              color: #9333ea !important;
            }
            
            .text-gray-200 {
              color: #e5e7eb !important;
            }
            
            /* ========== WHITE BLACK MINIMALIST TEMPLATE STYLES ========== */
            /* Grid column spans */
            .col-span-12 {
              grid-column: span 12 / span 12 !important;
            }
            
            .lg\\:col-span-8 {
              grid-column: span 8 / span 8 !important;
            }
            
            .lg\\:col-span-4 {
              grid-column: span 4 / span 4 !important;
            }
            
            /* Background colors */
            .bg-black {
              background-color: #000000 !important;
            }
            
            .bg-zinc-100 {
              background-color: #f4f4f5 !important;
            }
            
            /* Border colors */
            .border-gray-200 {
              border-color: #e5e7eb !important;
            }
            
            .border-gray-300 {
              border-color: #d1d5db !important;
            }
            
            .border-white\\/30 {
              border-color: rgba(255, 255, 255, 0.3) !important;
            }
            
            /* Text colors */
            .text-gray-300 {
              color: #d1d5db !important;
            }
            
            .text-gray-400 {
              color: #9ca3af !important;
            }
            
            /* Photo container sizing */
            .w-48 {
              width: 12rem !important;
            }
            
            .h-60 {
              height: 15rem !important;
            }
            
            .w-64 {
              width: 16rem !important;
            }
            
            .h-80 {
              height: 20rem !important;
            }
            
            /* Rounded corners */
            .rounded-xl {
              border-radius: 0.75rem !important;
            }
            
            .rounded-lg {
              border-radius: 0.5rem !important;
            }
            
            /* Additional spacing */
            .px-10 {
              padding-left: 2.5rem !important;
              padding-right: 2.5rem !important;
            }
            
            .py-8 {
              padding-top: 2rem !important;
              padding-bottom: 2rem !important;
            }
            
            .px-12 {
              padding-left: 3rem !important;
              padding-right: 3rem !important;
            }
            
            .py-14 {
              padding-top: 3.5rem !important;
              padding-bottom: 3.5rem !important;
            }
            
            /* Flex gap */
            .gap-8 {
              gap: 2rem !important;
            }
            
            .gap-10 {
              gap: 2.5rem !important;
            }
            
            /* Grid utilities */
            .grid { display: grid !important; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
            .md\\:grid-cols-3 { grid-template-columns: 2fr 1fr !important; }
            .md\\:col-span-2 { grid-column: span 2 / span 2 !important; }
            .md\\:col-span-1 { grid-column: span 1 / span 1 !important; }
            .gap-8 { gap: 2rem !important; }
            .gap-6 { gap: 1.5rem !important; }
            .gap-4 { gap: 1rem !important; }
            .gap-3 { gap: 0.75rem !important; }
            .gap-2 { gap: 0.5rem !important; }
            
            /* Flex utilities */
            .flex { display: flex !important; }
            .flex-col { flex-direction: column !important; }
            .flex-row { flex-direction: row !important; }
            .flex-wrap { flex-wrap: wrap !important; }
            .items-center { align-items: center !important; }
            .items-start { align-items: flex-start !important; }
            .justify-between { justify-content: space-between !important; }
            .justify-start { justify-content: flex-start !important; }
            .justify-end { justify-content: flex-end !important; }
            
            /* Spacing utilities */
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-3 > * + * { margin-top: 0.75rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .space-y-5 > * + * { margin-top: 1.25rem; }
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .space-y-8 > * + * { margin-top: 2rem; }
            .space-y-10 > * + * { margin-top: 2.5rem; }
            .space-y-14 > * + * { margin-top: 3.5rem; }
            
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-5 { margin-bottom: 1.25rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-10 { margin-bottom: 2.5rem; }
            
            .mt-1 { margin-top: 0.25rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-3 { margin-top: 0.75rem; }
            .mt-4 { margin-top: 1rem; }
            .mt-5 { margin-top: 1.25rem; }
            
            .p-2 { padding: 0.5rem; }
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            .p-10 { padding: 2.5rem; }
            
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
            
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
            .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
            
            /* Text sizes */
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-base { font-size: 1rem; line-height: 1.5rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-5xl { font-size: 3rem; line-height: 1; }
            .text-6xl { font-size: 3.75rem; line-height: 1; }
            
            /* Font weights */
            .font-light { font-weight: 300; }
            .font-normal { font-weight: 400; }
            .font-medium { font-weight: 500; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            
            /* Text colors */
            .text-white { color: white !important; }
            .text-black { color: black !important; }
            .text-gray-900 { color: #111827 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-500 { color: #6b7280 !important; }
            
            /* Text alignment */
            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }
            
            /* Letter spacing */
            .tracking-wide { letter-spacing: 0.025em; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-widest { letter-spacing: 0.1em; }
            .tracking-tight { letter-spacing: -0.025em; }
            .tracking-tighter { letter-spacing: -0.05em; }
            
            /* Border radius */
            .rounded-full { border-radius: 9999px !important; }
            .rounded-2xl { border-radius: 1rem !important; }
            
            /* Object fit */
            .object-cover {
              object-fit: cover !important;
            }
            
            .overflow-hidden {
              overflow: hidden !important;
            }
            
            /* Cursor */
            .cursor-pointer {
              cursor: pointer !important;
            }
            
            /* Transition */
            .transition-all {
              transition-property: all !important;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
              transition-duration: 150ms !important;
            }
            
            .hover\\:border-white:hover {
              border-color: white !important;
            }
            
            /* Shadow */
            .shadow-xl {
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
            }
            
            .shadow-2xl {
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            }
            
            /* Z-index */
            .z-50 {
              z-index: 50 !important;
            }
            
            /* Print styles */
            @media print {
              body {
                margin: 0;
                padding: 0;
                background: white;
              }
              
              .print\\:hidden {
                display: none !important;
              }
              
              .resume-content {
                box-shadow: none;
                margin: 0;
                padding: 0;
                width: 100%;
              }
              
              /* Force grid layout in print */
              .grid {
                display: grid !important;
              }
              
              .col-span-12 {
                grid-column: span 12 / span 12 !important;
              }
              
              .lg\\:col-span-8 {
                grid-column: span 8 / span 8 !important;
              }
              
              .lg\\:col-span-4 {
                grid-column: span 4 / span 4 !important;
              }
              
              /* Force all background colors */
              .bg-black,
              .bg-gradient-to-br,
              .bg-\\[\\#2C2118\\],
              .bg-\\[\\#FAF7F2\\],
              .bg-yellow-500,
              .bg-gray-50,
              .bg-gray-100,
              .bg-yellow-100,
              .bg-amber-50,
              .bg-zinc-100 {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              /* Prevent page breaks */
              section, .space-y-6 > div, .space-y-5 > div, .space-y-4 > div, .mb-4, .mb-5, .mb-6, .mb-8, .mb-10 {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
              
              /* Remove shadows */
              .shadow-2xl, .shadow-xl, .shadow-lg {
                box-shadow: none !important;
              }
              
              /* Optimize font sizes for print */
              .text-6xl, .text-5xl, .text-4xl { font-size: 18pt !important; }
              .text-3xl { font-size: 16pt !important; }
              .text-2xl { font-size: 14pt !important; }
              .text-xl { font-size: 12pt !important; }
              .text-lg { font-size: 11pt !important; }
              .text-base { font-size: 10pt !important; }
              .text-sm { font-size: 9pt !important; }
              .text-xs { font-size: 8pt !important; }
              
              /* Remove extra margins */
              body, div, .resume-content {
                margin: 0 !important;
                padding: 0 !important;
              }
            }
            
            @page {
              size: A4;
              margin: 12px;   }
          </style>
        </head>
        <body>
          <div class="resume-content">
            ${cleanedHTML}
          </div>
        </body>
      </html>
    `

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)
    
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `PDF generation failed (${response.status})`)
    }
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
  } catch (error) {
    console.error('PDF Export Error:', error)
    alert(`Failed to generate PDF: ${error.message || 'Unknown error'}`)
  } finally {
    if (button && originalButtonContent) {
      button.innerHTML = originalButtonContent
      button.disabled = false
    }
    const loadingDiv = document.getElementById('pdf-loading-overlay')
    if (loadingDiv) loadingDiv.remove()
  }
}