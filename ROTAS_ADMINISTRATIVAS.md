# Rotas Administrativas - ERP API

Documentação completa de todas as rotas dos controllers administrativos do sistema ERP.

---

## 📋 Índice

1. [Calibração](#calibração)
2. [Compras - Admin](#compras---admin)
3. [Compras - Recebimento](#compras---recebimento)
4. [Documentos](#documentos)
5. [Empresa](#empresa)
6. [Expedição](#expedição)
7. [Manutenção](#manutenção)
8. [Perfil](#perfil)
9. [Recebimentos](#recebimentos)
10. [RH (Recursos Humanos)](#rh-recursos-humanos)
11. [Usuário](#usuário)
12. [Vendas](#vendas)

---

## Calibração

**Prefix:** `/admin/calibracao`

### GET `/empresas/:empresaId/agenda`
Busca a agenda de calibrações de instrumentos de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Dados da agenda de calibração
}>
```

---

### GET `/empresas/:empresaId/calibracoes`
Lista todas as calibrações de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
Array<{
  calibracao: {
    id: string
    numeroCertificado: string
    erroEncontrado: number
    incertezaTendenciaEncontrado: number
    toleranciaEstabelicida: number
    certificado: string | null
    observacao: string | null
    status: string
    realizadoEm: Date
    usuarioId: string
    usuarioNome: string
  }
  instrumento: {
    id: string
    codigo: string
    nome: string
    localizacao: string
    marca: string
    resolucao: number
    frequencia: number
    repeticao: number
  }
}>
```

---

### GET `/empresas/:empresaId/estatisticas`
Recupera estatísticas de instrumentos e calibrações de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  quantidadeCalibracoesAprovadas: number
  quantidadeCalibracoesReprovadas: number
  quantidadeInstrumentosEmpresa: number
  quantidadeInstrumentosCadastradoAtual: number
  calibracoesVencido: number
  calibracoesVencendo: number
  calibracoesDentroPrazo: number
}
```

---

### GET `/empresas/:empresaId/historico/:id`
Recupera o histórico de calibrações de um instrumento específico.

**Params:**
```typescript
{
  empresaId: string (uuid)
  id: string (uuid) // ID do instrumento
}
```

**Response:**
```typescript
{
  id: string
  codigo: string
  nome: string
  marca: string
  localizacao: string
  frequencia: number
  repeticao: number
  calibracoes: Array<{
    id: string
    numeroCertificado: string
    erroEncontrado: number
    incertezaTendenciaEncontrado: number
    toleranciaEstabelicida: number
    certificado: string | null
    observacao: string | null
    status: string
    realizadoEm: Date
    usuarioUltimaAlteracao: string
  }>
}
```

---

## Compras - Admin

**Prefix:** `/admin/compras`

### GET `/empresas/:empresaId/fornecedor/resumo`
Retorna resumo estatístico dos fornecedores de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  // Estatísticas de fornecedores
}
```

---

### GET `/empresas/:empresaId/resumo`
Retorna resumo estatístico das compras de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  // Estatísticas de compras
}
```

---

### GET `/empresas/:empresaId/pedidos`
Lista todos os pedidos de compra de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Query:**
```typescript
{
  dataInicial?: Date (coerce)
  dataFinal?: Date (coerce)
}
```

**Response:**
```typescript
Array<{
  id: string
  numPedido: string
  codigo: string
  permiteEntregaParcial: boolean
  prazoEntrega: Date
  condicoesEntrega: string
  recebido: boolean
  cancelado: boolean
  cadastro: {
    usuario: string
    dataCadastro: Date
  }
  fornecedor: {
    id: string
    nome: string
    documento: string
  }
}>
```

---

## Compras - Recebimento

**Prefix:** `/admin/compras/recebimento/avaliacao`

### POST `/empresa/:empresaId`
Cadastra novos itens de avaliação de recebimento para uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Body:**
```typescript
{
  itens: Array<{
    descricao: string
  }>
}
```

**Response:** `201 Created`

---

### GET `/empresa/:empresaId`
Lista os itens de avaliação de recebimento de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Itens de avaliação de recebimento
}>
```

---

### PATCH `/:id/descricao`
Atualiza a descrição de um item de avaliação.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  descricao: string
}
```

**Response:** `200 OK`

---

### PATCH `/:id/status`
Atualiza o status (ativo/inativo) de um item de avaliação.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  ativo: boolean (coerce)
}
```

**Response:** `200 OK`

---

## Documentos

**Prefix:** `/admin/documentos`

### GET `/empresas/:empresaId`
Lista todos os documentos de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
Array<{
  id: string
  nome: string
  descricaoDocumento: string
  copias: string
  recuperacao: string
  elegibilidade: string
  disposicao: string
  retencao: string
  uso: string
  categoriaDocumentoNome: string
  empresaId: string
  revisoes: Array<{
    id: string
    numeroRevisao: number
    revisadoEm: Date
    arquivoId: string
    arquivoNome: string
    arquivoUrl: string
    usuario: string
  }>
}>
```

---

### GET `/empresas/:empresaId/categorias`
Lista as categorias de documentos de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Categorias de documentos
}>
```

---

### GET `/empresas/:empresaId/permissoes/usuarios`
Lista os usuários com acesso ao módulo de documentos.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
Array<{
  id: string
  nome: string
  email: string
}>
```

---

## Empresa

**Prefix:** `/api/admin/empresa`

### POST `/`
Cadastra uma nova empresa no sistema.

**Body:**
```typescript
{
  nome: string (min: 1)
  cnpj: string (min: 14, max: 18)
  logradouro: string (min: 1)
  numero: string (min: 1)
  bairro: string (min: 1)
  cidade: string (min: 1)
  estado: string (min: 1)
  cep: string (min: 8, max: 9)
  complemento?: string
}
```

**Response:** `201 Created` ou `400 Bad Request`

---

### DELETE `/:id`
Exclui uma empresa do sistema.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:** `202 Accepted` ou `400 Bad Request`

---

### GET `/all`
Lista todas as empresas cadastradas.

**Response:**
```typescript
Array<{
  id: string
  nome: string
  idPessoa: string
  cnpj: string
  idEndereco?: string
  logradouro?: string
  numero?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
  complemento?: string
}>
```

---

### PUT `/:id`
Altera os dados de uma empresa.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  idPessoa: string (uuid)
  idEndereco: string (uuid)
  nome: string (min: 1)
  cnpj: string (min: 14, max: 18)
  logradouro: string (min: 1)
  numero: string (min: 1)
  bairro: string (min: 1)
  cidade: string (min: 1)
  estado: string (min: 1)
  cep: string (min: 8, max: 9)
  complemento?: string
}
```

**Response:** `202 Accepted` ou `400 Bad Request`

---

### POST `/:id/vincular/modulo`
Vincula um módulo a uma empresa.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  idModulo: string (uuid)
}
```

**Response:** `201 Created` ou `400 Bad Request`

---

### DELETE `/:id/desvincular/modulo`
Desvincula módulos de uma empresa.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
Array<{
  idModulo: string (uuid)
}>
```

**Response:** `200 OK`

---

### GET `/:id/modulos`
Lista os módulos vinculados a uma empresa.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Módulos vinculados
}>
```

---

### GET `/:id/perfis`
Lista os perfis de uma empresa.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Perfis da empresa
}>
```

---

### GET `/:id/usuarios`
Lista os usuários de uma empresa.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:**
```typescript
Array<{
  id: string
  nome: string
  status: 'ativo' | 'desativado'
  email: string
  perfil: string
}>
```

---

## Expedição

**Prefix:** `/admin/expedicao`

### GET `/empresas/:empresaId`
Lista todas as expedições de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: Array<{
    id: string
    expedidoEm: Date
    venda: {
      id: string
      numeroVenda: number
      cliente: {
        nome: string
      }
    }
    usuario: string
    avaliacaoExpedicao: any
  }>
}
```

---

### GET `/empresas/:empresaId/resumo`
Retorna resumo estatístico das expedições.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: {
    // Resumo de expedições
  }
}
```

---

### GET `/empresas/:empresaId/media-avaliacao`
Retorna a média de avaliações das expedições.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: {
    media: number
  }
}
```

---

## Manutenção

**Prefix:** `/admin/manutencao`

### GET `/empresas/:empresaId/equipamento/:idEquipamento`
Lista as manutenções de um equipamento específico.

**Params:**
```typescript
{
  empresaId: string (uuid)
  idEquipamento: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Manutenções do equipamento
}>
```

---

### GET `/empresas/:empresaId/equipamento/:idEquipamento/duracao`
Busca as durações das manutenções de um equipamento.

**Params:**
```typescript
{
  empresaId: string (uuid)
  idEquipamento: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Durações das manutenções
}>
```

---

### GET `/empresas/:empresaId/estatisticas/status`
Retorna estatísticas de status dos equipamentos.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  qtd_equipamentos_parados: number
  qtd_equipamentos_funcionando: number
}
```

---

### GET `/empresas/:empresaId/estatisticas`
Retorna estatísticas gerais de manutenções.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  qtd_equipamentos_manutencao_em_dia: number
  media_duracao: number
  total_duracao_manutencoes: number
  qtd_manutencoes_realizadas: number
}
```

---

### GET `/empresas/:empresaId/indicadores/equipamento`
Retorna indicadores de manutenção de um equipamento específico.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Query:**
```typescript
{
  equipamentoId?: string (uuid)
}
```

**Response:**
```typescript
{
  total_tempo_parado: number
  qtd_manutencoes: number
  total_tempo_operacao: number
}
```

---

### GET `/empresas/:empresaId/indicadores/equipamentos`
Retorna indicadores de manutenção de todos os equipamentos da empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
Array<{
  nome: string
  total_tempo_parado: number
  qtd_manutencoes: number
  total_tempo_operacao: number
}>
```

---

## Perfil

**Prefix:** `/admin/perfil`

### POST `/`
Cria um novo perfil de acesso.

**Body:**
```typescript
{
  nome: string (min: 1)
  administrativo: boolean (default: false)
  empresa: string (uuid)
}
```

**Response:** `201 Created` ou `400 Bad Request`

---

### PUT `/:id`
Atualiza os dados de um perfil.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  nome: string (min: 1)
  administrativo: boolean (default: false)
}
```

**Response:** `200 OK` ou `400 Bad Request`

---

### GET `/:id`
Busca os dados de um perfil específico.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:**
```typescript
{
  id: string
  nome: string
  administrativo: boolean
}
```

---

### GET `/:id/permissoes`
Lista as permissões/funções vinculadas a um perfil.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:**
```typescript
Array<{
  // Funções/permissões do perfil
}>
```

---

### DELETE `/:id`
Exclui um perfil.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:** `200 OK` ou `400 Bad Request`

---

### POST `/:id/vincular/funcao`
Vincula funções/permissões a um perfil.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
Array<{
  idFuncao: string (uuid)
}>
```

**Response:** `201 Created`

---

### DELETE `/:id/remover/funcao`
Remove funções/permissões de um perfil.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
Array<{
  idFuncao: string (uuid)
}>
```

**Response:** `200 OK`

---

## Recebimentos

**Prefix:** `/admin/recebimentos`

### GET `/empresas/:empresaId`
Consulta dados de recebimentos de uma empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Query:**
```typescript
{
  dataInicial?: Date (coerce)
  dataFinal?: Date (coerce)
}
```

**Response:**
```typescript
{
  estatisticasRecebimentos: {
    // Estatísticas de recebimento
  }
  recebimentos: Array<{
    // Lista de recebimentos
  }>
}
```

---

## RH (Recursos Humanos)

**Prefix:** `/admin/rh`

### GET `/empresas/:empresaId/analytics/colaboradores`
Retorna analytics de colaboradores da empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: {
    // Analytics de colaboradores
  }
}
```

---

### GET `/empresas/:empresaId/analytics/rotatividade`
Retorna analytics de rotatividade de colaboradores.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Query:**
```typescript
{
  periodo?: 'mes' | 'trimestre' | 'semestre' | 'anual' (default: 'mes')
}
```

**Response:**
```typescript
{
  status: boolean
  dados: {
    // Analytics de rotatividade
    periodo: string
    dataInicio: Date
    dataFim: Date
  }
}
```

---

### GET `/empresas/:empresaId/analytics/treinamentos`
Retorna analytics de treinamentos.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: {
    // Analytics de treinamentos
  }
}
```

---

### GET `/empresas/:empresaId/analytics/colaboradores-por-cargo`
Retorna distribuição de colaboradores por cargo.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: Array<{
    // Colaboradores agrupados por cargo
  }>
}
```

---

### GET `/empresas/:empresaId/colaboradores/ativos`
Lista colaboradores ativos da empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: Array<{
    id: string
    admitidoEm: Date
    demitidoEm: Date | null
    colaborador: {
      id: string
      documento: string
      nome: string
      email: string | null
      telefone: string | null
    }
    cargo: {
      nome: string
    }
  }>
}
```

---

### GET `/empresas/:empresaId/colaboradores/demitidos`
Lista colaboradores demitidos da empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: Array<{
    id: string
    admitidoEm: Date
    demitidoEm: Date | null
    colaborador: {
      id: string
      documento: string
      nome: string
      email: string | null
      telefone: string | null
    }
    cargo: {
      nome: string
    }
  }>
}
```

