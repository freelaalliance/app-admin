import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  excluirCalibracoesEmpresa,
  excluirComprasEmpresa,
  excluirFornecedoresEmpresa,
  cancelarManutencoesEmpresa,
  excluirCargosEmpresa,
  excluirColaboradoresEmpresa,
  excluirItensAvaliacaoExpedicaoEmpresa,
  cancelarVendasEmpresa,
  excluirDocumentosEmpresa,
  excluirClientesEmpresa,
} from '@/lib/api/exclusao-lote';
import { ModuloExclusao } from '@/types/exclusao-lote';

/**
 * Hook para exclusão em lote de dados por empresa
 * Seguindo padrão do projeto com React Query v5
 */

interface ExclusaoLoteMutationParams {
  empresaId: string;
  modulo: ModuloExclusao;
}

// Mapeamento de módulos para funções de API
const moduloApiMap: Record<ModuloExclusao, (empresaId: string) => Promise<any>> = {
  calibracao: excluirCalibracoesEmpresa,
  compras: excluirComprasEmpresa,
  'compras-fornecedores': excluirFornecedoresEmpresa,
  manutencao: cancelarManutencoesEmpresa,
  rh: excluirCargosEmpresa,
  'rh-colaboradores': excluirColaboradoresEmpresa,
  expedicao: excluirItensAvaliacaoExpedicaoEmpresa,
  vendas: cancelarVendasEmpresa,
  documentos: excluirDocumentosEmpresa,
  clientes: excluirClientesEmpresa,
};

export const useExclusaoLoteDados = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ empresaId, modulo }: ExclusaoLoteMutationParams) => {
      const apiFn = moduloApiMap[modulo];
      if (!apiFn) {
        throw new Error(`Módulo ${modulo} não possui função de exclusão configurada`);
      }
      return apiFn(empresaId);
    },
    onSuccess: (data, variables) => {
      toast.success(data.msg);

      // Invalidar todas as queries relacionadas à empresa
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          // Invalida queries que contenham o empresaId ou o nome do módulo
          return queryKey.some(
            (key) =>
              key === variables.empresaId ||
              (typeof key === 'string' && key.includes(variables.modulo))
          );
        }
      });
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.msg || error.response?.data?.erro || 'Erro ao excluir dados';
      toast.error(errorMsg);
    },
  });
};
