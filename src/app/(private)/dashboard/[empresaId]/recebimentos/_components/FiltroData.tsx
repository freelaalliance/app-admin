'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

interface FiltroDataProps {
  onFiltrar: (dataInicio?: string, dataFim?: string) => void
}

export function FiltroData({ onFiltrar }: FiltroDataProps) {
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')

  const handleFiltrar = () => {
    onFiltrar(dataInicio || undefined, dataFim || undefined)
  }

  const handleLimpar = () => {
    setDataInicio('')
    setDataFim('')
    onFiltrar(undefined, undefined)
  }

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border p-4">
      <div className="flex-1 min-w-[200px]">
        <label className="text-sm font-medium mb-2 block">Data Início</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <label className="text-sm font-medium mb-2 block">Data Fim</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleFiltrar} variant="default">
          <Calendar className="mr-2 h-4 w-4" />
          Filtrar
        </Button>
        <Button onClick={handleLimpar} variant="outline">
          Limpar
        </Button>
      </div>
    </div>
  )
}
