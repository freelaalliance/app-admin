'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon, X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

interface FiltroDataProps {
  onFiltrar: (dataInicio?: string, dataFim?: string) => void
}

export function FiltroData({ onFiltrar }: FiltroDataProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  })

  const handleFiltrar = () => {
    if (date?.from) {
      const dataInicio = format(date.from, 'yyyy-MM-dd')
      const dataFim = date.to ? format(date.to, 'yyyy-MM-dd') : undefined
      onFiltrar(dataInicio, dataFim)
    }
  }

  const handleLimpar = () => {
    setDate(undefined)
    onFiltrar(undefined, undefined)
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border p-4">
      <div className="flex-1 min-w-[280px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                    {format(date.to, 'dd/MM/yyyy', { locale: ptBR })}
                  </>
                ) : (
                  format(date.from, 'dd/MM/yyyy', { locale: ptBR })
                )
              ) : (
                <span>Selecione o período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
              className="rounded-lg border shadow-sm"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={handleFiltrar} 
          variant="default"
          disabled={!date?.from}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Filtrar
        </Button>
        <Button 
          onClick={handleLimpar} 
          variant="outline"
          disabled={!date}
        >
          <X className="mr-2 h-4 w-4" />
          Limpar
        </Button>
      </div>
    </div>
  )
}
