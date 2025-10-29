import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { CadastroCategoriaDocumentosForm, type CadastroCategoriaDocumentosFormProps } from '../forms/cadastro-categoria-documento'

export function CadastraCategoriaDocumentosDialog({
  empresaId,
}: CadastroCategoriaDocumentosFormProps) {
  return (
    <DialogContent className="overflow-auto">
      <DialogHeader>
        <DialogTitle>Cadastrar categorias</DialogTitle>
        <DialogDescription>
          Crie novas categorias de documentos
        </DialogDescription>
      </DialogHeader>
      <CadastroCategoriaDocumentosForm empresaId={empresaId} />
    </DialogContent>
  )
}
