'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormularioEdicaoUsuarioType, schemaFormularioEdicaoUsuario, UsuarioType } from '@/hooks/_empresas/_types/usuarioTypes'
import { usePerfisEmpresa, useUpdateUsuario } from '@/hooks/_empresas/_hooks/useAdminData'

interface FormularioNovoUsuarioProps {
  dadosUsuario: UsuarioType
  idEmpresa: string
}

export function EditarUsuarioForm({
  dadosUsuario,
  idEmpresa,
}: FormularioNovoUsuarioProps) {

  const { data: listaPerfis, isFetching: carregandoPerfisEmpresa } = usePerfisEmpresa(
    idEmpresa,
  )

  const formEditUsuario = useForm<FormularioEdicaoUsuarioType>({
    resolver: zodResolver(schemaFormularioEdicaoUsuario),
    defaultValues: {
      id: dadosUsuario.id,
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      perfil: dadosUsuario.perfil,
    },
    mode: 'onChange',
  })

  const atualizaUsuario = useUpdateUsuario()

  async function salvarDadosUsuario(data: FormularioEdicaoUsuarioType) {
    await atualizaUsuario.mutateAsync({
      id: data.id,
      data
    })
  }

  return (
    <Form {...formEditUsuario}>
      <form
        className="space-y-4"
        onSubmit={formEditUsuario.handleSubmit(salvarDadosUsuario)}
      >
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={formEditUsuario.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formEditUsuario.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email do usuário</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="email"
                    placeholder="usuario@email.com.br"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formEditUsuario.control}
            name="perfil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil do usuário</FormLabel>
                <Select
                  disabled={carregandoPerfisEmpresa}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Selecione o perfil deste usuário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listaPerfis?.map((perfil) => {
                      return (
                        <SelectItem key={perfil.id} value={perfil.id}>
                          {perfil.nome}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-2 float-right">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => formEditUsuario.reset()}
              className="shadow-md text-sm uppercase leading-none rounded"
              data-dialog-close
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="shadow-md text-sm uppercase leading-none rounded"
            type="submit"
            disabled={formEditUsuario.formState.isSubmitting }
          >
            {formEditUsuario.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Usuário'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
