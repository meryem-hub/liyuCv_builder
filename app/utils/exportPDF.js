// utils/exportPDF.js
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const exportToPDF = async (element, fileName = 'resume.pdf') => {
  if (!element) {
    console.error('No element provided');
    alert('Failed to generate PDF: No content found');
    return;
  }

  const button = document.querySelector('button[aria-label="Export resume as PDF"]');
  let originalButtonContent = '';

  try {
    // Change button to loading state
    if (button) {
      originalButtonContent = button.innerHTML;
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 8px; animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span>Generating PDF...</span>
      `;
      button.disabled = true;
    }

    // Show loading overlay
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
      z-index: 9999;
    `;
    loadingDiv.innerHTML = `
      <div style="background: white; padding: 20px; border-radius: 12px; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 10px;">⏳</div>
        <div style="font-size: 18px; font-weight: bold;">Generating PDF...</div>
        <div style="font-size: 14px; color: #666; margin-top: 8px;">Please wait</div>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    // Give a small delay for rendering
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capture the element
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: false,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
    
    // Clean up - REMOVE loading overlay FIRST
    if (loadingDiv) loadingDiv.remove();
    
    // Restore button AFTER everything is done
    if (button && originalButtonContent) {
      button.innerHTML = originalButtonContent;
      button.disabled = false;
    }

    // Prevent any further actions
    return;

  } catch (error) {
    console.error('PDF Export Error:', error);
    alert('Failed to generate PDF. Please try again.');
    
    // Clean up on error
    const loadingDiv = document.getElementById('pdf-loading-overlay');
    if (loadingDiv) loadingDiv.remove();
    
    if (button && originalButtonContent) {
      button.innerHTML = originalButtonContent;
      button.disabled = false;
    }
  }
};