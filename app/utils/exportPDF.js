// utils/exportPDF.js
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const exportToPDF = async (element, fileName = 'resume.pdf') => {
  if (!element) {
    console.error('No element provided');
    alert('Failed to generate PDF: No content found');
    return;
  }

  try {
    // Create loading overlay
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'pdf-loading-overlay';
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
      z-index: 99999;
    `;
    loadingDiv.innerHTML = `
      <div style="background: white; padding: 20px 40px; border-radius: 12px; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 10px;">⏳</div>
        <div style="font-size: 16px; font-weight: 600;">Generating PDF...</div>
        <div style="font-size: 12px; color: #666; margin-top: 8px;">Please wait</div>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    // Allow time for rendering
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capture the element
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: false,
      logging: false,
    });

    // Remove loading overlay BEFORE creating PDF
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }

    // Create and save PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);

  } catch (error) {
    console.error('PDF Export Error:', error);
    
    // Clean up loading overlay on error
    const loadingDiv = document.getElementById('pdf-loading-overlay');
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
    
    alert('Failed to generate PDF. Please try again.');
  }
};