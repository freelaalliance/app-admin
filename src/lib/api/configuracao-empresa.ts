/**
 * Service para gerenciar configurações de empresas
 */

import { axiosInstance } from '../axios';
import type {
  CriarConfiguracaoRequest,
  AtualizarConfiguracaoRequest,
  ConfiguracaoResponse,
  RespostaConfiguracaoInterface,
} from '@/types/configuracao-empresa';

const BASE_PATH = '/admin/configuracao';

/**
 * Cria uma nova configuração para uma empresa
 */
export const criarConfiguracao = async (
  data: CriarConfiguracaoRequest
): Promise<RespostaConfiguracaoInterface> => {
  const response = await axiosInstance.post<RespostaConfiguracaoInterface>(
    BASE_PATH,
    data
  );
  return response.data;
};

/**
 * Busca todas as configurações de uma empresa específica
 */
export const buscarConfiguracoesPorEmpresa = async (
  empresaId: string
): Promise<ConfiguracaoResponse[]> => {
  const response = await axiosInstance.get<ConfiguracaoResponse[]>(
    `${BASE_PATH}/empresa/${empresaId}`
  );
  return response.data;
};

/**
 * Busca uma configuração específica de uma empresa pela chave
 */
export const buscarConfiguracaoPorChave = async (
  empresaId: string,
  chave: string
): Promise<ConfiguracaoResponse> => {
  const response = await axiosInstance.get<ConfiguracaoResponse>(
    `${BASE_PATH}/empresa/${empresaId}/chave/${chave}`
  );
  return response.data;
};

/**
 * Atualiza o valor de uma configuração existente
 */
export const atualizarConfiguracao = async (
  id: string,
  data: AtualizarConfiguracaoRequest
): Promise<RespostaConfiguracaoInterface> => {
  const response = await axiosInstance.put<RespostaConfiguracaoInterface>(
    `${BASE_PATH}/${id}`,
    data
  );
  return response.data;
};

/**
 * Cria ou atualiza uma configuração (helper)
 * Verifica se a configuração existe, se sim atualiza, senão cria
 */
export const criarOuAtualizarConfiguracao = async (
  empresaId: string,
  chave: string,
  valor: string
): Promise<RespostaConfiguracaoInterface> => {
  try {
    // Tenta buscar a configuração existente
    const configuracaoExistente = await buscarConfiguracaoPorChave(empresaId, chave);

    // Se encontrou, atualiza
    return await atualizarConfiguracao(configuracaoExistente.id, { valor });
  } catch (error) {
    // Se não encontrou (404), cria nova
    return await criarConfiguracao({ chave, valor, empresaId });
  }
};