---

### GET `/empresas/:empresaId/colaboradores/em-treinamento`
Lista colaboradores em treinamento.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: Array<{
    id: string
    iniciadoEm: Date
    colaborador: {
      nome: string
      documento: string
    }
    cargo: {
      nome: string
    }
    treinamento: {
      id: string
      nome: string
      tipo: string
    }
  }>
}
```

---

## Usuário

**Prefix:** `/admin/usuarios`

### POST `/`
Cria um novo usuário no sistema.

**Body:**
```typescript
{
  nome: string (min: 1)
  email: string (email format)
  senha: string (min: 1)
  empresa: string (uuid)
  perfil: string (uuid)
}
```

**Response:** `201 Created` ou `400 Bad Request`

---

### PUT `/:id`
Edita os dados de um usuário.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  nome: string (min: 1)
  email: string (email format)
  perfil: string (uuid)
}
```

**Response:** `200 OK` ou `400 Bad Request`

---

### PATCH `/:id/status`
Altera o status (ativo/inativo) de um usuário.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  status: boolean (default: true)
}
```

**Response:** `200 OK` ou `400 Bad Request`

---

### PATCH `/:id/senha`
Modifica a senha de um usuário.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Body:**
```typescript
{
  novaSenha: string (min: 8, regex: maiúscula + minúscula + especial)
  senhaAntiga: string (min: 8)
}
```

**Response:** `200 OK` ou `406 Not Acceptable`

---

### GET `/:id`
Busca os dados de um usuário específico.

**Params:**
```typescript
{
  id: string (uuid)
}
```

**Response:**
```typescript
{
  usuario: {
    id: string
    status: boolean
    email: string
    perfil: string
    empresa: string
  }
  pessoa: {
    nome: string
  }
}
```

---

## Vendas

**Prefix:** `/admin/vendas`

### GET `/empresas/:empresaId/cliente-top`
Retorna o cliente com mais vendas na empresa.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  msg: string
  dados: {
    totalVendas: number
    cliente: string
  } | null
}
```

