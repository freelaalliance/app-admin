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

import { FormularioNovoUsuarioType, schemaFormularioNovoUsuario } from '@/hooks/_empresas/_types/usuarioTypes'
import { useCreateUsuario, usePerfisEmpresa } from '@/hooks/_empresas/_hooks/useAdminData'


interface FormularioNovoUsuarioProps {
  idEmpresa: string
}

export function NovoUsuarioForm({ idEmpresa }: FormularioNovoUsuarioProps) {
  const { data: listaPerfis, isFetching: carregandoPerfisEmpresa } = usePerfisEmpresa(idEmpresa)

  const formNovoUsuario = useForm<FormularioNovoUsuarioType>({
    resolver: zodResolver(schemaFormularioNovoUsuario),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      perfil: '',
      empresa: idEmpresa,
    },
    mode: 'onChange',
  })

  const criarUsuario = useCreateUsuario()

  async function salvarDadosUsuario(data: FormularioNovoUsuarioType) {
    await criarUsuario.mutateAsync(data)
  }

  return (
    <Form {...formNovoUsuario}>
      <form
        className="space-y-4"
        onSubmit={formNovoUsuario.handleSubmit(salvarDadosUsuario)}
      >
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={formNovoUsuario.control}
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
            control={formNovoUsuario.control}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={formNovoUsuario.control}
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
            control={formNovoUsuario.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha inicial do usuário</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    type="password"
                    placeholder="Nova senha"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
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
              onClick={() => formNovoUsuario.reset()}
              className="shadow-md text-sm uppercase leading-none rounded"
              data-dialog-close
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="shadow-md text-sm uppercase leading-none rounded"
            type="submit"
            disabled={formNovoUsuario.formState.isSubmitting }
          >
            {formNovoUsuario.formState.isSubmitting ? (
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
