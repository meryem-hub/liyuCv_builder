// app/api/generate-pdf/route.js
import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

export async function POST(req) {
  let browser = null
  
  try {
    const { html } = await req.json()

    if (!html) {
      return NextResponse.json(
        { message: 'HTML is required' },
        { status: 400 }
      )
    }

    console.log('Launching browser...')
    
    // Launch browser with optimized settings
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1200,800'
      ],
      timeout: 60000
    })

    const page = await browser.newPage()
    
    // Set viewport to desktop size
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1
    })

    console.log('Setting content...')
    
    // Set content with simpler wait condition
    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    })

    // Wait a bit for styles to apply
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Generating PDF...')
    
    // Generate PDF with optimized settings
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm',
      },
      scale: 1,
      displayHeaderFooter: false,
    })

    console.log('PDF generated successfully')
    
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })

  } catch (error) {
    console.error('PDF Generation Error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate PDF' },
      { status: 500 }
    )
  } finally {
    if (browser) {
      await browser.close()
      console.log('Browser closed')
    }
  }
}