"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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
import { useSearchParams } from 'next/navigation'
import { useDeletePerfil } from '@/hooks/_empresas/_hooks/useAdminData'

interface DialogDeletaPerfilProps {
  id: string
}

export function DialogConfirmaDeletaPerfil({ id }: DialogDeletaPerfilProps) {
  const searchParams = useSearchParams()
  const empresaIdParam = searchParams.get('empresa')

  const excluirPerfilMutate = useDeletePerfil();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirma esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {'Deseja realmente excluir este perfil?'}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-red-200 text-red-700 hover:bg-red-300 shadow border-0">
          Cancelar
        </AlertDialogCancel>
        {excluirPerfilMutate.isPending ? (
          <Button
            className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow "
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Excluindo...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => {
              await excluirPerfilMutate.mutateAsync(id)
            }}
            className="bg-emerald-200 text-emerald-700 hover:bg-emerald-300 shadow "
          >
            Confirmar
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
