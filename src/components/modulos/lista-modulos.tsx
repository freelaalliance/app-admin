'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Modulo } from '@/hooks/_empresas/_types/moduloTypes'

interface ListaModulosProps {
  listaModulos: Array<Modulo>
  buscandoModulos: boolean
  selecionarModulo: (id: string) => void
  moduloSelecionado: string | null
}

export function ListaModulos({
  listaModulos,
  buscandoModulos,
  selecionarModulo,
  moduloSelecionado
}: ListaModulosProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex w-auto justify-between"
          disabled={buscandoModulos}
        >
          {listaModulos.length > 0
            ? moduloSelecionado
              ? listaModulos?.find(
                (modulo) => modulo.id === moduloSelecionado,
              )?.nome
              : 'Selecione um módulo...'
            : 'Módulos não encontrado'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Filtrar pelo nome do módulo..." />
          <CommandEmpty>Módulo não encontrado</CommandEmpty>
          <CommandGroup>
            {listaModulos?.map((modulo) => (
              <CommandItem
                key={modulo.id}
                value={modulo.id}
                onSelect={(currentValue: string) => {
                  selecionarModulo(
                    currentValue
                  )
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    moduloSelecionado === modulo.id
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {modulo.nome}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
