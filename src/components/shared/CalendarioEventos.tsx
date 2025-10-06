'use client'

import ptbrLocale from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type EventoCalendario = {
  id: string
  allDay: boolean
  start: Date | string
  end?: Date | string
  title: string
  display?: 'auto' | 'block' | 'list-item' | 'background' | 'inverse-background' | 'none'
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  color?: string
}

interface CalendarioEventosProps {
  eventos: EventoCalendario[]
  titulo?: string
  descricao?: string
  isLoading?: boolean
}

export function CalendarioEventos({
  eventos,
  titulo,
  descricao,
  isLoading = false,
}: CalendarioEventosProps) {
  if (isLoading) {
    return (
      <Card>
        {titulo && (
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="h-[550px] w-full bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {titulo && (
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
          {descricao && <p className="text-sm text-muted-foreground">{descricao}</p>}
        </CardHeader>
      )}
      <CardContent>
        <FullCalendar
          height="auto"
          contentHeight="auto"
          themeSystem="bootstrap5"
          locale={ptbrLocale}
          headerToolbar={{ right: 'prev,next today' }}
          editable={false}
          selectable={false}
          selectMirror={false}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={eventos}
        />
      </CardContent>
    </Card>
  )
}
