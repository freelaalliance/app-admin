# ✅ Atualização de Módulos e Funções - API

**Data:** 05/10/2025  
**Status:** Concluído

---

## 📋 Alterações Realizadas

### 1. **Tipos Atualizados** (`moduloTypes.ts`)

#### Tipos de Módulos
```typescript
export interface Modulo {
  id: string      // UUID do módulo
  nome: string    // Nome do módulo
  url: string     // URL/rota do módulo
}
```

**❌ Removidos:**
- `codigo: string`
- `descricao: string`
- `icone: string`
- `status: 'ativo' | 'inativo'`

#### Novos Tipos de Funções
```typescript
export interface Funcao {
  id: string
  nome: string
  url: string
  idModulo?: string  // Referência ao módulo pai
}
```

#### DTOs para Criação/Atualização
```typescript
// Criar módulo com suas funções
export interface CreateModuloData {
  nome: string
  url: string
  funcoes: Array<{
    nome: string
    url: string
  }>
}

// Atualizar módulo
export interface UpdateModuloData {
  nome: string
  url: string
}

// Criar função
export interface CreateFuncaoData {
  nome: string
  url: string
}

// Atualizar função
export interface UpdateFuncaoData {
  nome: string
  url: string
}
```

---

### 2. **API Atualizada** (`modulosApi.ts`)

#### Novas Funções - Módulos

##### ✅ `createModulo(data: CreateModuloData)`
- **Endpoint:** `POST /modulo`
- **Retorna:** `{ id: string }`
- Cria módulo com suas funções associadas

##### ✅ `updateModulo(id: string, data: UpdateModuloData)`
- **Endpoint:** `PUT /modulo/:id`
- Atualiza nome e URL do módulo

##### ✅ `getModulos()`
- **Endpoint:** `GET /modulo/all`
- **Retorna:** `Modulo[]`
- ⚠️ **Mudança:** Agora retorna array direto, não mais `{ modulos: Modulo[] }`

##### ✅ `getModulo(id: string)`
- **Endpoint:** `GET /modulo/:id`
- **Retorna:** `Modulo`
- Busca módulo específico

##### ✅ `getFuncoesModulo(moduloId: string)`
- **Endpoint:** `GET /modulo/:id/funcoes`
- **Retorna:** `Funcao[]`
- Lista funções de um módulo

##### ✅ `createFuncaoModulo(moduloId: string, funcao: CreateFuncaoData)`
- **Endpoint:** `POST /modulo/:id/funcao`
- Adiciona função a um módulo

#### Novas Funções - Funções

##### ✅ `getFuncao(id: string)`
- **Endpoint:** `GET /funcao/:id`
- **Retorna:** `Funcao`
- Busca função específica

##### ✅ `updateFuncao(id: string, data: UpdateFuncaoData)`
- **Endpoint:** `PUT /funcao/:id`
- ⚠️ **NOTA:** Rota não está registrada no backend

---

### 3. **Hooks Atualizados** (`useAdminData.ts`)

#### Novas Query Keys
```typescript
modulo: (id: string) => [...adminKeys.all, 'modulo', id]
funcoesModulo: (moduloId: string) => [...adminKeys.all, 'funcoesModulo', moduloId]
funcao: (id: string) => [...adminKeys.all, 'funcao', id]
```

#### Novos Hooks - Módulos

##### ✅ `useModulos()`
- Lista todos os módulos
- Cache: 5 minutos

##### ✅ `useModulo(id: string)`
- Busca módulo específico
- Habilitado apenas se `id` fornecido

##### ✅ `useCreateModulo()`
- Cria novo módulo
- Invalida cache de `modulos`

##### ✅ `useUpdateModulo()`
- Atualiza módulo
- Invalida cache de `modulos` e do módulo específico

#### Novos Hooks - Funções de Módulo

