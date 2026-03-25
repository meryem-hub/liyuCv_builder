export const exportToPDF = async (element, fileName = 'resume.pdf') => {
  try {
    const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: 'Inter', sans-serif;
            }

            section, .avoid-break {
              page-break-inside: avoid;
              break-inside: avoid;
            }
          </style>
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `

    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'PDF failed')
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(error)
    alert('PDF generation failed')
  }
}