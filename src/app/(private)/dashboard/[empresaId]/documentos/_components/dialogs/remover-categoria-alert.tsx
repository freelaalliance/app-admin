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
import { useRemoveCategoria } from '../../_hooks/useDocumentosData'
import { CategoriaDocumentoType } from '../../_types/documentosTypes'

export function RemoverCategoriaDocumentoAlertDialog({
  id,
  nome,
  empresaId
}: Pick<CategoriaDocumentoType, 'id'|'empresaId'|'nome'>) {

  const excluirCategoriaDocumentoMutation = useRemoveCategoria(empresaId)

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{`Remover ${nome}`}</AlertDialogTitle>
        <AlertDialogDescription>
          Deseja realmente remover essa categoria?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-red-200 text-red-700 hover:bg-red-300 shadow border-0">
          Cancelar
        </AlertDialogCancel>
        {excluirCategoriaDocumentoMutation.isPending ? (
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
              await excluirCategoriaDocumentoMutation.mutateAsync({id})
            }}
          >
            Remover
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
