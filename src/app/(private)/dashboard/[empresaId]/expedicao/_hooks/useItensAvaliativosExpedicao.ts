// Custom hooks para itens avaliativos de expedição
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  buscarItensAvaliativosExpedicaoEmpresa,
  cadastrarItensAvaliativosExpedicao,
  atualizarDescricaoItemAvaliativosExpedicao,
  removerItemAvaliativosExpedicao,
} from '../_api/itensAvaliativoApi'
import { ItensAvaliativoExpedicaoFormType } from '../_components/forms/cadastro-itens-avaliativos-expedicao'
import { ItemAvaliativoExpedicaoFormType } from '../_components/forms/atualizacao-item-avaliativo-expedicao'
import { AtualizarStatusItemAvaliacaoExpedicaoType } from '../_api/itensAvaliativoApi'

// Query Keys Factory
const itensAvaliativosKeys = {
  all: ['itens-avaliativos-expedicao'] as const,
  lists: () => [...itensAvaliativosKeys.all, 'list'] as const,
  list: (empresaId: string) =>
    [...itensAvaliativosKeys.lists(), empresaId] as const,
}

// Hook para buscar itens avaliativos da empresa
export function useItensAvaliativosExpedicao(empresaId: string | undefined) {
  return useQuery({
    queryKey: itensAvaliativosKeys.list(empresaId ?? ''),
    queryFn: () => buscarItensAvaliativosExpedicaoEmpresa(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para cadastrar itens avaliativos
export function useCadastrarItensAvaliativos() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ItensAvaliativoExpedicaoFormType) =>
      cadastrarItensAvaliativosExpedicao(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosKeys.list(variables.empresaId),
      })
      toast.success('Itens avaliativos cadastrados com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao cadastrar itens avaliativos:', error)
      toast.error('Erro ao cadastrar itens avaliativos. Tente novamente.')
    },
  })
}

// Hook para atualizar descrição de item avaliativo
export function useAtualizarItemAvaliativo(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ItemAvaliativoExpedicaoFormType) =>
      atualizarDescricaoItemAvaliativosExpedicao(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosKeys.list(empresaId),
      })
      toast.success('Item avaliativo atualizado com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao atualizar item avaliativo:', error)
      toast.error('Erro ao atualizar item avaliativo. Tente novamente.')
    },
  })
}

// Hook para remover item avaliativo
export function useRemoverItemAvaliativo(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AtualizarStatusItemAvaliacaoExpedicaoType) =>
      removerItemAvaliativosExpedicao(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosKeys.list(empresaId),
      })
      toast.success('Item avaliativo removido com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao remover item avaliativo:', error)
      toast.error('Erro ao remover item avaliativo. Tente novamente.')
    },
  })
}

// Hook para invalidar queries de itens avaliativos
export function useInvalidateItensAvaliativos() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: itensAvaliativosKeys.all }),
    invalidateLista: (empresaId: string) =>
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosKeys.list(empresaId),
      }),
  }
}
