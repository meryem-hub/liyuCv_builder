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
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ],
      timeout: 30000
    })

    const page = await browser.newPage()
    
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1
    })

    console.log('Setting content...')
    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    })

    await new Promise(resolve => setTimeout(resolve, 500))

    console.log('Generating PDF...')
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '12mm',
        right: '12mm',
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
    }
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'PDF generation API is ready. Send POST request with HTML body.'
  })
}