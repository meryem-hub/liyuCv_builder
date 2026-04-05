// app/api/generate-pdf/route.js
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'
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

    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 15000
    })

    await new Promise(resolve => setTimeout(resolve, 1000))

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
    })

    await browser.close()
    
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
    if (browser) await browser.close()
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ready',
    message: 'PDF generation API is ready'
  })
}