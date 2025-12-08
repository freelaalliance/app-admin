// Tipos para exclusão em lote por empresa

export interface ExclusaoLoteRequest {
  empresaId: string; // UUID
}

export interface ExclusaoLoteResponse {
  status: boolean;
  msg: string;
}

// Tipos específicos por módulo (seguindo API-EXCLUSAO-LOGICA.md)
export type ModuloExclusao =
  | 'calibracao'
  | 'compras'
  | 'compras-fornecedores'
  | 'manutencao'
  | 'rh'
  | 'rh-colaboradores'
  | 'expedicao'
  | 'vendas'
  | 'documentos'
  | 'clientes';

export interface ConfiguracaoExclusaoModulo {
  modulo: ModuloExclusao;
  endpoint: string;
  nomeExibicao: string;
  descricaoAcao: string; // Texto para o AlertDialog
}
