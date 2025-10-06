import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PDFExportOptions {
  title: string
  filename?: string
  orientation?: 'portrait' | 'landscape'
  pageSize?: 'a4' | 'letter'
  columns: { header: string; dataKey: string }[]
  data: any[]
  subtitle?: string
  footer?: string
}

export function exportToPDF({
  title,
  filename = 'relatorio',
  orientation = 'portrait',
  pageSize = 'a4',
  columns,
  data,
  subtitle,
  footer,
}: PDFExportOptions) {
  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format: pageSize,
  })

  // Header
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 14, 22)

  // Subtitle
  if (subtitle) {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(subtitle, 14, 30)
  }

  // Date
  const currentDate = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
  doc.setFontSize(9)
  doc.setTextColor(100)
  doc.text(`Gerado em: ${currentDate}`, 14, subtitle ? 36 : 30)

  // Table
  autoTable(doc, {
    startY: subtitle ? 42 : 36,
    head: [columns.map((col) => col.header)],
    body: data.map((row) =>
      columns.map((col) => {
        const value = row[col.dataKey]
        return value !== null && value !== undefined ? String(value) : '-'
      })
    ),
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246], // Blue
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { top: 10 },
  })

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(100)

    if (footer) {
      doc.text(footer, 14, doc.internal.pageSize.height - 10)
    }

    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width - 30,
      doc.internal.pageSize.height - 10
    )
  }

  // Download
  const finalFilename = `${filename}_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`
  doc.save(finalFilename)
}

export function exportSimplePDF(title: string, content: string, filename = 'documento') {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 14, 22)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')

  const lines = doc.splitTextToSize(content, 180)
  doc.text(lines, 14, 35)

  const finalFilename = `${filename}_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`
  doc.save(finalFilename)
}
