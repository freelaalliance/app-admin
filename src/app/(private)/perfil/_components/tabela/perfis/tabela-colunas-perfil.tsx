import { ColumnDef } from '@tanstack/react-table'

import { PerfilEmpresa } from '@/hooks/_empresas/_types/perfilTypes'

import { MenuTabelaPerfil } from './tabela-menu-perfil'

export const colunasPerfil: ColumnDef<PerfilEmpresa, any>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex flex-row justify-center w-auto">
        <MenuTabelaPerfil row={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'nome',
    header: 'Perfil',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => <div className="md:w-96">{row.getValue('nome')}</div>,
  },
  {
    accessorKey: 'administrativo',
    header: 'Administrativo',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div>{row.getValue('administrativo') ? 'Sim' : 'Não'}</div>
    ),
  },
]
