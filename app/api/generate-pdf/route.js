import puppeteer from 'puppeteer'

export async function POST(req) {
  try {
    const { html } = await req.json()

    if (!html) {
      return new Response(
        JSON.stringify({ message: 'HTML is required' }),
        { status: 400 }
      )
    }

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    // wait for styles (Tailwind)
    await new Promise(resolve => setTimeout(resolve, 700))

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm',
      },
    })

    await browser.close()

    return new Response(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
      },
    })

  } catch (error) {
    console.error('PDF ERROR:', error)

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    )
  }
}