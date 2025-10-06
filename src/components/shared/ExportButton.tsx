'use client'

import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, FileText, Table as TableIcon, FileSpreadsheet } from 'lucide-react'
import { exportToPDF } from '@/lib/utils/pdfExport'
import { exportToExcel } from '@/lib/utils/excelExport'

interface ExportButtonProps {
  data: any[]
  filename?: string
  columns?: { header: string; dataKey: string }[]
  title?: string
  onExport?: (format: 'pdf' | 'csv' | 'xlsx') => void
}

export function ExportButton({ 
  data, 
  filename = 'export', 
  columns,
  title = 'Relatório',
  onExport 
}: ExportButtonProps) {
  const handleExport = async (format: 'pdf' | 'csv' | 'xlsx') => {
    if (onExport) {
      onExport(format)
      return
    }

    const loadingToast = toast.loading(`Gerando arquivo ${format.toUpperCase()}...`)

    try {
      if (format === 'csv') {
        const csv = convertToCSV(data)
        downloadFile(csv, `${filename}.csv`, 'text/csv')
      } else if (format === 'xlsx') {
        if (columns) {
          exportToExcel({
            filename,
            data,
            columns: columns.map(col => ({ header: col.header, key: col.dataKey }))
          })
        } else {
          exportToExcel({ filename, data })
        }
      } else if (format === 'pdf') {
        if (columns) {
          exportToPDF({
            title,
            filename,
            columns,
            data
          })
        } else {
          toast.error('Colunas não definidas para exportação PDF')
          toast.dismiss(loadingToast)
          return
        }
      }

      toast.success(`Arquivo ${format.toUpperCase()} gerado com sucesso!`, {
        id: loadingToast,
      })
    } catch (error) {
      console.error('Erro ao exportar:', error)
      toast.error(`Erro ao gerar arquivo ${format.toUpperCase()}`, {
        id: loadingToast,
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Formato</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <TableIcon className="h-4 w-4 mr-2" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('xlsx')}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <FileText className="h-4 w-4 mr-2" />
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const rows = data.map((item) =>
    headers.map((header) => {
      const value = item[header]
      return typeof value === 'string' && value.includes(',')
        ? `"${value}"`
        : value
    })
  )

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
