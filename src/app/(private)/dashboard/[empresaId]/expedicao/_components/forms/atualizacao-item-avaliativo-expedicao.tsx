'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useAtualizarItemAvaliativo } from '../../_hooks/useItensAvaliativosExpedicao'

const schemaAtualizacaoItemAvaliativoExpedicao = z.object({
  id: z.coerce.number(),
  pergunta: z.string({
    required_error: 'Obrigatório adicionar a descrição do item',
  }),
})

export type ItemAvaliativoExpedicaoFormType = z.infer<
  typeof schemaAtualizacaoItemAvaliativoExpedicao
>

export interface AtualizacaoItemAvaliativoExpedicaoFormProps {
  id: number
  pergunta: string
}

export function AtualizacaoItemAvaliativoExpedicaoForm({
  id,
  pergunta
}: AtualizacaoItemAvaliativoExpedicaoFormProps) {
  const params = useSearchParams()
  const empresaId = params.get('empresa') as string

  const formItemAvaliativosExpedicao =
    useForm<ItemAvaliativoExpedicaoFormType>({
      resolver: zodResolver(schemaAtualizacaoItemAvaliativoExpedicao),
      defaultValues: {
        pergunta,
        id
      },
      mode: 'onChange',
    })

  const { mutateAsync: atualizacaoItemExpedicao } = useAtualizarItemAvaliativo(empresaId)

  const submitItensAvaliativosExpedicao = async (formulario: ItemAvaliativoExpedicaoFormType) => {
    await atualizacaoItemExpedicao(formulario)
  }

  return (
    <Form {...formItemAvaliativosExpedicao}>
      <form className="space-y-2" onSubmit={formItemAvaliativosExpedicao.handleSubmit(submitItensAvaliativosExpedicao)}>
        
        <FormField
          control={formItemAvaliativosExpedicao.control}
          name={'pergunta'}
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
                formItemAvaliativosExpedicao.reset()
              }}
              className="shadow-md text-sm uppercase leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="shadow-md text-sm uppercase leading-none rounded "
            disabled={formItemAvaliativosExpedicao.formState.isSubmitting}
          >
            {formItemAvaliativosExpedicao.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
