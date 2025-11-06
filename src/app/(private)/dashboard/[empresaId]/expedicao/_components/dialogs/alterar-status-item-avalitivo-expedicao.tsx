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
import { AtualizarStatusItemAvaliacaoExpedicaoType } from '../../_api/itensAvaliativoApi'
import { useSearchParams } from 'next/navigation'
import { useRemoverItemAvaliativo } from '../../_hooks/useItensAvaliativosExpedicao'


export function RemoverItemAvaliativoExpedicaoAlertDialog({
  id,
}: AtualizarStatusItemAvaliacaoExpedicaoType) {
  const params = useSearchParams()
  const empresaId = params.get('empresa') as string

  const { mutateAsync: removerItemAvaliacao, isPending } = useRemoverItemAvaliativo(empresaId)

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Remover item</AlertDialogTitle>
        <AlertDialogDescription>
          {'Deseja remover este item avaliativo?'}
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
            Removendo...
          </Button>
        ) : (
          <AlertDialogAction
            className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow"
            onClick={async () => {
              await removerItemAvaliacao({
                id,
              })
            }}
          >
            Remover
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
