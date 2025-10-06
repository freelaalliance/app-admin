'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Loader2, Trash } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { colunasTabelaModulos } from './colunas-tabela-modulos'
import { Modulo } from '@/hooks/_empresas/_types/moduloTypes'
import { useDesativarModulo } from '@/hooks/_empresas/_hooks/useAdminData'

interface TabelaModulosEmpresaProps {
  data: Array<Modulo>
  idEmpresa: string
  carregandoDados: boolean
}

export function TabelaModulosEmpresa({
  data,
  idEmpresa,
  carregandoDados,
}: TabelaModulosEmpresaProps) {
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns: colunasTabelaModulos,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const desvincularModulo = useDesativarModulo()

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-col items-center gap-2 md:py-4 md:flex-row-reverse md:justify-between">
        {!desvincularModulo.isPending ? (
          <Button
            disabled={table.getSelectedRowModel().rows.length === 0}
            className="shadow bg-red-600 hover:bg-red-700 flex md:justify-between gap-2 w-full md:w-auto"
            onClick={async () => {
              await desvincularModulo.mutateAsync({
                empresaId: idEmpresa,
                modulos: table
                  .getSelectedRowModel()
                  .rows.map(moduloSelecionado => {
                    return {
                      idModulo: moduloSelecionado.original.id,
                    }
                  }),
              })
            }}
          >
            <Trash />
            {'Remover permissões'}
          </Button>
        ) : (
          <Button
            className="shadow bg-red-600 hover:bg-red-700 flex md:justify-between gap-2 w-full md:w-auto"
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Removendo...
          </Button>
        )}

        <Input
          placeholder="Filtrar pelo nome do módulo..."
          className="w-full md:w-64"
          disabled={data?.length === 0}
          value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('nome')?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border shadow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {carregandoDados ? (
              Array.from({length: 3}).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-8 h-6 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colunasTabelaModulos.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm mt-5 md:text-base lg:text-lg"
                >
                  Nenhum módulo vinculado!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-2 gap-2 md:w-64 md:float-right">
        <Button
          className="enabled:shadow-md"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Voltar
        </Button>
        <Button
          className="enabled:shadow-md"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