##### ✅ `useFuncoesModulo(moduloId: string)`
- Lista funções de um módulo
- Habilitado apenas se `moduloId` fornecido

##### ✅ `useCreateFuncaoModulo()`
- Adiciona função a módulo
- Invalida cache de funções do módulo

#### Novos Hooks - Funções

##### ✅ `useFuncao(id: string)`
- Busca função específica
- Habilitado apenas se `id` fornecido

##### ✅ `useUpdateFuncao()`
- Atualiza função
- Invalida cache da função e lista de funções

---

### 4. **Componente Atualizado** (`ModulosTab.tsx`)

#### Mudanças

##### ✅ Removidas dependências de campos inexistentes
- `modulo.codigo` → calculado via `getModuloCodigoFromNome()`
- `modulo.descricao` → substituído por `modulo.url`
- `modulo.status` → removida validação

##### ✅ Nova função helper
```typescript
const getModuloCodigoFromNome = (nome: string): string => {
  return nome.toLowerCase().replace(/\s+/g, '-')
}
```

##### ✅ Resposta da API corrigida
```typescript
// ANTES
const modulos = modulosDisponiveis?.modulos || []

// DEPOIS
const modulos = modulosDisponiveis || []
```

---

## 🔄 Fluxo Completo de Uso

### Criar Módulo com Funções
```typescript
const createModulo = useCreateModulo()

await createModulo.mutateAsync({
  nome: "Compras",
  url: "/compras",
  funcoes: [
    { nome: "Visualizar Pedidos", url: "/compras/pedidos" },
    { nome: "Criar Pedido", url: "/compras/pedidos/novo" }
  ]
})
```

### Listar Módulos
```typescript
const { data: modulos, isLoading } = useModulos()
// modulos é Modulo[]
```

### Adicionar Função a Módulo
```typescript
const createFuncao = useCreateFuncaoModulo()

await createFuncao.mutateAsync({
  moduloId: "uuid-do-modulo",
  funcao: {
    nome: "Editar Pedido",
    url: "/compras/pedidos/:id/editar"
  }
})
```

### Buscar Funções de um Módulo
```typescript
const { data: funcoes } = useFuncoesModulo("uuid-do-modulo")
// funcoes é Funcao[]
```

### Atualizar Módulo
```typescript
const updateModulo = useUpdateModulo()

await updateModulo.mutateAsync({
  id: "uuid-do-modulo",
  data: {
    nome: "Compras e Suprimentos",
    url: "/compras-suprimentos"
  }
})
```

---

## ⚠️ Avisos Importantes

### 1. Rota não registrada
A rota `PUT /funcao/:id` está **implementada** mas **não está registrada** no backend. Se precisar usar, adicione ao controller:

```typescript
fastify.register(this.atualizarFuncao, {
  prefix: '/funcao',
})
```

### 2. Breaking Changes

#### Retorno de `getModulos()`
**ANTES:**
```typescript
{ modulos: Modulo[] }
```

**DEPOIS:**
```typescript
Modulo[]
```

#### Tipo `Modulo` simplificado
Campos removidos: `codigo`, `descricao`, `icone`, `status`

---

## 📝 Checklist de Migração

- [x] Tipos atualizados (`moduloTypes.ts`)
- [x] API atualizada (`modulosApi.ts`)
- [x] Hooks atualizados (`useAdminData.ts`)
- [x] Componente corrigido (`ModulosTab.tsx`)
- [x] Query keys adicionadas
- [x] Cache invalidation configurado
- [ ] Testes de integração
- [ ] Atualizar documentação do sistema

---

## 🎯 Próximos Passos

1. **Backend:** Registrar rota `PUT /funcao/:id` se necessário
2. **Frontend:** Criar componentes para gerenciar funções de módulos
3. **Testes:** Validar todas as operações CRUD
4. **Perfis:** Integrar funções com sistema de permissões

---

**Desenvolvedor:** GitHub Copilot  
**Revisão:** Necessária
