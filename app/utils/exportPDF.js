// utils/exportPDF.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
      <div style="background: white; padding: 20px; border-radius: 12px; text-align: center;">
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

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: false,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    pdf.save(fileName)

    loadingDiv.remove()
   
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