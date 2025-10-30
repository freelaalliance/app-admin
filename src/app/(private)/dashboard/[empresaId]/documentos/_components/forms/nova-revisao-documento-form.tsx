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
  arquivo: z.string(),
})

export type NovaRevisaoDocumentoFormType = z.infer<typeof schemaNovaRevisaoDocumentoForm>

export interface NovaRevisaoDocumentoFormProps {
  idDocumento: string
}

const keyNovoArquivoDocumento = crypto.randomUUID()

export function NovaRevisaoDocumentoForm({ idDocumento }: NovaRevisaoDocumentoFormProps) {
  const [arquivoSelecionado, selecionarArquivo] = useState<boolean>(false)
  const params = useParams()
  const empresaId = params.empresaId as string

  const formNovaRevisaoDocumento = useForm<NovaRevisaoDocumentoFormType>({
    resolver: zodResolver(schemaNovaRevisaoDocumentoForm),
    defaultValues: {
      id: idDocumento,
      arquivo: keyNovoArquivoDocumento,
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarRevisaoDocumento } = useSetRevisaoDocumento(empresaId)

  const handleSubmit = async (data: NovaRevisaoDocumentoFormType) => {
    if (!arquivoSelecionado) {
      toast.error('Por favor, selecione um arquivo para fazer o upload.')
      return
    }

    console.log("📝 Dados da revisão sendo enviados para o backend:")
    console.log("   - arquivo (UUID):", data.arquivo)
    console.log("   - keyNovoArquivoDocumento (gerado no form):", keyNovoArquivoDocumento)
    console.log("   - IMPORTANTE: O backend DEVE salvar este UUID no campo 'arquivoId'")

    await salvarRevisaoDocumento(data)
  }

  const cancelar = async () => {
    if(arquivoSelecionado) await deleteFile(keyNovoArquivoDocumento)
    formNovaRevisaoDocumento.reset()
  }

  return (
    <Form {...formNovaRevisaoDocumento}>
      <form className="space-y-4" onSubmit={formNovaRevisaoDocumento.handleSubmit(handleSubmit)}>
        <div className="grid space-y-2">
          <UploadForm keyArquivo={keyNovoArquivoDocumento} arquivoSelecionado={selecionarArquivo} />
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