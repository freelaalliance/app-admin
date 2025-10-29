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
import { Minus, Plus } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSetCategoria } from '../../_hooks/useDocumentosData'

const schemaCategoriasDocumentoForm = z.object({
  empresaId: z.string().uuid(),
  categorias: z.array(
    z.object({
      nome: z.string({
        required_error: 'Obrigatório adicionar a nome da categoria',
      }).trim(),
    })
  ),
})

export type CategoriaDocumentosFormType = z.infer<
  typeof schemaCategoriasDocumentoForm
>

export interface CadastroCategoriaDocumentosFormProps {
  empresaId: string
}

export function CadastroCategoriaDocumentosForm({
  empresaId,
}: CadastroCategoriaDocumentosFormProps) {

  const formCategoriaDocumentos =
    useForm<CategoriaDocumentosFormType>({
      resolver: zodResolver(schemaCategoriasDocumentoForm),
      defaultValues: {
        empresaId,
        categorias: [
          {
            nome: '',
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
    control: formCategoriaDocumentos.control,
    name: 'categorias',
  })

  const { mutateAsync: novaCategoria } = useSetCategoria(empresaId)

  const submitItensAvaliativosRecebimento = async (categorias: CategoriaDocumentosFormType) => {
    await novaCategoria(categorias)
  }

  return (
    <Form {...formCategoriaDocumentos}>
      <form className="space-y-2" onSubmit={formCategoriaDocumentos.handleSubmit(submitItensAvaliativosRecebimento)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={'secondary'}
              size={'icon'}
              className="flex shadow w-full px-4 gap-2 items-center"
              onClick={() =>
                adicionarItem({
                  nome: '',
                })
              }
            >
              <Plus className="size-4" />
              {"Adicionar nova categoria"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Adicione uma nova categoria de documentos</TooltipContent>
        </Tooltip>
        <ScrollArea className="max-h-[150px] md:max-h-96 overflow-auto border rounded-lg">
          {itens.map((item, index) => (
            <div
              key={`categoria-${item.id}`}
              className="flex flex-col md:flex-row px-2 py-2 gap-2"
            >
              <div className="flex flex-row gap-2 w-full">
                <FormField
                  key={`${item.id}-nome`}
                  control={formCategoriaDocumentos.control}
                  name={`categorias.${index}.nome`}
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input {...field} placeholder="Nome da categoria" />
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
                formCategoriaDocumentos.reset()
              }}
              className="shadow-md text-sm uppercase leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="shadow-md text-sm uppercase leading-none rounded "
            disabled={formCategoriaDocumentos.formState.isSubmitting}
          >
            {formCategoriaDocumentos.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
