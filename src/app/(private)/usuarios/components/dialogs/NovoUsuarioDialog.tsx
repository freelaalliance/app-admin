import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { NovoUsuarioForm } from '../forms/NovoUsuarioForm'

export function DialogNovoUsuario({ idEmpresa }: { idEmpresa: string }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo usuário</DialogTitle>
        <DialogDescription>Crie usuários da empresa</DialogDescription>
      </DialogHeader>
      <NovoUsuarioForm idEmpresa={idEmpresa} />
    </DialogContent>
  )
}
