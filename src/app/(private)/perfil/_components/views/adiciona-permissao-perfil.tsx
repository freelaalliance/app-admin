'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  useModulosEmpresa,
  useFuncoesModulo, useVincularFuncaoPerfil,
  adminKeys
} from '@/hooks/_empresas/_hooks/useAdminData'

import { PermissaoPerfilProps } from '../dialogs/DialogPermissoesPerfil'
import { DataTablePermissoesVinculadasPerfil } from '../tabela/permissoes-vinvulado-perfil/tabela-permissoes-vinculados'
import { ListaModulos } from '@/components/modulos/lista-modulos'
import { ListaFuncoes } from '@/components/modulos/lista-funcoes'
import { useQueryClient } from '@tanstack/react-query'

// Types conforme schema Zod
type PermissaoVinculadoPerfilType = {
  id: string
  nome: string
  moduloNome: string
}

export default function AdicionarPermissaoPerfil({
  idPerfil,
  idEmpresa,
}: PermissaoPerfilProps) {
  const queryClient = useQueryClient()
  const permissoesPerfil = queryClient.getQueryData<Array<PermissaoVinculadoPerfilType>>(
    adminKeys.permissoesPerfil(idPerfil)
  )
  const [permissoesVinculadasPerfil, setPermissoesVinculadasPerfil] =
    React.useState<Array<PermissaoVinculadoPerfilType>>([])

  // State para módulo e função selecionados
  const [moduloSelecionado, setModuloSelecionado] = React.useState<string | null>(null)
  const [funcaoSelecionada, setFuncaoSelecionada] = React.useState<string | null>(null)

  // Hook para buscar módulos da empresa
  const { data: modulosEmpresaData, isLoading: carregandoModulos } = useModulosEmpresa(idEmpresa)

  // Hook para buscar funções do módulo selecionado
  const { data: funcoesModuloData, isLoading: carregandoFuncoes } = useFuncoesModulo(
    moduloSelecionado ?? ''
  )

  // Hook para vincular função ao perfil
  const vincularFuncaoPerfilMutation = useVincularFuncaoPerfil()

  const listaModulos = modulosEmpresaData ?? []
  const listaFuncoes = funcoesModuloData ?? []

  const confirmarVinculos = async () => {
    if (!funcaoSelecionada) {
      toast.warning('Selecione uma função para adicionar')
      return
    }

    try {
      await vincularFuncaoPerfilMutation.mutateAsync({
        perfilId: idPerfil,
        funcoes: permissoesVinculadasPerfil.map((permissao) => ({ idFuncao: permissao.id })),
      })
      
      toast.success('Permissão adicionada com sucesso!')
      setFuncaoSelecionada(null)
    } catch (error) {
      toast.error('Erro ao adicionar permissão')
    }
  }

  const vincularPermissao = () => {
    const funcao = listaFuncoes?.find(
      funcao => funcao.id === funcaoSelecionada
    )

    const modulo = listaModulos?.find(
      modulo => modulo.id === moduloSelecionado
    )

    if (funcao && modulo) {
      if (
        permissoesVinculadasPerfil.find(permissao => permissao.id === funcao.id)
      ) {
        toast.info('Essa função já foi vinculado as permissões deste perfil')
      } else {
        setPermissoesVinculadasPerfil([
          ...permissoesVinculadasPerfil,
          {
            id: funcao?.id,
            nome: funcao?.nome,
            moduloNome: modulo?.nome,
          },
        ])
      }
    } else {
      toast.warning(
        'Necessário selecionar o módulo e a função antes de vincular'
      )
    }
  }


  const removerPermissoes = (ids: string[]) => {
    setPermissoesVinculadasPerfil((prev) =>
      prev.filter((permissao) => !ids.includes(permissao.id)),
    )
  }

  const funcoesNaoVinculados =
    listaFuncoes?.filter(funcao => {
      if (permissoesPerfil) {
        const verificaPermissaoExistente = permissoesPerfil.some(
          permissao => permissao.id === funcao.id
        )

        return !verificaPermissaoExistente
      }
      return true
    }) ?? []

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row gap-2">
          <ListaModulos
            listaModulos={listaModulos}
            buscandoModulos={carregandoModulos}
            selecionarModulo={setModuloSelecionado}
            moduloSelecionado={moduloSelecionado}
          />
          <ListaFuncoes
            listaFuncoes={funcoesNaoVinculados}
            buscandoFuncoes={carregandoFuncoes || !moduloSelecionado}
            selecionarFuncao={setFuncaoSelecionada}
            funcaoSelecionada={funcaoSelecionada}
          />
        </div>
        <Button
          title="Adicionar permissão"
          onClick={vincularPermissao}
          disabled={!funcaoSelecionada || vincularFuncaoPerfilMutation.isPending}
        >
          <Plus className="h-6 w-auto" />
          <span>Adicionar</span>
        </Button>
      </div>
      <Separator />
      <div>
        <DataTablePermissoesVinculadasPerfil
          data={permissoesVinculadasPerfil ?? []}
          aplicandoPermissoes={vincularFuncaoPerfilMutation.isPending}
          aplicarPermissoes={confirmarVinculos}
          removerPermissoes={removerPermissoes}
        />
      </div>
    </div>
  )
}
