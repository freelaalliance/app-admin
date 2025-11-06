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
import { useCadastrarItensAvaliativosRecebimento } from '../../_hooks/useItensAvaliativosRecebimento'

const schemaItensAvaliativosForm = z.object({
  empresaId: z.string().uuid(),
  itens: z.array(
    z.object({
      descricao: z.string({
        required_error: 'Obrigatório adicionar a descrição do item',
      }),
    })
  ),
})

export type ItensAvaliativoRecebimentoFormType = z.infer<
  typeof schemaItensAvaliativosForm
>

export interface CadastroItensAvaliativoRecebimentoFormProps {
  empresaId: string
}

export function CadastroItensAvaliativoRecebimentoForm({
  empresaId,
}: CadastroItensAvaliativoRecebimentoFormProps) {

  const queryClient = useQueryClient()
  const formItensAvaliatiosRecebimento =
    useForm<ItensAvaliativoRecebimentoFormType>({
      resolver: zodResolver(schemaItensAvaliativosForm),
      defaultValues: {
        empresaId,
        itens: [
          {
            descricao: '',
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
    control: formItensAvaliatiosRecebimento.control,
    name: 'itens',
  })

  const { mutateAsync: novoPedido } = useCadastrarItensAvaliativosRecebimento()

  const submitItensAvaliativosRecebimento = async (formulario: ItensAvaliativoRecebimentoFormType) => {
    await novoPedido(formulario)
  }

  return (
    <Form {...formItensAvaliatiosRecebimento}>
      <form className="space-y-2" onSubmit={formItensAvaliatiosRecebimento.handleSubmit(submitItensAvaliativosRecebimento)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              className="flex-1 w-full shadow px-4 gap-2 items-center"
              onClick={() =>
                adicionarItem({
                  descricao: '',
                })
              }
            >
              <Plus className="size-4" />
              {"Adicionar novo item"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Adicione um novo item avaliativo de recebimento</TooltipContent>
        </Tooltip>
        <ScrollArea className="max-h-[150px] md:max-h-96 overflow-auto border rounded-lg">
          {itens.map((item, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="flex flex-col px-2 py-2 gap-2"
            >
              <div className="flex flex-row justify-between gap-2">
                <FormField
                  key={`${item.id}-descricao`}
                  control={formItensAvaliatiosRecebimento.control}
                  name={`itens.${index}.descricao`}
                  render={({ field }) => (
                    <FormItem className='w-full'>
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
                formItensAvaliatiosRecebimento.reset()
              }}
              className="shadow-md text-sm uppercase leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="shadow-md text-sm uppercase leading-none rounded "
            disabled={formItensAvaliatiosRecebimento.formState.isSubmitting}
          >
            {formItensAvaliatiosRecebimento.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
