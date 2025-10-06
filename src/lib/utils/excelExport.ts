import * as XLSX from 'xlsx'
import { format } from 'date-fns'

interface ExcelExportOptions {
  filename?: string
  sheetName?: string
  data: any[]
  columns?: { header: string; key: string }[]
}

export function exportToExcel({
  filename = 'planilha',
  sheetName = 'Dados',
  data,
  columns,
}: ExcelExportOptions) {
  // Preparar dados
  let exportData: any[]

  if (columns && columns.length > 0) {
    // Se colunas foram especificadas, mapear dados
    exportData = data.map((row) => {
      const mappedRow: any = {}
      columns.forEach((col) => {
        mappedRow[col.header] = row[col.key] !== null && row[col.key] !== undefined ? row[col.key] : '-'
      })
      return mappedRow
    })
  } else {
    // Caso contrário, usar dados como estão
    exportData = data
  }

  // Criar worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData)

  // Ajustar largura das colunas automaticamente
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1')
  const columnWidths: { wch: number }[] = []

  for (let C = range.s.c; C <= range.e.c; ++C) {
    let maxWidth = 10
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const cellAddress = { c: C, r: R }
      const cellRef = XLSX.utils.encode_cell(cellAddress)
      const cell = worksheet[cellRef]
      if (cell && cell.v) {
        const cellValue = String(cell.v)
        maxWidth = Math.max(maxWidth, cellValue.length)
      }
    }
    columnWidths.push({ wch: Math.min(maxWidth + 2, 50) })
  }
  worksheet['!cols'] = columnWidths

  // Criar workbook
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  // Download
  const finalFilename = `${filename}_${format(new Date(), 'yyyyMMdd_HHmmss')}.xlsx`
  XLSX.writeFile(workbook, finalFilename)
}

export function exportMultiSheetExcel(
  sheets: { name: string; data: any[]; columns?: { header: string; key: string }[] }[],
  filename = 'planilha'
) {
  const workbook = XLSX.utils.book_new()

  sheets.forEach((sheet) => {
    let exportData: any[]

    if (sheet.columns && sheet.columns.length > 0) {
      exportData = sheet.data.map((row) => {
        const mappedRow: any = {}
        sheet.columns!.forEach((col) => {
          mappedRow[col.header] = row[col.key] !== null && row[col.key] !== undefined ? row[col.key] : '-'
        })
        return mappedRow
      })
    } else {
      exportData = sheet.data
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name)
  })

  const finalFilename = `${filename}_${format(new Date(), 'yyyyMMdd_HHmmss')}.xlsx`
  XLSX.writeFile(workbook, finalFilename)
}
