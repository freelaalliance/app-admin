import type { ColumnDef } from '@tanstack/react-table'
import { MenuTabelaItensAvaliacaoExpedicao } from './menu-tabela-itens-expedicao'
import { ItemAvaliacaoExpedicaoType } from '../../_api/itensAvaliativoApi'

export const colunasItensAvaliacaoExpedicao: ColumnDef<ItemAvaliacaoExpedicaoType>[] =
  [
    {
      id: 'acoes',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="w-2">
          <MenuTabelaItensAvaliacaoExpedicao row={row.original} />
        </div>
      ),
    },
    {
      accessorKey: 'descricao',
      header: 'Descrição',
      enableColumnFilter: false,
      enableHiding: false,
      cell: ({ row }) => (
        <div className="w-auto capitalize">{row.original.pergunta}</div>
      ),
    },
  ]
