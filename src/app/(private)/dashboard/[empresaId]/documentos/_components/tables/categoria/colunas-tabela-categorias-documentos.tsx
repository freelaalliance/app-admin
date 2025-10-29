import type { ColumnDef } from '@tanstack/react-table'
import { MenuTabelaCategoriasDocumento } from './menu-tabela-categorias-documentos'
import { Categoria } from '../../../_types/documentosTypes'

export const colunasCategoriasDocumentos: ColumnDef<Categoria>[] =
  [
    {
      id: 'acoes',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="w-2">
          <MenuTabelaCategoriasDocumento row={row.original} />
        </div>
      ),
    },
    {
      accessorKey: 'nome',
      header: 'Categoria',
      enableColumnFilter: false,
      enableHiding: false,
      cell: ({ row }) => (
        <div className="w-auto capitalize">{row.original.nome}</div>
      ),
    }
  ]
