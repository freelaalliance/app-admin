import { axiosInstance } from '@/lib/axios';
import { ExclusaoLoteResponse } from '@/types/exclusao-lote';

/**
 * Serviços de API para exclusão em lote por empresa
 * Baseado em API-EXCLUSAO-LOGICA.md
 */

// Calibração
export const excluirCalibracoesEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/calibracao/empresa/${empresaId}`
  );
  return response.data;
};

// Compras
export const excluirComprasEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/compras/empresa/${empresaId}`
  );
  return response.data;
};

// Compras - Fornecedores
export const excluirFornecedoresEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/compras/fornecedor/empresa/${empresaId}`
  );
  return response.data;
};

// Manutenção
export const cancelarManutencoesEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/manutencao/empresa/${empresaId}`
  );
  return response.data;
};

// RH - Cargos
export const excluirCargosEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/rh/cargo/empresa/${empresaId}`
  );
  return response.data;
};

// RH - Colaboradores
export const excluirColaboradoresEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/rh/colaborador/empresa/${empresaId}`
  );
  return response.data;
};

// Expedição - Itens de Avaliação
export const excluirItensAvaliacaoExpedicaoEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/expedicao/item-avaliacao/empresa/${empresaId}`
  );
  return response.data;
};

// Vendas
export const cancelarVendasEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/vendas/empresa/${empresaId}`
  );
  return response.data;
};

// Documentos
export const excluirDocumentosEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/documentos/empresa/${empresaId}`
  );
  return response.data;
};

// Clientes
export const excluirClientesEmpresa = async (
  empresaId: string
): Promise<ExclusaoLoteResponse> => {
  const response = await axiosInstance.delete<ExclusaoLoteResponse>(
    `/admin/cliente/empresa/${empresaId}`
  );
  return response.data;
};
