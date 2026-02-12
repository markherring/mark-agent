import { jsPDF } from 'jspdf'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ExportButtonProps {
  messages: Message[]
  company: string
}

export function ExportButton({ messages, company }: ExportButtonProps) {
  const handleExport = () => {
    if (messages.length === 0) {
      alert('No conversation to export yet!')
      return
    }

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const maxWidth = pageWidth - 2 * margin
    let yPosition = margin

    // Header
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('MARK HERRING - Interview Transcript', margin, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(10, 102, 194) // LinkedIn blue
    doc.text('linkedin.com/in/herringmark', margin, yPosition)
    doc.setTextColor(0, 0, 0) // Reset to black
    yPosition += 10

    doc.setFontSize(11)
    doc.text(`Company: ${company}`, margin, yPosition)
    yPosition += 6
    doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition)
    yPosition += 6
    doc.text(`Questions Asked: ${messages.filter(m => m.role === 'user').length}`, margin, yPosition)
    yPosition += 12

    // Add line separator
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Messages
    doc.setFontSize(10)
    messages.forEach((message, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - margin - 20) {
        doc.addPage()
        yPosition = margin
      }

      // Role header
      doc.setFont('helvetica', 'bold')
      const roleText = message.role === 'user' ? 'INTERVIEWER' : 'MARK HERRING'
      doc.text(roleText, margin, yPosition)
      yPosition += 5

      // Timestamp
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      doc.text(message.timestamp.toLocaleString(), margin, yPosition)
      yPosition += 7

      // Content - Clean up markdown formatting
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)

      // Process content line by line to preserve structure
      const contentLines = message.content
        .replace(/###\s+/g, '')
        .replace(/##\s+/g, '')
        .replace(/#\s+/g, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/\s+→\s+/g, ' -> ')
        .replace(/\s+I'\s+/g, ' -> ')
        .split('\n')

      contentLines.forEach((line: string) => {
        const trimmedLine = line.trim()
        if (!trimmedLine) {
          // Empty line - add small space
          yPosition += 3
          return
        }

        // Convert bullets
        const processedLine = trimmedLine.replace(/^[-*+]\s+/, '• ')

        // Wrap long lines
        const wrappedLines = doc.splitTextToSize(processedLine, maxWidth)

        wrappedLines.forEach((wrappedLine: string) => {
          if (yPosition > pageHeight - margin - 10) {
            doc.addPage()
            yPosition = margin
          }
          doc.text(wrappedLine, margin, yPosition)
          yPosition += 5
        })
      })

      yPosition += 10 // Space between messages
    })

    // Footer on every page
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)

      // Disclaimer
      doc.setFontSize(8)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(100, 100, 100)
      doc.text(
        'This chatbot can make mistakes. Please confirm these answers with the real Mark Herring.',
        pageWidth / 2,
        pageHeight - 15,
        { align: 'center' }
      )

      // Page number
      doc.setTextColor(0, 0, 0)
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      )
    }

    // Save
    const filename = `mark-herring-interview-${company.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(filename)
  }

  return (
    <button
      onClick={handleExport}
      disabled={messages.length === 0}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      title="Export conversation as PDF"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export PDF
    </button>
  )
}
