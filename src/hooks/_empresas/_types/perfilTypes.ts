export interface PerfilEmpresa {
  nome: string;
  id: string;
  administrativo: boolean;
  empresaId: string;
}

export interface CreatePerfilData {
  nome: string
  administrativo: boolean
  empresa: string
}

export interface UpdatePerfilData {
  nome: string
  administrativo: boolean
}

export interface PerfilPermissao {
  idFuncao: string
}

export type PermissaoPerfilType = {
  nome: string;
  id: string;
  url?: string;
  moduloId?: string;
  moduloNome: string;
}
