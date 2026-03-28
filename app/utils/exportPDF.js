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
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
          
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
              padding: 20px;
            }
            
            /* Resume container */
            .resume-content {
              max-width: 1100px;
              margin: 0 auto;
              background: white;
            }
            
            /* ========== MODERN TEMPLATE STYLES ========== */
            .resume-two-column-layout {
              display: grid !important;
              grid-template-columns: 2fr 1fr !important;
              gap: 24px !important;
              width: 100% !important;
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
            
            /* Typography */
            h1, h2, h3 {
              font-family: 'Playfair Display', serif !important;
            }
            
            /* Header styles for brown template */
            header.bg-\\[\\#2C2118\\] {
              background: linear-gradient(135deg, #2C2118 0%, #1a130d 100%) !important;
              position: relative;
              overflow: hidden;
            }
            
            /* Border styles */
            .border-b {
              border-bottom-width: 1px !important;
            }
            
            .border-l-2 {
              border-left-width: 2px !important;
            }
            
            .border-b-2 {
              border-bottom-width: 2px !important;
            }
            
            /* Rounded corners */
            .rounded-lg { border-radius: 0.5rem !important; }
            .rounded-full { border-radius: 9999px !important; }
            .rounded { border-radius: 0.25rem !important; }
            
            /* Shadows */
            .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important; }
            .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important; }
            
            /* Gradient */
            .bg-gradient-to-r {
              background-image: linear-gradient(to right, var(--tw-gradient-stops)) !important;
            }
            .from-amber-800 { --tw-gradient-from: #92400e !important; }
            .via-amber-600 { --tw-gradient-via: #d97706 !important; }
            .to-amber-400 { --tw-gradient-to: #fbbf24 !important; }
            
            /* Spacing utilities */
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-3 > * + * { margin-top: 0.75rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .space-y-5 > * + * { margin-top: 1.25rem; }
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .space-y-8 > * + * { margin-top: 2rem; }
            
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-5 { margin-bottom: 1.25rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            
            .mt-1 { margin-top: 0.25rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-3 { margin-top: 0.75rem; }
            .mt-4 { margin-top: 1rem; }
            .mt-5 { margin-top: 1.25rem; }
            .mt-6 { margin-top: 1.5rem; }
            
            .p-2 { padding: 0.5rem; }
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
            .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
            .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
            
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
            
            /* Font weights */
            .font-light { font-weight: 300; }
            .font-normal { font-weight: 400; }
            .font-medium { font-weight: 500; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            
            /* Text colors */
            .text-white { color: white !important; }
            .text-gray-900 { color: #111827 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-500 { color: #6b7280 !important; }
            
            /* Flex utilities */
            .flex { display: flex; }
            .flex-wrap { flex-wrap: wrap; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .gap-1 { gap: 0.25rem; }
            .gap-2 { gap: 0.5rem; }
            .gap-3 { gap: 0.75rem; }
            .gap-4 { gap: 1rem; }
            .gap-6 { gap: 1.5rem; }
            .gap-8 { gap: 2rem; }
            
            /* Grid */
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
            .col-span-7 { grid-column: span 7 / span 7; }
            .col-span-5 { grid-column: span 5 / span 5; }
            
            /* Text alignment */
            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }
            
            /* Letter spacing */
            .tracking-wide { letter-spacing: 0.025em; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-widest { letter-spacing: 0.1em; }
            
            /* Overflow */
            .overflow-hidden { overflow: hidden; }
            
            /* Position */
            .relative { position: relative; }
            .absolute { position: absolute; }
            
            /* Transform */
            .-translate-y-1\\/3 { transform: translateY(-33.333333%); }
            .translate-x-1\\/3 { transform: translateX(33.333333%); }
            
            /* Border radius */
            .rounded-full { border-radius: 9999px; }
            
            /* Print styles */
            @media print {
              body {
                padding: 0;
                background: white;
              }
              
              .print\\:hidden {
                display: none !important;
              }
              
              .resume-two-column-layout {
                display: grid !important;
                grid-template-columns: 2fr 1fr !important;
                gap: 24px !important;
                page-break-inside: avoid !important;
              }
              
              /* Force all background colors */
              .bg-\\[\\#2C2118\\],
              .bg-yellow-500,
              .bg-gray-50,
              .bg-gray-100,
              .bg-yellow-100,
              .bg-amber-50 {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              /* Prevent page breaks */
              section, .space-y-4 > div, .space-y-3 > div, .mb-4, .mb-5, .mb-6 {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
              
              /* Remove shadows */
              .shadow-2xl, .shadow-lg {
                box-shadow: none !important;
              }
              
              /* Optimize font sizes */
              .text-4xl, .text-5xl { font-size: 18pt !important; }
              .text-3xl { font-size: 16pt !important; }
              .text-2xl { font-size: 14pt !important; }
              .text-xl { font-size: 12pt !important; }
              .text-lg { font-size: 11pt !important; }
              .text-base { font-size: 10pt !important; }
              .text-sm { font-size: 9pt !important; }
              .text-xs { font-size: 8pt !important; }
              
              /* Optimize spacing */
              .px-8, .px-12 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
              .py-10, .py-8 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
            }
            
            @page {
              size: A4;
              margin: 12mm;
            }
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