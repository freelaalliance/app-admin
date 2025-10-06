import { QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

/**
 * Helpers para optimistic updates em mutations
 * Usa o padrão de React Query para updates otimistas
 */

export interface OptimisticUpdateContext<T> {
  previousData?: T
}

/**
 * Cria configuração de optimistic update para uma mutation
 * @param queryClient - Cliente do React Query
 * @param queryKey - Key da query a ser atualizada
 * @param updateFn - Função que atualiza os dados otimisticamente
 */
export function createOptimisticUpdate<TData, TVariables>(
  queryClient: QueryClient,
  queryKey: unknown[],
  updateFn: (oldData: TData | undefined, variables: TVariables) => TData,
  options?: {
    successMessage?: string
    errorMessage?: string
  }
) {
  return {
    // Quando a mutation inicia, atualiza os dados otimisticamente
    onMutate: async (variables: TVariables): Promise<OptimisticUpdateContext<TData>> => {
      // Cancela queries em andamento para não sobrescrever
      await queryClient.cancelQueries({ queryKey })

      // Snapshot dos dados antigos
      const previousData = queryClient.getQueryData<TData>(queryKey)

      // Atualiza otimisticamente
      if (previousData) {
        queryClient.setQueryData<TData>(queryKey, (old) =>
          updateFn(old, variables)
        )
      }

      return { previousData }
    },

    // Se a mutation falhar, reverte para os dados antigos
    onError: (error: Error, _variables: TVariables, context?: OptimisticUpdateContext<TData>) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData)
      }

      toast.error(options?.errorMessage || 'Erro ao salvar alterações')
      console.error('Mutation error:', error)
    },

    // Quando a mutation for bem-sucedida, invalida a query para refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })

      if (options?.successMessage) {
        toast.success(options.successMessage)
      }
    },

    // Sempre executa após a mutation
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  }
}

/**
 * Exemplos de uso:
 * 
 * // Criar empresa
 * const createMutation = useMutation({
 *   mutationFn: createEmpresa,
 *   ...createOptimisticUpdate(
 *     queryClient,
 *     ['empresas'],
 *     (oldData, newEmpresa) => [...(oldData || []), newEmpresa],
 *     { successMessage: 'Empresa criada com sucesso!' }
 *   )
 * })
 * 
 * // Atualizar empresa
 * const updateMutation = useMutation({
 *   mutationFn: updateEmpresa,
 *   ...createOptimisticUpdate(
 *     queryClient,
 *     ['empresas'],
 *     (oldData, updated) => 
 *       oldData?.map(e => e.id === updated.id ? { ...e, ...updated } : e),
 *     { successMessage: 'Empresa atualizada!' }
 *   )
 * })
 * 
 * // Deletar empresa
 * const deleteMutation = useMutation({
 *   mutationFn: deleteEmpresa,
 *   ...createOptimisticUpdate(
 *     queryClient,
 *     ['empresas'],
 *     (oldData, deletedId) => oldData?.filter(e => e.id !== deletedId),
 *     { successMessage: 'Empresa removida!' }
 *   )
 * })
 */
