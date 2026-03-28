// app/utils/exportPDF.js

export const exportToPDF = async (element, fileName = 'resume.pdf') => {
  if (!element) {
    console.error('No element provided for PDF export')
    alert('Failed to generate PDF: No content found')
    return
  }

  // Store original button state
  const button = document.querySelector('button[aria-label="Export resume as PDF"]')
  let originalButtonContent = ''
  
  try {
    if (button) {
      originalButtonContent = button.innerHTML
      button.innerHTML = '<span>⏳ Generating PDF...</span>'
      button.disabled = true
    }

    // Show loading overlay
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
      font-family: Arial, sans-serif;
    `
    loadingDiv.innerHTML = `
      <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
        <div style="font-size: 24px; margin-bottom: 10px;">📄</div>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Generating PDF</div>
        <div style="font-size: 14px; color: #666;">Please wait while we create your resume...</div>
        <div style="margin-top: 15px;">
          <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #eab308; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `
    document.body.appendChild(loadingDiv)

    // Create a clean clone for PDF generation
    const cloneContainer = document.createElement('div')
    cloneContainer.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: 1100px;
      background: white;
      padding: 20px;
    `
    
    // Deep clone the element
    const cloneElement = element.cloneNode(true)
    
    // REMOVE all styled-jsx and Next.js specific attributes
    const removeNextJsAttributes = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Remove all data-* and jsx-* attributes
        const attributesToRemove = []
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i]
          if (attr.name.startsWith('data-') || 
              attr.name.includes('jsx') || 
              attr.name === 'class' && attr.value.includes('jsx-')) {
            attributesToRemove.push(attr.name)
          }
        }
        attributesToRemove.forEach(attr => node.removeAttribute(attr))
        
        // Clean up class names - remove jsx-* classes
        if (node.className) {
          const cleanClasses = node.className.split(' ')
            .filter(cls => !cls.includes('jsx-') && !cls.includes('_'))
            .join(' ')
          node.className = cleanClasses
        }
        
        // Recursively process children
        node.childNodes.forEach(child => removeNextJsAttributes(child))
      }
    }
    
    // Clean the clone
    removeNextJsAttributes(cloneElement)
    
    cloneContainer.appendChild(cloneElement)
    document.body.appendChild(cloneContainer)

    // Get the cleaned HTML
    const cleanedHTML = cloneContainer.innerHTML
    
    // Remove the clone container
    document.body.removeChild(cloneContainer)

    // Create HTML document with clean styles
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
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
          
          <!-- CRITICAL: Custom styles that override Tailwind -->
          <style>
            /* Reset and base styles */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: white;
              padding: 20px;
              width: 100%;
            }
            
            /* Main container */
            .resume-content {
              max-width: 1100px;
              margin: 0 auto;
              background: white;
            }
            
            /* FORCE TWO-COLUMN LAYOUT - This is critical */
            .resume-two-column-layout {
              display: grid !important;
              grid-template-columns: 2fr 1fr !important;
              gap: 24px !important;
              width: 100% !important;
            }
            
            /* Ensure columns don't break */
            .resume-two-column-layout > div {
              min-width: 0 !important;
              overflow: visible !important;
            }
            
            /* Utility classes that might be missing */
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mt-1 { margin-top: 0.25rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-10 { margin-top: 2.5rem; }
            
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            
            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .text-sm { font-size: 0.875rem; }
            .text-lg { font-size: 1.125rem; }
            .text-3xl { font-size: 1.875rem; }
            
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-medium { font-weight: 500; }
            
            .bg-yellow-500 { background-color: #eab308; }
            .bg-gray-50 { background-color: #f9fafb; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .bg-yellow-100 { background-color: #fef9c3; }
            
            .text-white { color: white; }
            .text-gray-900 { color: #111827; }
            .text-gray-700 { color: #374151; }
            .text-gray-600 { color: #4b5563; }
            .text-gray-500 { color: #6b7280; }
            .text-blue-600 { color: #2563eb; }
            .text-green-600 { color: #16a34a; }
            
            .rounded { border-radius: 0.25rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-full { border-radius: 9999px; }
            
            .border-b-2 { border-bottom-width: 2px; }
            .border-yellow-500 { border-color: #eab308; }
            
            .flex { display: flex; }
            .flex-wrap { flex-wrap: wrap; }
            .justify-center { justify-content: center; }
            .items-center { align-items: center; }
            .gap-2 { gap: 0.5rem; }
            .gap-3 { gap: 0.75rem; }
            .gap-4 { gap: 1rem; }
            
            .w-1 { width: 0.25rem; }
            .h-4 { height: 1rem; }
            .mr-2 { margin-right: 0.5rem; }
            .ml-2 { margin-left: 0.5rem; }
            
            /* Override any potential Tailwind conflicts */
            .grid {
              display: grid !important;
            }
            
            /* Print styles */
            @media print {
              body {
                padding: 0;
              }
              
              .resume-two-column-layout {
                display: grid !important;
                grid-template-columns: 2fr 1fr !important;
                gap: 24px !important;
                page-break-inside: avoid !important;
              }
              
              .bg-yellow-500,
              .bg-gray-50,
              .bg-yellow-100 {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              section, 
              .mb-4, 
              .mb-6,
              [class*="space-y"] > * {
                page-break-inside: avoid;
                break-inside: avoid;
              }
            }
            
            @page {
              size: A4;
              margin: 15mm;
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

    // Send to API with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)
    
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `PDF generation failed (${response.status})`)
    }
    
    // Download the PDF
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
    
    if (error.name === 'AbortError') {
      alert('PDF generation timed out. Please try again or reduce content size.')
    } else {
      alert(`Failed to generate PDF: ${error.message || 'Unknown error'}`)
    }
  } finally {
    // Restore button
    if (button && originalButtonContent) {
      button.innerHTML = originalButtonContent
      button.disabled = false
    }
    
    // Remove loading overlay
    const loadingDiv = document.getElementById('pdf-loading-overlay')
    if (loadingDiv) {
      loadingDiv.remove()
    }
  }
}