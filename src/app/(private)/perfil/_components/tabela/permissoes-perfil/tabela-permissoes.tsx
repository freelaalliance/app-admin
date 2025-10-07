import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Loader2, Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

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
import { useRemoverFuncaoPerfil } from '@/hooks/_empresas/_hooks/useAdminData'
import { PermissaoPerfilType } from '@/hooks/_empresas/_types/perfilTypes'

import { colunasPermissoesPerfil } from './tabela-colunas-permissoes'

interface DataTablePermissoesProps {
  data: Array<PermissaoPerfilType>
  idPerfil: string
}

export function DataTablePermissoes({
  data,
  idPerfil,
}: DataTablePermissoesProps) {
  const [rowSelection, setRowSelection] = React.useState({})
  const removerFuncaoPerfilMutation = useRemoverFuncaoPerfil()

  const table = useReactTable({
    data,
    columns: colunasPermissoesPerfil,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  async function desvinvularPermissoes() {
    const permissoesSelecionadas = table
      .getSelectedRowModel()
      .rows.map((permissao) => ({
        idFuncao: permissao.original.id,
      }))

    try {
      await removerFuncaoPerfilMutation.mutateAsync({
        perfilId: idPerfil,
        funcoes: permissoesSelecionadas,
      })

      toast.success('Permissões removidas com sucesso!')
      table.resetRowSelection()
    } catch (error) {
      toast.error('Erro ao remover permissões')
    }
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-col items-center gap-2 md:py-4 md:flex-row-reverse md:justify-between">
        <Button
          disabled={table.getSelectedRowModel().rows.length === 0 || removerFuncaoPerfilMutation.isPending}
          className="shadow bg-red-600 hover:bg-red-700 flex md:justify-between gap-2 w-full md:w-auto"
          onClick={desvinvularPermissoes}
        >
          {removerFuncaoPerfilMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Removendo...
            </>
          ) : (
            <>
              <Trash />
              Remover permissões
            </>
          )}
        </Button>
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
      <div className="rounded-md border shadow">
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
                  Nenhuma permissão encontrado!
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
