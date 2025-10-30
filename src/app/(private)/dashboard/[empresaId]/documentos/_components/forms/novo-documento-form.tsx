'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { addYears, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { deleteFile } from '../../_actions/upload-actions'
import UploadForm from '@/components/ui/upload-documentos'
import { UsuarioType } from '@/hooks/_empresas/_types/usuarioTypes'
import { Categoria } from '../../_types/documentosTypes'
import { useSetDocumento } from '../../_hooks/useDocumentosData'

const schemaNovoDocumentoForm = z.object({
  nome: z.string({
    required_error: 'Codigo do documento é obrigatório',
  }),
  descricaoDocumento: z.string({
    required_error: 'Descrição do documento é obrigatória',
  }),
  copias: z.coerce
    .number({
      required_error: 'Campo de cópias é obrigatório',
      invalid_type_error: 'Campo de cópias deve ser um número',
    })
    .refine(value => value >= 0, {
      message: 'O número de cópias não pode ser negativo',
    })
    .default(0),
  recuperacao: z.string({
    required_error: 'Campo de recuperação é obrigatório',
  }),
  elegibilidade: z.string({
    required_error: 'Campo de elegibilidade é obrigatório',
  }),
  disposicao: z.string({
    required_error: 'Campo de disposição é obrigatório',
  }),
  retencao: z.coerce.date(),
  uso: z.string({
    required_error: 'Campo uso é obrigatório',
  }),
  categoriaDocumento: z
    .string({
      required_error: 'Campo categoria é obrigatório',
    })
    .uuid(),
  usuariosAcessos: z
    .array(
      z.object({
        id: z.string().uuid(),
        nome: z.string(),
        email: z.string().email(),
      })
    )
    .default([]),
  arquivo: z.string(),
  empresaId: z.string().uuid().optional(),
})

export type NovoDocumentoFormType = z.infer<typeof schemaNovoDocumentoForm>

export interface NovoDocumentoFormProps {
  listaUsuarios: Omit<UsuarioType, 'perfil'>[]
  listaCategoriasDocumentos: Array<Categoria>
  empresaId?: string
}

const keyNovoArquivoDocumento = crypto.randomUUID()

export function NovoDocumentoForm({
  listaUsuarios,
  listaCategoriasDocumentos,
  empresaId,
}: NovoDocumentoFormProps) {

  const [arquivoSelecionado, selecionarArquivo] = useState<boolean>(false)

  const formNovoDocumento = useForm<NovoDocumentoFormType>({
    resolver: zodResolver(schemaNovoDocumentoForm),
    defaultValues: {
      copias: 0,
      retencao: addYears(new Date(), 5),
      usuariosAcessos: [],
      arquivo: keyNovoArquivoDocumento,
      empresaId,
    },
    mode: 'onChange',
  })

  const {
    fields: usuarios,
    append: adicionarUsuario,
    remove: removerUsuario,
  } = useFieldArray({
    control: formNovoDocumento.control,
    name: 'usuariosAcessos',
  })

  const { mutateAsync: salvarDocumentos } = useSetDocumento(empresaId || '')

  const cancelar = async () => {
    if(arquivoSelecionado) await deleteFile(keyNovoArquivoDocumento)
    formNovoDocumento.reset()
  }

  const handleSubmit = async (data: NovoDocumentoFormType) => {
    if (!arquivoSelecionado) {
      toast.error('Por favor, selecione um arquivo para fazer o upload.')
      return
    }

    console.log("📝 Dados do documento sendo enviados para o backend:")
    console.log("   - arquivo (UUID):", data.arquivo)
    console.log("   - keyNovoArquivoDocumento (gerado no form):", keyNovoArquivoDocumento)
    console.log("   - IMPORTANTE: O backend DEVE salvar este UUID no campo 'arquivoId'")

    await salvarDocumentos(data)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const copias = useMemo(() => {
    return formNovoDocumento.getValues('copias')
  }, [formNovoDocumento.watch('copias')])

  return (
    <Form {...formNovoDocumento}>
      <form className="space-y-4" onSubmit={formNovoDocumento.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={formNovoDocumento.control}
              name={'nome'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código do documento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNovoDocumento.control}
              name={'descricaoDocumento'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do documento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={formNovoDocumento.control}
              name={'recuperacao'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recuperação</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNovoDocumento.control}
              name={'elegibilidade'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preservação de legibilidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNovoDocumento.control}
              name={'disposicao'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disposição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={formNovoDocumento.control}
              name={'retencao'}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-[0.5px] mt-[9.2px]">
                    {'Retenção (Validade)'}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          disabled
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Selecione</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date <= new Date()}
                        locale={ptBR}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNovoDocumento.control}
              name={'uso'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uso</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formNovoDocumento.control}
              name={'categoriaDocumento'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria do documento</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listaCategoriasDocumentos.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={formNovoDocumento.control}
                name={'copias'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cópias</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formNovoDocumento.control}
                name={'usuariosAcessos'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuários com acesso</FormLabel>
                    <FormControl>
                      <Select
                        disabled={
                          Number(copias) === 0 ||
                          usuarios.length >= Number(copias)
                        }
                        onValueChange={value => {
                          const usuarioSelecionado = listaUsuarios.find(
                            usuario => usuario.id === value
                          )
                          if (
                            usuarioSelecionado &&
                            !field.value.some(
                              usuario => usuario.id === usuarioSelecionado.id
                            )
                          ) {
                            adicionarUsuario(usuarioSelecionado)
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Selecione os usuários" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listaUsuarios.map(usuario => (
                            <SelectItem key={usuario.id} value={usuario.id}>
                              {usuario.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="min-w-full max-w-[971px] mx-auto p-4 border rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Usuários que terá acesso ao documento
              </h2>

              {usuarios.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum usuário selecionado
                </p>
              ) : (
                <div className="flex flex-row overflow-x-auto pb-2">
                  <ul className="flex flex-nowrap gap-3 min-w-max">
                    {usuarios.map((usuario, index) => (
                      <li
                        key={usuario.id}
                        className="flex items-center p-2 rounded-md hover:bg-muted group relative border shrink-0"
                      >
                        <div className="flex items-center gap-2">
                          <div className="max-w-[120px]">
                            <p className="font-medium text-sm truncate">
                              {usuario.nome}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {usuario.email}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 h-6 w-6"
                          onClick={() => removerUsuario(index)}
                          aria-label={`Remover ${usuario.nome}`}
                        >
                          <X className="size-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <UploadForm keyArquivo={keyNovoArquivoDocumento} arquivoSelecionado={selecionarArquivo} />
        </div>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button
              type="button"
              variant={'secondary'}
              onClick={cancelar}
              className="shadow-md text-sm uppercase leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="shadow-md text-sm uppercase leading-none rounded "
            disabled={formNovoDocumento.formState.isSubmitting}
          >
            {formNovoDocumento.formState.isSubmitting ? 'Salvando documento...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
