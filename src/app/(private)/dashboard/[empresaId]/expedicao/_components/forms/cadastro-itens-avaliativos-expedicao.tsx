'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Minus, Plus } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCadastrarItensAvaliativos } from '../../_hooks/useItensAvaliativosExpedicao'

const schemaItensAvaliativosForm = z.object({
  empresaId: z.string().uuid(),
  itens: z.array(
    z.object({
      pergunta: z.string({
        required_error: 'Obrigatório adicionar a descrição do item',
      }),
    })
  ),
})

export type ItensAvaliativoExpedicaoFormType = z.infer<
  typeof schemaItensAvaliativosForm
>

export interface CadastroItensAvaliativoExpedicaoFormProps {
  empresaId: string
}

export function CadastroItensAvaliativoExpedicaoForm({
  empresaId,
}: CadastroItensAvaliativoExpedicaoFormProps) {

  const formItensAvaliativosExpedicao =
    useForm<ItensAvaliativoExpedicaoFormType>({
      resolver: zodResolver(schemaItensAvaliativosForm),
      defaultValues: {
        empresaId,
        itens: [
          {
            pergunta: '',
          },
        ],
      },
      mode: 'onChange',
    })

  const {
    fields: itens,
    append: adicionarItem,
    remove: removerItem,
  } = useFieldArray({
    control: formItensAvaliativosExpedicao.control,
    name: 'itens',
  })

  const { mutateAsync: novoItemAvaliativoExpedicao } = useCadastrarItensAvaliativos()

  const submitItensAvaliativosRecebimento = async (formulario: ItensAvaliativoExpedicaoFormType) => {
    await novoItemAvaliativoExpedicao(formulario)
  }

  return (
    <Form {...formItensAvaliativosExpedicao}>
      <form className="space-y-2" onSubmit={formItensAvaliativosExpedicao.handleSubmit(submitItensAvaliativosRecebimento)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              className="flex-1 w-full shadow px-4 gap-2 items-center"
              onClick={() =>
                adicionarItem({
                  pergunta: '',
                })
              }
            >
              <Plus className="size-4" />
              {"Adicionar novo item"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Adicione um novo item avaliativo de expedição</TooltipContent>
        </Tooltip>
        <ScrollArea className="max-h-[150px] md:max-h-96 overflow-auto border rounded-lg">
          {itens.map((item, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="flex flex-col px-2 py-2 gap-2"
            >
              <div className="flex flex-row gap-2">
                <FormField
                  key={`${item.id}-pergunta`}
                  control={formItensAvaliativosExpedicao.control}
                  name={`itens.${index}.pergunta`}
                  render={({ field }) => (
                    <FormItem className='w-full '>
                      <FormControl>
                        <Input {...field} placeholder="Descrição do item" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="shadow"
                  size={'icon'}
                  onClick={() => removerItem(index)}
                  disabled={itens.length === 1}
                >
                  <Minus className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => {
                formItensAvaliativosExpedicao.reset()
              }}
              className="shadow-md text-sm uppercase leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="shadow-md text-sm uppercase leading-none rounded "
            disabled={formItensAvaliativosExpedicao.formState.isSubmitting}
          >
            {formItensAvaliativosExpedicao.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
