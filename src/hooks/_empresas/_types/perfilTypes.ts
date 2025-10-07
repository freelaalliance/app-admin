export interface Perfil {
  nome: string;
  id: string;
  administrativo: boolean;
  empresaId: string;
}

export interface PerfilEmpresa {
  perfil_id: string;
  perfil_nome: string;
  perfil_administrativo: boolean;
  empresa_id: string;
  usuarios_count?: number;
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
