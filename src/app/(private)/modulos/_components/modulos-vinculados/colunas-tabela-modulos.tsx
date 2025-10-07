import { ColumnDef } from '@tanstack/react-table'

import { Modulo } from '@/hooks/_empresas/_types/moduloTypes'
import { Checkbox } from '@/components/ui/checkbox'

export const colunasTabelaModulos: ColumnDef<Modulo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nome',
    header: 'Módulo',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => <div className="md:w-96">{row.getValue('nome')}</div>,
  },
]
