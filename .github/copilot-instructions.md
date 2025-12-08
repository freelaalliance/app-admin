# Copilot Instructions - ERP Alliance Admin

## Arquitetura do Projeto

Sistema ERP Multi-Empresa usando **Next.js 15 App Router** com arquitetura modular baseada em domínios. Cada módulo (Compras, Vendas, RH, Calibração, etc.) está isolado em `src/app/(private)/dashboard/[empresaId]/{modulo}/`.

### Estrutura de Pastas por Módulo
```
[empresaId]/{modulo}/
├── _components/     # Componentes específicos do módulo
├── _hooks/         # React Query hooks (use{Modulo}Data.ts)
├── _api/           # Funções de API (axios)
├── _types/         # TypeScript types
└── page.tsx        # Página principal
```

**Convenção de nomenclatura**: Pastas com `_` (underscore) são privadas e não viram rotas no Next.js.

## Stack Técnico

- **State Management**: TanStack Query v5 (React Query) para server state + Jotai para UI state
- **HTTP Client**: Axios com `axiosInstance` (`src/lib/axios.ts`) - **sempre use withCredentials:true** para cookies HTTP-only
- **UI**: shadcn/ui + Radix UI + Tailwind CSS 4
- **Formulários**: react-hook-form + zod
- **Notificações**: sonner (toast)

## Padrões de Código

### 1. Gerenciamento de Estado com React Query

**Sempre** crie hooks personalizados seguindo este padrão (`src/hooks/use-configuracao-empresa.ts`):

```typescript
// QUERY_KEYS são arrays hierárquicos
const QUERY_KEYS = {
  configuracoes: (empresaId: string) => ['configuracoes', empresaId],
  configuracao: (empresaId: string, chave: string) => ['configuracao', empresaId, chave],
};

// Queries com staleTime de 5 minutos padrão
export const useConfiguracoesPorEmpresa = (empresaId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.configuracoes(empresaId),
    queryFn: () => buscarConfiguracoesPorEmpresa(empresaId),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5,
  });
};

// Mutations com invalidação automática e toast
export const useCriarConfiguracao = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: criarConfiguracao,
    onSuccess: (data, variables) => {
      toast.success(data.msg);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.configuracoes(variables.empresaId) });
    },
    onError: (error: any) => toast.error(error.response?.data?.msg || 'Erro'),
  });
};
```

### 2. Tratamento de Null/Undefined

**SEMPRE** use nullish coalescing (`??`) e optional chaining (`?.`):

```typescript
// ✅ CORRETO - Nullish coalescing para valores padrão
const estatisticas = dadosRecebimentos?.estatisticasRecebimentos ?? {
  totalRecebimentos: 0,
  mediaAvaliacao: 0,
};

// ✅ CORRETO - Garantir valores numéricos antes de toFixed()
const notasValidas = avaliacoes
  .map(av => av?.notaAvaliacao)
  .filter((nota): nota is number => typeof nota === 'number' && !isNaN(nota));

// ❌ EVITAR - Operador || pode falhar com 0, '', false
const total = dados?.total || 0; // Problemático se total for 0
```

### 3. API Services Pattern

Funções de API em `src/lib/api/` ou `{modulo}/_api/`:

```typescript
// Sempre retorne o tipo correto da response
export const buscarConfiguracoes = async (empresaId: string): Promise<ConfiguracaoResponse[]> => {
  const response = await axiosInstance.get<ConfiguracaoResponse[]>(
    `/admin/configuracao/empresa/${empresaId}`
  );
  return response.data;
};
```

### 4. TypeScript Types

- **Types em `src/types/` ou `{modulo}/_types/`**
- Use `interface` para objetos extensíveis, `type` para unions/intersections
- Tipos de Request/Response seguem padrão: `{Acao}{Entidade}Request/Response`

```typescript
export interface CriarConfiguracaoRequest {
  chave: string;
  valor: string;
  empresaId: string; // UUID
}
```

### 5. Configurações por Empresa

Sistema de configurações flexível por empresa via `use-configuracao-empresa.ts`:
- Chaves no formato: `{modulo}_habilitar_{funcionalidade}` (ex: `compras_habilitar_frete`)
- Valores armazenados como strings, use `=== 'true'` para booleanos
- Use `useCriarOuAtualizarConfiguracao()` para upserts automáticos

### 6. Componentes UI

- **shadcn/ui**: Adicionar componentes com `npx shadcn-ui@latest add {component}`
- Sempre use componentes de `@/components/ui/` para consistência
- Ícones: Lucide React (`import { Icon } from 'lucide-react'`)

## Autenticação e Rotas

- **Públicas**: `src/app/(public)/` - sem autenticação
- **Privadas**: `src/app/(private)/` - protegidas por middleware
- **Cookie**: `sessionAdmin` (HTTP-only) - não acessível via JS
- **Interceptor Axios**: Redireciona para `/login` em 401

## API Backend

- **Base URL**: `/api/admin/` 
- **Formato de Response**:
  ```typescript
  { status: boolean, msg: string, dados?: T, erro?: string }
  ```
- **Exclusão Lógica**: Usar rotas DELETE, backend altera campo `excluido` (ver `API-EXCLUSAO-LOGICA.md`)

## Desenvolvimento

```powershell
npm run dev          # Dev com Turbopack
npm run build        # Build de produção
npm run test         # Vitest
npm run test:ui      # Vitest UI
```

## Path Alias

Use `@/` para imports absolutos:
```typescript
import { Button } from '@/components/ui/button';
import { useConfiguracao } from '@/hooks/use-configuracao-empresa';
```

## Documentação de Referência

- **APIs**: Veja `ConfiguracaoEmpresa.md`, `API-EXCLUSAO-LOGICA.md`
- **Estrutura de Módulos**: Navegue em `src/app/(private)/dashboard/[empresaId]/`
- **Hooks Exemplo**: `src/hooks/use-configuracao-empresa.ts`
