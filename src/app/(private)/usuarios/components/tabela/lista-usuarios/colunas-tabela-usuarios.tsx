import type { ColumnDef } from '@tanstack/react-table'


import { MenuTabelaUsuario } from './menu-tabela-usuarios'
import { UsuarioType } from '@/hooks/_empresas/_types/usuarioTypes'

export const optionsStatusUsuario = [
  {
    label: 'Ativo',
    value: 'ativo',
  },
  {
    label: 'Desativado',
    value: 'desativado',
  },
]

export const colunasTabelaUsuario: ColumnDef<UsuarioType>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-2">
        <MenuTabelaUsuario row={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'nome',
    header: 'Nome',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => <div className="w-auto">{row.getValue('nome')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => <div className="w-auto">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => {
      const status = optionsStatusUsuario.find(
        status => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-6 items-center">
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
