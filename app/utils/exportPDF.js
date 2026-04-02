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
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; margin-right: 8px;">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span>Generating PDF...</span>
      `
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
        <div style="font-size: 24px; margin-bottom: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #eab308; margin: 0 auto;">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M12 18v-4"/>
            <path d="M8 18v-4"/>
            <path d="M16 18v-4"/>
          </svg>
        </div>
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
         
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
         
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
           
            body {
              font-family: 'Inter', system-ui, sans-serif;
              background: white;
              margin: 0;
              padding: 0;
            }
           
            .resume-container {
              width: 100%;
              padding: 32px 36px;
              background: white;
            }
           
            .resume-two-column-layout {
              display: grid !important;
              grid-template-columns: 2fr 1fr !important;
              gap: 28px !important;
              width: 100% !important;
            }
           
            .bg-yellow-500 { background-color: #eab308 !important; }
            .bg-gray-50 { background-color: #f9fafb !important; }
            .bg-yellow-100 { background-color: #fef9c3 !important; }
           
            @media print {
              body {
                margin: 0;
                padding: 0;
                background: white;
              }
             
              .resume-container {
                padding: 10px 10px !important;   
              }
             
              .resume-two-column-layout {
                gap: 28px !important;
              }
            }
           
            @page {
              size: A4;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
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