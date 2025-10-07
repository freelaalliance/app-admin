import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DialogNovoUsuario } from '../../dialogs/NovoUsuarioDialog'

import {
  getColunasTabelaUsuario,
  optionsStatusUsuario,
} from './colunas-tabela-usuarios'
import { DataTableFacetedFilter } from './filtro-status-usuario'
import { Skeleton } from '@/components/ui/skeleton'
import { UsuarioType } from '@/hooks/_empresas/_types/usuarioTypes'

interface DataTableUsuarioProps {
  data: Array<UsuarioType>
  carregandoUsuarios?: boolean
  empresa: string
}

export function DataTableUsuarios({ data, empresa, carregandoUsuarios }: DataTableUsuarioProps) {
  const colunas = getColunasTabelaUsuario(empresa)
  
  const table = useReactTable({
    data,
    columns: colunas,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col items-center gap-2 py-4 md:flex-row-reverse md:justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="shadow flex md:justify-between justify-center md:gap-4 gap-2 w-full md:w-auto px-2">
              <Plus />
              {'Novo'}
            </Button>
          </DialogTrigger>
          <DialogNovoUsuario idEmpresa={empresa} />
        </Dialog>
        <div className="flex gap-2">
          <Input
            placeholder="Filtrar pelo nome do usuario..."
            className="w-full md:w-64 "
            disabled={data?.length === 0}
            value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('nome')?.setFilterValue(event.target.value)
            }
          />
          <DataTableFacetedFilter
            options={optionsStatusUsuario}
            column={table.getColumn('status')}
            title="Status"
          />
        </div>
      </div>
      <div className="rounded-md border shadow-md bg-gray-50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
            {carregandoUsuarios ? (
              Array.from({length: 3}).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-8 h-6 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length > 0 ? (
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
                  colSpan={colunas.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm font-medium mt-5 md:text-base lg:text-lg"
                >
                  Nenhum usuário encontrado!
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
