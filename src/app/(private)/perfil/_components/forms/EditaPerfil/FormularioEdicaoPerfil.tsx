'use client'

import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogClose } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdatePerfil } from '@/hooks/_empresas/_hooks/useAdminData'

export interface FormularioEdicaoPerfilProps {
  idPerfil: string
  nomePerfil: string
  perfilAdministrativo: boolean
  idEmpresa: string
}

const schemaFormularioPerfil = z.object({
  nome: z.string(),
  administrativo: z.boolean().default(false),
  empresa: z.string(),
})

type FormularioPerfilType = z.infer<typeof schemaFormularioPerfil>

export function FormularioEdicaoPerfil({
  idPerfil,
  nomePerfil,
  perfilAdministrativo,
  idEmpresa,
}: FormularioEdicaoPerfilProps) {
  const formEdicaoPerfil = useForm<FormularioPerfilType>({
    resolver: zodResolver(schemaFormularioPerfil),
    defaultValues: {
      nome: nomePerfil,
      administrativo: perfilAdministrativo,
      empresa: idEmpresa,
    },
    mode: 'onChange',
  })

  const updatePerfil = useUpdatePerfil()

  async function salvar(data: FormularioPerfilType) {
    await updatePerfil.mutateAsync({
      id: idPerfil, data: {
        nome: data.nome,
        administrativo: data.administrativo
      },
    })
  }

  return (
    <Form {...formEdicaoPerfil}>
      <form
        className="space-y-4"
        onSubmit={formEdicaoPerfil.handleSubmit(salvar)}
      >
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={formEdicaoPerfil.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do perfil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formEdicaoPerfil.control}
            name="administrativo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Administrativo</FormLabel>
                  <FormDescription>
                    {
                      'Selecione essa opção se os usuários desse perfil terá acesso ao sistema todo'
                    }
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-2 float-right">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => formEdicaoPerfil.reset()}
              className="shadow-md text-sm uppercase leading-none rounded"
              data-dialog-close
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="shadow-md text-sm uppercase leading-none rounded"
            type="submit"
            disabled={formEdicaoPerfil.formState.isSubmitting }
          >
            {formEdicaoPerfil.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar perfil'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
