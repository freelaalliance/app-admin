import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CheckCheck, Loader2, Trash } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PermissaoPerfilType as PermissaoVinculadoPerfilType } from '@/hooks/_empresas/_types/perfilTypes'

import { colunasPermissoesPerfil } from '../permissoes-perfil/tabela-colunas-permissoes'
import { colunasPermissoesVinculadasPerfil } from './tabela-colunas-permissoes-vinculados'

interface DataTableProps {
  data: Array<PermissaoVinculadoPerfilType>
  aplicandoPermissoes: boolean
  aplicarPermissoes: () => void
  removerPermissoes: (funcoes: Array<string>) => void
}

export function DataTablePermissoesVinculadasPerfil({
  data,
  aplicandoPermissoes,
  aplicarPermissoes,
  removerPermissoes,
}: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns: colunasPermissoesVinculadasPerfil,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  function desvincularPermissao() {
    removerPermissoes(
      table
        .getSelectedRowModel()
        .rows.map((permissao) => permissao.original.id),
    )

    table.resetRowSelection()
  }

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col items-center gap-2 py-4 md:flex-row-reverse md:justify-between">
        <Button
          disabled={table.getSelectedRowModel().rows.length === 0}
          variant="destructive"
          className="shadow flex justify-center md:justify-between gap-2 w-full md:w-auto"
          onClick={desvincularPermissao}
        >
          <Trash />
          {'Remover permissões'}
        </Button>
        {!aplicandoPermissoes ? (
          <Button
            disabled={data.length === 0}
            className="shadow flex justify-center md:justify-between gap-2 w-full md:w-auto"
            onClick={aplicarPermissoes}
          >
            <CheckCheck />
            {'Vincular permissões'}
          </Button>
        ) : (
          <Button
            className="shadow bg-sky-600  hover:bg-sky-700 w-full md:w-auto justify-center md:justify-between"
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Vinculando...
          </Button>
        )}
        <Input
          placeholder="Filtrar pelo nome da permissão..."
          className="w-full md:w-64"
          disabled={data?.length === 0}
          value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nome')?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border shadow-md bg-gray-50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colunasPermissoesPerfil.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm mt-5 md:text-base lg:text-lg"
                >
                  Nenhuma permissão vinculada!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
