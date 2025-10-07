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
    accessorKey: 'perfil_nome',
    header: 'Perfil',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => <div className="md:w-96">{row.getValue('perfil_nome')}</div>,
  },
  {
    accessorKey: 'perfil_administrativo',
    header: 'Administrativo',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div>{row.getValue('perfil_administrativo') ? 'Sim' : 'Não'}</div>
    ),
  },
]