---

### GET `/empresas/:empresaId/produto-top`
Retorna o produto/serviço mais vendido.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  msg: string
  dados: {
    totalVendido: number
    nome: string
  } | null
}
```

---

### GET `/empresas/:empresaId/clientes/total`
Retorna o total de clientes cadastrados.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: {
    totalClientes: number
  }
}
```

---

### GET `/empresas/:empresaId/produtos/total`
Retorna o total de produtos/serviços cadastrados.

**Params:**
```typescript
{
  empresaId: string (uuid)
}
```

**Response:**
```typescript
{
  status: boolean
  dados: {
    totalProdutos: number
  }
}
```

---

## 📝 Observações Gerais

### Padrões de Validação
- Todos os UUIDs são validados usando `z.string().uuid()`
- Datas podem ser coercidas usando `z.coerce.date()`
- Strings com tamanho mínimo usam `z.string().min(n)`
- E-mails são validados com `z.string().email()`

### Códigos de Status HTTP
- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `202 Accepted` - Requisição aceita para processamento
- `400 Bad Request` - Erro de validação ou dados inválidos
- `404 Not Found` - Recurso não encontrado
- `406 Not Acceptable` - Requisição não aceita (ex: senha incorreta)
- `500 Internal Server Error` - Erro interno do servidor

### Padrão de Resposta
A maioria das rotas segue o padrão:
```typescript
{
  status: boolean,
  msg?: string,
  dados?: any
}
```

---

**Última atualização:** 05/10/2025
