import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { AtualizarStatusItemAvaliacaoRecebimentoType } from '../../_api/itensAvaliativosRecebimento'
import { useAtualizarStatusItemAvaliativoRecebimento } from '../../_hooks/useItensAvaliativosRecebimento'

export function AlterarStatusItemAvaliativoRecebimentoAlertDialog({
  id,
  ativo,
}: AtualizarStatusItemAvaliacaoRecebimentoType) {
  const params = useSearchParams()
  const empresaId = params.get('empresa') as string

  const { mutateAsync: atualizacaoStatusItemAvaliacao, isPending } = useAtualizarStatusItemAvaliativoRecebimento(empresaId)

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Alterar status</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja ${ativo ? 'ativar' : 'desativar'} este item?`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-red-200 text-red-700 hover:bg-red-300 shadow border-0">
          Cancelar
        </AlertDialogCancel>
        {isPending ? (
          <Button
            className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow gap-2"
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Alterando...
          </Button>
        ) : (
          <AlertDialogAction
            className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow"
            onClick={async () => {
              await atualizacaoStatusItemAvaliacao({
                ativo,
                id
              })
            }}
          >
            {ativo ? 'Ativar item' : 'Desativar item'}
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
