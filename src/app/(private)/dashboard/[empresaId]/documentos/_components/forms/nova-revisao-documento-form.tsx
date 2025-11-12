import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import {
  Form
} from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { deleteFile } from "../../_actions/upload-actions"
import UploadForm from "@/components/ui/upload-documentos"
import { useSetRevisaoDocumento } from "../../_hooks/useDocumentosData"
import { useParams } from "next/navigation"

const schemaNovaRevisaoDocumentoForm = z.object({
  id: z.string().uuid(),
  arquivo: z.string().min(1), // Agora aceita qualquer string (keyCompleta com caminho e extensão)
})

export type NovaRevisaoDocumentoFormType = z.infer<typeof schemaNovaRevisaoDocumentoForm>

export interface NovaRevisaoDocumentoFormProps {
  idDocumento: string
}

export function NovaRevisaoDocumentoForm({ idDocumento }: NovaRevisaoDocumentoFormProps) {
  const [arquivoSelecionado, selecionarArquivo] = useState<boolean>(false)
  const [arquivoKeyCompleta, setArquivoKeyCompleta] = useState<string | null>(null)
  const params = useParams()
  const empresaId = params.empresaId as string

  const formNovaRevisaoDocumento = useForm<NovaRevisaoDocumentoFormType>({
    resolver: zodResolver(schemaNovaRevisaoDocumentoForm),
    defaultValues: {
      id: idDocumento,
      arquivo: '', // Será preenchido no callback do upload
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarRevisaoDocumento } = useSetRevisaoDocumento(empresaId)

  const handleSubmit = async (data: NovaRevisaoDocumentoFormType) => {
    if (!arquivoSelecionado) {
      toast.error('Por favor, selecione um arquivo para fazer o upload.')
      return
    }

    await salvarRevisaoDocumento(data)
  }

  const cancelar = async () => {
    if (arquivoKeyCompleta) {
      await deleteFile(arquivoKeyCompleta)
    }
    formNovaRevisaoDocumento.reset()
  }

  const handleUploadSuccess = (uuid: string, keyCompleta: string) => {
    // Salva a keyCompleta (com caminho e extensão) no formulário
    formNovaRevisaoDocumento.setValue('arquivo', keyCompleta)
  }

  return (
    <Form {...formNovaRevisaoDocumento}>
      <form className="space-y-4" onSubmit={formNovaRevisaoDocumento.handleSubmit(handleSubmit)}>
        <div className="grid space-y-2">
          <UploadForm 
            prefixo={`documentos/${empresaId}`}
            onUploadSuccess={handleUploadSuccess}
            arquivoSelecionado={selecionarArquivo} 
          />
        </div>

        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={cancelar}
              variant={'secondary'}
              className="shadow-md text-sm uppercase leading-none rounded "
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="shadow-md text-sm uppercase leading-none rounded "
            disabled={formNovaRevisaoDocumento.formState.isSubmitting}
          >
            {formNovaRevisaoDocumento.formState.isSubmitting ? 'Salvando revisão...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </Form >
  )

}