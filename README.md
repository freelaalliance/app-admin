# 🚀 ERP Multi-Empresa - Alliance

Sistema ERP Administrativo com painéis analíticos para visualização de dados de múltiplas empresas.

## 📋 Stack Tecnológica

- **Next.js 15** (App Router)
- **React 18+**
- **TypeScript 5+**
- **Tailwind CSS 4**
- **TanStack Query (React Query) v5**
- **Axios**
- **shadcn/ui + OriginUI**
- **Lucide React** (ícones)
- **Recharts** (gráficos)
- **FullCalendar** (calendários)
- **Jotai** (estado global)
- **date-fns**
- **react-hook-form + zod**
- **sonner** (toasts)

## 🛠️ Instalação

### 1. Instalar Dependências

```powershell
npm install
```

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` e configure a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 3. Inicializar shadcn/ui (Opcional - Componentes já criados)

Se precisar adicionar mais componentes do shadcn/ui:

```powershell
npx shadcn-ui@latest add [component-name]
```

## 🚀 Executar o Projeto

### Modo Desenvolvimento

```powershell
npm run dev
```

Acesse: http://localhost:3000

### Build para Produção

```powershell
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Página inicial (redirect)
│   ├── globals.css              # Estilos globais
│   └── dashboard/               # Rotas do dashboard
│       ├── page.tsx             # Seleção de empresa
│       ├── loading.tsx          # Loading state
│       └── [empresaId]/         # Rotas dinâmicas por empresa
│           └── [modulo]/        # Módulos (calibracao, compras, etc)
│               ├── page.tsx
│               ├── _api/
│               ├── _components/
│               ├── _hooks/
│               └── _types/
├── components/
│   ├── ui/                      # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── skeleton.tsx
│   └── shared/                  # Componentes compartilhados
│       ├── IndicadorInfo.tsx
│       ├── StatCard.tsx
│       ├── CalendarioEventos.tsx
│       └── EmpresaSelector.tsx
├── lib/
│   ├── axios.ts                 # Configuração do Axios
│   ├── react-query.tsx          # Provider do React Query
│   ├── utils.ts                 # Utilitários (cn)
│   ├── atoms/
│   │   └── empresaAtom.ts       # Estado global (Jotai)
│   ├── api/
│   │   └── viacep.ts            # Integração ViaCEP
│   └── utils/
│       └── cnpj.ts              # Validação CNPJ
└── types/
    └── global.d.ts              # Tipos globais
```

## 📊 Módulos Implementados

### 1. **Calibração** 
`/dashboard/[empresaId]/calibracao`
- Estatísticas de calibrações
- Agenda em calendário
- Histórico de calibrações

### 2. **Compras**
`/dashboard/[empresaId]/compras`
- Sub-painéis (Tabs): Fornecedores e Compras
- Gráficos e métricas
- Filtros de data

### 3. **Documentos**
`/dashboard/[empresaId]/documentos`
- Lista de documentos
- Filtros por categoria
- Downloads

### 4. **Expedição**
`/dashboard/[empresaId]/expedicao`
- Indicadores de vendas
- Lista de expedições
- Status e avaliações

### 5. **Manutenção**
`/dashboard/[empresaId]/manutencao`
- Seletor de equipamento
- Tabs: Métricas, Inspeções, Manutenções
- Indicadores MTTR/MTBF
- Calendário de inspeções

### 6. **Recebimentos**
`/dashboard/[empresaId]/recebimentos`
- Filtros de data
- Métricas de recebimentos
- Gráficos de avaliação

### 7. **RH (Recursos Humanos)**
`/dashboard/[empresaId]/rh`
- Cards com tendências
- Análise de rotatividade
- Treinamentos
- Colaboradores por cargo

### 8. **Vendas**
`/dashboard/[empresaId]/vendas`
- Estatísticas de clientes
- Estatísticas de produtos
- Top produto e top cliente

### 9. **Empresas (Administrativo)**
`/dashboard/admin/empresas`
- CRUD de empresas
- Gerenciamento de módulos
- Perfis e permissões
- Usuários

## 🎯 Próximos Passos

### Fase 1: Implementar os Módulos

1. **Criar estrutura para cada módulo:**
   - Types (`_types/`)
   - API functions (`_api/`)
   - Custom hooks (`_hooks/`)
   - Components (`_components/`)
   - Page (`page.tsx`)

2. **Seguir o padrão estabelecido:**
   - Ver exemplo no `PROMPT_CRIACAO_PAINEIS.md`
   - Cada módulo segue a mesma estrutura
   - Reutilizar componentes compartilhados

### Fase 2: Componentes OriginUI

Adicionar componentes avançados de https://originui.com/:
- Data Tables com filtros
- Date Range Pickers
- Charts avançados
- Timeline components
- Empty states
- Loading skeletons customizados

### Fase 3: Otimizações

- Implementar Suspense boundaries
- Configurar prefetching
- Optimistic updates
- Performance monitoring

## 📝 Padrão de Desenvolvimento

### Criar um Novo Módulo

1. **Criar pasta do módulo:**
```
src/app/dashboard/[empresaId]/[nome-modulo]/
```

2. **Criar estrutura interna:**
```
[nome-modulo]/
├── page.tsx
├── loading.tsx
├── error.tsx
├── _api/
│   └── [modulo]Api.ts
├── _components/
│   ├── charts/
│   ├── cards/
│   └── tables/
├── _hooks/
│   └── use[Modulo]Data.ts
└── _types/
    └── [modulo]Types.ts
```

3. **Implementar os types:**
```typescript
// _types/moduloTypes.ts
export type MinhaEntidade = {
  id: string
  // ... campos
}
```

4. **Criar funções de API:**
```typescript
// _api/moduloApi.ts
import { axiosInstance, type ApiResponse } from '@/lib/axios'

export const moduloApi = {
  get: async (empresaId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<MinhaEntidade[]>>(
      `/empresas/${empresaId}/endpoint`
    )
    return data.dados
  },
}
```

5. **Criar custom hooks:**
```typescript
// _hooks/useModuloData.ts
import { useQuery } from '@tanstack/react-query'

export function useModuloData(empresaId: string | undefined) {
  return useQuery({
    queryKey: ['modulo', empresaId],
    queryFn: () => moduloApi.get(empresaId!),
    enabled: !!empresaId,
  })
}
```

6. **Criar componentes e página:**
```typescript
// page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useModuloData } from './_hooks/useModuloData'

export default function ModuloPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data, isLoading } = useModuloData(empresaId)

  return (
    <div className="space-y-6">
      {/* Conteúdo */}
    </div>
  )
}
```

## 🔧 Comandos Úteis

```powershell
# Desenvolvimento
npm run dev

# Build
npm run build

# Lint
npm run lint

# Adicionar componente shadcn/ui
npx shadcn-ui@latest add [component]
```

## 📚 Documentação de Referência

- [Next.js 15](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com/)
- [OriginUI](https://originui.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Contribuindo

1. Siga o padrão de código estabelecido
2. Mantenha a estrutura de pastas consistente
3. Use TypeScript com tipagem forte
4. Documente componentes complexos
5. Teste antes de fazer commit

## 📄 Licença

Propriedade da Alliance - Todos os direitos reservados.

---

**Versão:** 1.0.0  
**Data:** 03/10/2025  
**Autor:** Alliance Development Team
