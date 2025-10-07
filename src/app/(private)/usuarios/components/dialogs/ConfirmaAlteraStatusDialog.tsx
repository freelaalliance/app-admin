import { Loader2 } from 'lucide-react'

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
import { useToggleUsuarioStatus } from '@/hooks/_empresas/_hooks/useAdminData'

interface AlteracaoStatusUsuarioDialogProps {
  idUsuario: string
  statusUsuario: boolean
  idEmpresa: string
}

export function ConfirmaAlteracaoStatusUsuarioDialog({
  idUsuario,
  statusUsuario,
  idEmpresa,
}: AlteracaoStatusUsuarioDialogProps) {

  const alterarStatus = useToggleUsuarioStatus()

  async function atualizaDadosUsuariosEmpresa(idUsuario: string) {
    await alterarStatus.mutateAsync({
      id: idUsuario, status: {
        status: statusUsuario,
      }
    })
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirma esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja realmente ${statusUsuario ? 'desativar' : 'ativar'} este usuário?`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-red-200 text-red-700 hover:bg-red-300 shadow border-0">
          Cancelar
        </AlertDialogCancel>
        {alterarStatus.isPending ? (
          <Button
            className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow "
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Alterando...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => await atualizaDadosUsuariosEmpresa(idUsuario)}
            className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow "
          >
            Confirmar
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
