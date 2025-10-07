import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EditarUsuarioForm } from '../forms/EditUsuarioForm'
import { UsuarioType } from '@/hooks/_empresas/_types/usuarioTypes'

interface DialogEdicaoUsuarioProps {
  dadosUsuario: UsuarioType
  idEmpresa: string
}

export function DialogEdicaoUsuario({
  dadosUsuario,
  idEmpresa,
}: DialogEdicaoUsuarioProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edição de usuário</DialogTitle>
        <DialogDescription>Altera dados do usuário</DialogDescription>
      </DialogHeader>
      <EditarUsuarioForm dadosUsuario={dadosUsuario} idEmpresa={idEmpresa} />
    </DialogContent>
  )
}
