/**
 * Hooks personalizados para gerenciar configurações de empresas
 * Utiliza React Query para cache e gerenciamento de estado
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type {
  CriarConfiguracaoRequest,
  AtualizarConfiguracaoRequest
} from '@/types/configuracao-empresa';
import {
  buscarConfiguracoesPorEmpresa,
  buscarConfiguracaoPorChave,
  criarConfiguracao,
  atualizarConfiguracao,
  criarOuAtualizarConfiguracao,
} from '@/lib/api/configuracao-empresa';

// Keys para o React Query
const QUERY_KEYS = {
  configuracoes: (empresaId: string) => ['configuracoes', empresaId],
  configuracao: (empresaId: string, chave: string) => [
    'configuracao',
    empresaId,
    chave,
  ],
};

/**
 * Hook para buscar todas as configurações de uma empresa
 */
export const useConfiguracoesPorEmpresa = (empresaId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.configuracoes(empresaId),
    queryFn: () => buscarConfiguracoesPorEmpresa(empresaId),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook para buscar uma configuração específica por chave
 */
export const useConfiguracaoPorChave = (empresaId: string, chave: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.configuracao(empresaId, chave),
    queryFn: () => buscarConfiguracaoPorChave(empresaId, chave),
    enabled: !!empresaId && !!chave,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false, // Não tenta novamente se retornar 404
  });
};

/**
 * Hook para criar uma nova configuração
 */
export const useCriarConfiguracao = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CriarConfiguracaoRequest) => criarConfiguracao(data),
    onSuccess: (data, variables) => {
      toast.success(data.msg || 'Configuração criada com sucesso');
      // Invalida o cache das configurações da empresa
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.configuracoes(variables.empresaId),
      });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.msg || 'Erro ao criar configuração';
      toast.error(message);
    },
  });
};

/**
 * Hook para atualizar uma configuração existente
 */
export const useAtualizarConfiguracao = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      empresaId,
    }: {
      id: string;
      data: AtualizarConfiguracaoRequest;
      empresaId: string;
    }) => atualizarConfiguracao(id, data),
    onSuccess: (data, variables) => {
      toast.success(data.msg || 'Configuração atualizada com sucesso');
      // Invalida o cache das configurações da empresa
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.configuracoes(variables.empresaId),
      });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.msg || 'Erro ao atualizar configuração';
      toast.error(message);
    },
  });
};

/**
 * Hook para criar ou atualizar uma configuração (helper)
 * Verifica se existe e decide automaticamente entre criar ou atualizar
 */
export const useCriarOuAtualizarConfiguracao = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      empresaId,
      chave,
      valor,
    }: {
      empresaId: string;
      chave: string;
      valor: string;
    }) => criarOuAtualizarConfiguracao(empresaId, chave, valor),
    onSuccess: (data, variables) => {
      toast.success(data.msg || 'Configuração salva com sucesso');
      // Invalida o cache das configurações da empresa
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.configuracoes(variables.empresaId),
      });
      // Invalida o cache da configuração específica
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.configuracao(variables.empresaId, variables.chave),
      });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.msg || 'Erro ao salvar configuração';
      toast.error(message);
    },
  });
};

/**
 * Hook helper para obter o valor de uma configuração específica
 * Retorna apenas o valor ou undefined se não existir
 */
export const useValorConfiguracao = (empresaId: string, chave: string) => {
  const { data, ...rest } = useConfiguracaoPorChave(empresaId, chave);

  return {
    valor: data?.valor,
    configuracao: data,
    ...rest,
  };
};

/**
 * Hook helper para obter múltiplas configurações como um objeto mapeado
 * Útil para acessar configurações por chave de forma mais conveniente
 */
export const useConfiguracoesMap = (empresaId: string) => {
  const { data, ...rest } = useConfiguracoesPorEmpresa(empresaId);

  const configuracoesMap = data?.reduce((acc, config) => {
    acc[config.chave] = config.valor;
    return acc;
  }, {} as Record<string, string>);

  return {
    configuracoes: configuracoesMap,
    configuracoesArray: data,
    ...rest,
  };
};
