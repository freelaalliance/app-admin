import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAtualizarDescricaoItemAvaliativoRecebimento } from '../../_hooks/useItensAvaliativosRecebimento'
import { useSearchParams } from 'next/navigation'

const schemaAtualizacaoItemAvaliativoRecebimento = z.object({
  id: z.string().uuid(),
  descricao: z.string({
    required_error: 'Obrigatório adicionar a descrição do item',
  }),
})

export type ItemAvaliativoRecebimentoFormType = z.infer<
  typeof schemaAtualizacaoItemAvaliativoRecebimento
>

export interface AtualizacaoItemAvaliativoRecebimentoFormProps {
  id: string
  descricao: string
}

export function AtualizacaoItemAvaliativoRecebimentoForm({
  id,
  descricao
}: AtualizacaoItemAvaliativoRecebimentoFormProps) {
  const params = useSearchParams()
  const empresaId = params.get('empresa') as string

  const formItemAvaliatiosRecebimento = useForm<ItemAvaliativoRecebimentoFormType>({
    resolver: zodResolver(schemaAtualizacaoItemAvaliativoRecebimento),
    defaultValues: {
      descricao,
      id
    },
    mode: 'onChange',
  })

  const { mutateAsync: atualizacaoItemAvaliacao } = useAtualizarDescricaoItemAvaliativoRecebimento(empresaId)

  const submitItensAvaliativosRecebimento = async (formulario: ItemAvaliativoRecebimentoFormType) => {
    await atualizacaoItemAvaliacao(formulario)
  }

  return (
    <Form {...formItemAvaliatiosRecebimento}>
      <form className="space-y-2" onSubmit={formItemAvaliatiosRecebimento.handleSubmit(submitItensAvaliativosRecebimento)}>
        
        <FormField
          control={formItemAvaliatiosRecebimento.control}
          name={'descricao'}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Descrição do item" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => {
                formItemAvaliatiosRecebimento.reset()
              }}
              className="shadow-md text-sm uppercase leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="shadow-md text-sm uppercase leading-none rounded"
            disabled={formItemAvaliatiosRecebimento.formState.isSubmitting}
          >
            {formItemAvaliatiosRecebimento.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
