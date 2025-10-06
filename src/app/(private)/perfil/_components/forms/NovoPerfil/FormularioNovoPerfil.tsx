'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import z from 'zod'
import { useCreatePerfil } from '@/hooks/_empresas/_hooks/useAdminData'

interface FormularioNovoPerfilProps {
  idEmpresa: string
}

const schemaFormularioPerfil = z.object({
  nome: z.string(),
  administrativo: z.boolean().default(false),
  empresa: z.string(),
})

type FormularioPerfilType = z.infer<typeof schemaFormularioPerfil>

export function FormularioNovoPerfil({ idEmpresa }: FormularioNovoPerfilProps) {
  const formNovoPerfil = useForm<FormularioPerfilType>({
    resolver: zodResolver(schemaFormularioPerfil),
    defaultValues: {
      nome: '',
      administrativo: false,
      empresa: idEmpresa,
    },
    mode: 'onChange',
  })

  const novoPerfil = useCreatePerfil()

  const salvar = async (data: FormularioPerfilType) => {
    await novoPerfil.mutateAsync(data)
    
  }

  return (
    <Form {...formNovoPerfil}>
      <form
        className="space-y-4"
        onSubmit={formNovoPerfil.handleSubmit(salvar)}
      >
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={formNovoPerfil.control}
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
            control={formNovoPerfil.control}
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
              onClick={() => formNovoPerfil.reset()}
              className="shadow-md text-sm uppercase leading-none rounded"
              data-dialog-close
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="shadow-md text-sm uppercase leading-none rounded"
            type="submit"
            disabled={formNovoPerfil.formState.isSubmitting || novoPerfil.isPending}
          >
            {formNovoPerfil.formState.isSubmitting || novoPerfil.isPending ? (
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
