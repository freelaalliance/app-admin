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
import { Funcao } from '@/hooks/_empresas/_types/moduloTypes'

interface ListaFuncoesProps {
  listaFuncoes: Array<Funcao>
  buscandoFuncoes: boolean
  selecionarFuncao: (id: string) => void
  funcaoSelecionada: string | null
}

export function ListaFuncoes({
  listaFuncoes,
  buscandoFuncoes,
  selecionarFuncao,
  funcaoSelecionada
}: ListaFuncoesProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={buscandoFuncoes}
          className='w-auto justify-start'
        >
          {listaFuncoes && listaFuncoes.length > 0
            ? funcaoSelecionada
              ? listaFuncoes?.find(
                  (funcao) => funcao.id === funcaoSelecionada,
                )?.nome
              : 'Selecione uma função...'
            : 'Funções não encontrado'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Filtrar pelo nome da função..." />
          <CommandEmpty>Função não encontrado</CommandEmpty>
          <CommandGroup>
            {listaFuncoes?.map((funcao) => (
              <CommandItem
                key={funcao.id}
                value={funcao.id}
                onSelect={(currentValue: string) => {
                  selecionarFuncao(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    funcaoSelecionada === funcao.id
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {funcao.nome}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
