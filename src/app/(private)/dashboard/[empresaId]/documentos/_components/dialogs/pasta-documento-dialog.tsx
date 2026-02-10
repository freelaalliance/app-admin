'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAtualizarPastaDocumento, useCriarPastaDocumento } from '../../_hooks/useDocumentosData'

const schemaPastaForm = z.object({
  nome: z.string({ required_error: 'Nome da pasta é obrigatório' })
    .min(1, 'Nome da pasta é obrigatório'),
})

type PastaFormType = z.infer<typeof schemaPastaForm>

interface PastaDocumentoDialogProps {
  aberto: boolean
  onFechar: () => void
  pasta?: { id: string; nome: string } | null
  empresaId: string
}

export function PastaDocumentoDialog({ aberto, onFechar, pasta, empresaId }: PastaDocumentoDialogProps) {
  const modoEdicao = !!pasta

  const formPasta = useForm<PastaFormType>({
    resolver: zodResolver(schemaPastaForm),
    defaultValues: { nome: pasta?.nome ?? '' },
  })

  useEffect(() => {
    if (aberto) {
      formPasta.reset({ nome: pasta?.nome ?? '' })
    }
  }, [aberto, pasta, formPasta])

  const { mutateAsync: criarPasta, isPending: isCriando } = useCriarPastaDocumento(empresaId)
  const { mutateAsync: atualizarPasta, isPending: isAtualizando } = useAtualizarPastaDocumento(empresaId)

  const isPending = isCriando || isAtualizando

  const handleSubmit = async (data: PastaFormType) => {
    if (modoEdicao && pasta) {
      await atualizarPasta({ id: pasta.id, nome: data.nome })
    } else {
      await criarPasta(data.nome)
    }
    formPasta.reset()
    onFechar()
  }

  return (
    <Dialog open={aberto} onOpenChange={(open) => !open && onFechar()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{modoEdicao ? 'Editar pasta' : 'Nova pasta'}</DialogTitle>
          <DialogDescription>
            {modoEdicao
              ? 'Altere o nome da pasta de documentos'
              : 'Crie uma nova pasta para organizar seus documentos'}
          </DialogDescription>
        </DialogHeader>
        <Form {...formPasta}>
          <form className="space-y-4" onSubmit={formPasta.handleSubmit(handleSubmit)}>
            <FormField
              control={formPasta.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da pasta</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome da pasta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? (modoEdicao ? 'Salvando...' : 'Criando...')
                  : (modoEdicao ? 'Salvar' : 'Criar pasta')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
