// app/api/generate-pdf/route.js
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'  
import { NextResponse } from 'next/server'

export async function POST(req) {
  let browser = null
  
  try {
    const { html } = await req.json()

    if (!html) {
      return NextResponse.json(
        { error: 'HTML is required' },
        { status: 400 }
      )
    }

    console.log('Launching browser on Vercel...')
    
    // Regular version bundles Chromium - no URL needed
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      timeout: 60000
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
      timeout: 15000
    })

    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Generating PDF...')
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm',
      },
      scale: 1,
      displayHeaderFooter: false,
    })

    console.log('PDF generated successfully, size:', pdf.length)
    
    await browser.close()
    
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
        'Cache-Control': 'no-cache',
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
      try {
        await browser.close()
      } catch (e) {
        console.error('Error closing browser:', e)
      }
    }
  }
}