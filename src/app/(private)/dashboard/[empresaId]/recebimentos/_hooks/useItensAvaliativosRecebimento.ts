// Custom hooks para itens avaliativos de recebimento
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  buscarItensAvaliativosRecebimentoEmpresa,
  cadastrarItensAvaliativosRecebimento,
  atualizarDescricaoItemAvaliativosRecebimento,
  atualizarStatusItemAvaliativosRecebimento,
} from '../_api/itensAvaliativosRecebimento'
import { ItensAvaliativoRecebimentoFormType } from '../_components/forms/cadastro-itens-avaliativos-recebimento'
import { ItemAvaliativoRecebimentoFormType } from '../_components/forms/atualizacao-item-avaliativo-recebimento'
import { AtualizarStatusItemAvaliacaoRecebimentoType } from '../_api/itensAvaliativosRecebimento'

// Query Keys Factory
const itensAvaliativosRecebimentoKeys = {
  all: ['itens-avaliativos-recebimento'] as const,
  lists: () => [...itensAvaliativosRecebimentoKeys.all, 'list'] as const,
  list: (empresaId: string) =>
    [...itensAvaliativosRecebimentoKeys.lists(), empresaId] as const,
}

// Hook para buscar itens avaliativos da empresa
export function useItensAvaliativosRecebimento(empresaId: string | undefined) {
  return useQuery({
    queryKey: itensAvaliativosRecebimentoKeys.list(empresaId ?? ''),
    queryFn: () => buscarItensAvaliativosRecebimentoEmpresa(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para cadastrar itens avaliativos
export function useCadastrarItensAvaliativosRecebimento() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ItensAvaliativoRecebimentoFormType) =>
      cadastrarItensAvaliativosRecebimento(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosRecebimentoKeys.list(variables.empresaId),
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
export function useAtualizarDescricaoItemAvaliativoRecebimento(
  empresaId: string
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ItemAvaliativoRecebimentoFormType) =>
      atualizarDescricaoItemAvaliativosRecebimento(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosRecebimentoKeys.list(empresaId),
      })
      toast.success('Descrição atualizada com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao atualizar descrição:', error)
      toast.error('Erro ao atualizar descrição. Tente novamente.')
    },
  })
}

// Hook para atualizar status de item avaliativo
export function useAtualizarStatusItemAvaliativoRecebimento(
  empresaId: string
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AtualizarStatusItemAvaliacaoRecebimentoType) =>
      atualizarStatusItemAvaliativosRecebimento(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosRecebimentoKeys.list(empresaId),
      })
      toast.success('Status atualizado com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status. Tente novamente.')
    },
  })
}

// Hook para invalidar queries de itens avaliativos
export function useInvalidateItensAvaliativosRecebimento() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosRecebimentoKeys.all,
      }),
    invalidateLista: (empresaId: string) =>
      queryClient.invalidateQueries({
        queryKey: itensAvaliativosRecebimentoKeys.list(empresaId),
      }),
  }
}
