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
  <div style="background: white; padding: 30px 40px; border-radius: 16px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <div style="margin-bottom: 20px; display: flex; justify-content: center; align-items: center;">
      <svg width="140" height="80" viewBox="0 0 140 80" xmlns="http://www.w3.org/2000/svg">
        <!-- Face -->
        <circle cx="50" cy="40" r="32" fill="#FFD93D" stroke="#C47D4A" stroke-width="2"/>
        
        <!-- Eyes -->
        <circle cx="38" cy="30" r="3.5" fill="#333"/>
        <circle cx="62" cy="30" r="3.5" fill="#333"/>
        
        <!-- Eye highlights -->
        <circle cx="37" cy="29" r="1.2" fill="white"/>
        <circle cx="61" cy="29" r="1.2" fill="white"/>
        
        <!-- Blush -->
        <ellipse cx="28" cy="42" rx="6" ry="3.5" fill="#FF9B9B" opacity="0.6"/>
        <ellipse cx="72" cy="42" rx="6" ry="3.5" fill="#FF9B9B" opacity="0.6"/>
        
        <!-- Mouth (open - eating) -->
        <ellipse cx="50" cy="52" rx="14" ry="7" fill="#333"/>
        
        <!-- Loading dots being eaten (light black = #555) -->
        <circle cx="88" cy="40" r="5" fill="#555555" class="dot1"/>
        <circle cx="104" cy="40" r="5" fill="#555555" class="dot2"/>
        <circle cx="120" cy="40" r="5" fill="#555555" class="dot3"/>
      </svg>
    </div>
    <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #1f2937;">Generating PDF</div>
    <div style="font-size: 14px; color: #6b7280;">Please wait...</div>
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