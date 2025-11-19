/**
 * Tipos e interfaces para Configuração de Empresas
 */

// Request para criar configuração
export interface CriarConfiguracaoRequest {
  chave: string; // Máximo 100 caracteres
  valor: string;
  empresaId: string; // UUID formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
}

// Request para atualizar configuração
export interface AtualizarConfiguracaoRequest {
  valor: string;
}

// Response de configuração
export interface ConfiguracaoResponse {
  id: string; // UUID
  chave: string;
  valor: string;
  empresaId: string; // UUID
}

// Response padrão de operações
export interface RespostaConfiguracaoInterface {
  status: boolean;
  msg: string;
}

// Response de erro
export interface ErrorConfiguracaoResponse extends RespostaConfiguracaoInterface {
  error?: string;
}
