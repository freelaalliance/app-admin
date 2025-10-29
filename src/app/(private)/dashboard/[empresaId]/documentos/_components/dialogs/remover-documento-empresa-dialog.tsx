
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
import { DocumentoType } from '../../_types/documentosTypes'
import { useRemoveDocumento } from '../../_hooks/useDocumentosData'

interface RemoverDocumentoAlertDialogProps {
  documento: DocumentoType
}

export function RemoverDocumentoAlertDialog({ documento }: RemoverDocumentoAlertDialogProps) {

  const excluirDocumentoMutation = useRemoveDocumento(documento.empresaId)

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{`Remover o documento ${documento.nome}`}</AlertDialogTitle>
        <AlertDialogDescription>
          Deseja realmente remover esse documento?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-red-200 text-red-700 hover:bg-red-300 shadow border-0">
          Cancelar
        </AlertDialogCancel>
        {excluirDocumentoMutation.isPending ? (
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
              await excluirDocumentoMutation.mutateAsync({
                id: documento.id,
                empresaId: documento.empresaId
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
