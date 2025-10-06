# 🎯 PROMPT DETALHADO: Criação de Painéis Multi-Empresa - Sistema ERP

## 📋 Contexto do Projeto

Você irá criar um sistema ERP Administrativos com painéis (dashboards) analíticos para um ERP que permite visualizar dados de diferentes empresas. O usuário poderá selecionar uma empresa e os dados dos módulos serão carregados dinamicamente com base nessa seleção.

---

## 🏗️ Stack Tecnológica

### Frameworks e Bibliotecas Core
- **Next.js 15** (App Router)
- **React 18+**
- **TypeScript 5+**
- **Tailwind CSS 4**

### Gerenciamento de Estado e Dados
- **Axios** para requisições HTTP
- **TanStack Query (React Query) v5** para cache e gerenciamento de estado do servidor

### UI Components
- **shadcn/ui** (componentes base)
- **OriginUI** (https://originui.com/) para componentes avançados não disponíveis no shadcn/ui
- **Lucide React** para ícones
- **Recharts** para gráficos

### Bibliotecas Adicionais
- **date-fns** para manipulação de datas
- **@fullcalendar/react** para calendários
- **react-hook-form** + **zod** para formulários
- **sonner** para notificações toast
- **class-variance-authority** e **clsx** para classes CSS dinâmicas

---

## 🎨 Arquitetura do Projeto

### Estrutura de Pastas

```
src/
├── app/
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx (Seleção de empresa)
│       └── [empresaId]/
│           ├── layout.tsx (Sidebar com módulos)
│           └── [modulo]/
│               ├── page.tsx (Painel do módulo)
│               ├── _api/
│               │   └── [modulo]Api.ts
│               ├── _components/
│               │   ├── charts/
│               │   ├── cards/
│               │   └── tables/
│               ├── _hooks/
│               │   └── use[Modulo]Data.ts
│               └── _types/
│                   └── [modulo]Types.ts
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── shared/
│   │   ├── IndicadorInfo.tsx
│   │   ├── StatCard.tsx
│   │   ├── CalendarioEventos.tsx
│   │   └── EmpresaSelector.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       └── Header.tsx
├── lib/
│   ├── axios.ts
│   ├── react-query.ts
│   └── utils.ts
└── types/
    └── global.d.ts
```

---

## 🔧 Configuração Inicial

### 1. Configuração do Axios (`lib/axios.ts`)

```typescript
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Redirecionar para login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export type ApiResponse<T> = {
  status: boolean
  msg: string
  dados: T
  erro?: string | null
}
```

### 2. Configuração do React Query (`lib/react-query.ts`)

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos (anteriormente cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 3. Layout Root (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactQueryProvider } from '@/lib/react-query'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ERP Multi-Empresa',
  description: 'Sistema de gestão empresarial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
```

---

## 📊 Componentes Compartilhados

### 1. IndicadorInfo (`components/shared/IndicadorInfo.tsx`)

```typescript
import type { ElementType } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface IndicadorInfoProps {
  titulo: string
  info: number | string
  subtitulo?: string
  icon?: ElementType
  carregandoInformacao: boolean
  className?: string
}

export function IndicadorInfo({
  titulo,
  info,
  subtitulo,
  icon: Icon,
  carregandoInformacao,
  className,
}: IndicadorInfoProps) {
  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {carregandoInformacao ? (
          <Skeleton className="h-10 w-10" />
        ) : (
          <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        )}
        {Icon && (
          <Icon
            className={cn(
              'h-8 w-8 text-muted-foreground',
              carregandoInformacao ? 'hidden' : 'flex'
            )}
          />
        )}
      </CardHeader>

      {carregandoInformacao ? (
        <CardContent className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-2 w-48" />
        </CardContent>
      ) : (
        <CardContent className="space-y-1">
          <div className="text-2xl font-bold">{info}</div>
          {subtitulo && (
            <p className="text-sm text-muted-foreground">{subtitulo}</p>
          )}
        </CardContent>
      )}
    </Card>
  )
}
```

### 2. StatCard (`components/shared/StatCard.tsx`)

```typescript
'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    type: 'up' | 'down' | 'neutral'
    description: string
  }
  className?: string
  isLoading?: boolean
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  isLoading = false,
}: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend?.type) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />
      case 'down':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (trend?.type) {
      case 'up':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'down':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
          <div className="h-3 w-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
        )}
        {trend && (
          <Badge variant="outline" className={`text-xs ${getTrendColor()}`}>
            <span className="flex items-center gap-1">
              {getTrendIcon()}
              {Math.abs(trend.value)}%
              <span className="font-normal">{trend.description}</span>
            </span>
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
```

### 3. CalendarioEventos (`components/shared/CalendarioEventos.tsx`)

```typescript
'use client'

import ptbrLocale from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type EventoCalendario = {
  id: string
  allDay: boolean
  start: Date | string
  end?: Date | string
  title: string
  display?: 'auto' | 'block' | 'list-item' | 'background' | 'inverse-background' | 'none'
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  color?: string
}

interface CalendarioEventosProps {
  eventos: EventoCalendario[]
  titulo?: string
  descricao?: string
  isLoading?: boolean
}

export function CalendarioEventos({
  eventos,
  titulo,
  descricao,
  isLoading = false,
}: CalendarioEventosProps) {
  if (isLoading) {
    return (
      <Card>
        {titulo && (
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="h-[550px] w-full bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {titulo && (
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
          {descricao && <p className="text-sm text-muted-foreground">{descricao}</p>}
        </CardHeader>
      )}
      <CardContent>
        <FullCalendar
          height="auto"
          contentHeight="auto"
          themeSystem="bootstrap5"
          locale={ptbrLocale}
          headerToolbar={{ right: 'prev,next today' }}
          editable={false}
          selectable={false}
          selectMirror={false}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={eventos}
        />
      </CardContent>
    </Card>
  )
}
```

### 4. EmpresaSelector (`components/shared/EmpresaSelector.tsx`)

```typescript
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Building2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

export type Empresa = {
  id: string
  nome: string
  documento: string
}

interface EmpresaSelectorProps {
  empresas: Empresa[]
  empresaSelecionada?: string
  isLoading?: boolean
}

export function EmpresaSelector({
  empresas,
  empresaSelecionada,
  isLoading = false,
}: EmpresaSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleEmpresaChange = (empresaId: string) => {
    // Extrai o módulo atual do pathname se existir
    const moduloAtual = pathname.split('/').pop()
    const isModulo = moduloAtual && moduloAtual !== empresaSelecionada
    
    if (isModulo) {
      router.push(`/dashboard/${empresaId}/${moduloAtual}`)
    } else {
      router.push(`/dashboard/${empresaId}`)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Selecione a Empresa
            </label>
            <Select
              value={empresaSelecionada}
              onValueChange={handleEmpresaChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma empresa..." />
              </SelectTrigger>
              <SelectContent>
                {empresas.map((empresa) => (
                  <SelectItem key={empresa.id} value={empresa.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{empresa.nome}</span>
                      <span className="text-xs text-muted-foreground">
                        {empresa.documento}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 🎯 Implementação dos Módulos

### Estrutura de Cada Módulo

Cada módulo deve seguir este padrão de implementação:

#### 1. Types (`_types/[modulo]Types.ts`)

```typescript
// Exemplo: _types/calibracaoTypes.ts

export type EstatisticasCalibracao = {
  quantidadeCalibracoesAprovadas: number
  quantidadeCalibracoesReprovadas: number
  quantidadeInstrumentosEmpresa: number
  quantidadeInstrumentosCadastradoAtual: number
  calibracoesVencido: number
  calibracoesVencendo: number
  calibracoesDentroPrazo: number
}

export type AgendaCalibracao = {
  id: string
  instrumento: string
  codigo: string
  nome: string
  agendadoPara: Date
}

export type HistoricoCalibracao = {
  calibracao: {
    id: string
    numeroCertificado: string
    erroEncontrado: string
    status: string
    realizadoEm: Date
    usuarioNome: string
  }
  instrumento: {
    id: string
    codigo: string
    nome: string
  }
}
```

#### 2. API Functions (`_api/[modulo]Api.ts`)

```typescript
// Exemplo: _api/calibracaoApi.ts

import { axiosInstance, type ApiResponse } from '@/lib/axios'
import type { EstatisticasCalibracao, AgendaCalibracao, HistoricoCalibracao } from '../_types/calibracaoTypes'

export const calibracaoApi = {
  // GET - Estatísticas
  getEstatisticas: async (empresaId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<EstatisticasCalibracao>>(
      `/empresas/${empresaId}/instrumentos/estatisticas`
    )
    return data.dados
  },

  // GET - Agenda
  getAgenda: async (empresaId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<AgendaCalibracao[]>>(
      `/empresas/${empresaId}/instrumentos/calibracoes/agenda`
    )
    return data.dados
  },

  // GET - Histórico
  getHistorico: async (empresaId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<HistoricoCalibracao[]>>(
      `/empresas/${empresaId}/instrumentos/calibracao/all`
    )
    return data.dados
  },
}
```

#### 3. Custom Hooks (`_hooks/use[Modulo]Data.ts`)

```typescript
// Exemplo: _hooks/useCalibracoesData.ts

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { calibracaoApi } from '../_api/calibracaoApi'

// Query Keys
const calibracaoKeys = {
  all: (empresaId: string) => ['calibracoes', empresaId] as const,
  estatisticas: (empresaId: string) => [...calibracaoKeys.all(empresaId), 'estatisticas'] as const,
  agenda: (empresaId: string) => [...calibracaoKeys.all(empresaId), 'agenda'] as const,
  historico: (empresaId: string) => [...calibracaoKeys.all(empresaId), 'historico'] as const,
}

export function useEstatisticasCalibracao(empresaId: string | undefined) {
  return useQuery({
    queryKey: calibracaoKeys.estatisticas(empresaId || ''),
    queryFn: () => calibracaoApi.getEstatisticas(empresaId!),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export function useAgendaCalibracao(empresaId: string | undefined) {
  return useQuery({
    queryKey: calibracaoKeys.agenda(empresaId || ''),
    queryFn: () => calibracaoApi.getAgenda(empresaId!),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5,
  })
}

export function useHistoricoCalibracao(empresaId: string | undefined) {
  return useQuery({
    queryKey: calibracaoKeys.historico(empresaId || ''),
    queryFn: () => calibracaoApi.getHistorico(empresaId!),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5,
  })
}

// Hook para invalidar todas as queries de calibração
export function useInvalidateCalibracao() {
  const queryClient = useQueryClient()
  
  return (empresaId: string) => {
    queryClient.invalidateQueries({ 
      queryKey: calibracaoKeys.all(empresaId) 
    })
  }
}
```

#### 4. Componentes de Visualização (`_components/`)

```typescript
// Exemplo: _components/cards/EstatisticasCard.tsx

import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { SmartphoneNfc, ClipboardCheck, Clock11 } from 'lucide-react'
import type { EstatisticasCalibracao } from '../../_types/calibracaoTypes'

interface EstatisticasCardProps {
  dados: EstatisticasCalibracao | undefined
  isLoading: boolean
}

export function EstatisticasCard({ dados, isLoading }: EstatisticasCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <IndicadorInfo
        titulo="Instrumentos"
        info={dados?.quantidadeInstrumentosEmpresa ?? 0}
        icon={SmartphoneNfc}
        carregandoInformacao={isLoading}
      />
      <IndicadorInfo
        titulo="Aprovadas"
        info={dados?.quantidadeCalibracoesAprovadas ?? 0}
        icon={ClipboardCheck}
        carregandoInformacao={isLoading}
      />
      <IndicadorInfo
        titulo="Reprovadas"
        info={dados?.quantidadeCalibracoesReprovadas ?? 0}
        icon={ClipboardCheck}
        carregandoInformacao={isLoading}
      />
      <IndicadorInfo
        titulo="Vencendo / Vencidos"
        info={`${dados?.calibracoesVencendo ?? 0} / ${dados?.calibracoesVencido ?? 0}`}
        icon={Clock11}
        carregandoInformacao={isLoading}
      />
    </div>
  )
}
```

#### 5. Página do Módulo (`page.tsx`)

```typescript
// Exemplo: app/dashboard/[empresaId]/calibracao/page.tsx

'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowBigDownDash } from 'lucide-react'
import { EstatisticasCard } from './_components/cards/EstatisticasCard'
import { CalendarioEventos } from '@/components/shared/CalendarioEventos'
import { HistoricoList } from './_components/HistoricoList'
import {
  useEstatisticasCalibracao,
  useAgendaCalibracao,
  useHistoricoCalibracao,
} from './_hooks/useCalibracoesData'

export default function CalibracoesPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data: estatisticas, isLoading: loadingEstatisticas } = useEstatisticasCalibracao(empresaId)
  const { data: agenda, isLoading: loadingAgenda } = useAgendaCalibracao(empresaId)
  const { data: historico, isLoading: loadingHistorico } = useHistoricoCalibracao(empresaId)

  // Transforma agenda em eventos do calendário
  const eventos = agenda?.map(item => ({
    id: item.id,
    allDay: true,
    title: item.nome,
    start: new Date(item.agendadoPara),
    backgroundColor: '#027435',
    textColor: '#fff',
    borderColor: '#027435',
  })) ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calibrações</h1>
          <p className="text-muted-foreground">
            Visualize as métricas e agenda de calibrações
          </p>
        </div>
        <Button className="gap-2">
          <ArrowBigDownDash className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Estatísticas */}
      <EstatisticasCard dados={estatisticas} isLoading={loadingEstatisticas} />

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Histórico */}
        <div className="lg:col-span-2">
          <HistoricoList dados={historico ?? []} isLoading={loadingHistorico} />
        </div>

        {/* Calendário */}
        <div>
          <CalendarioEventos
            eventos={eventos}
            titulo="Agenda de Calibrações"
            descricao="Agenda de calibrações dos instrumentos"
            isLoading={loadingAgenda}
          />
        </div>
      </div>
    </div>
  )
}
```

---

## 📦 Módulos a Implementar

### 1. **Módulo: Calibração**

**Endpoints:**
- `GET /empresas/{empresaId}/instrumentos/estatisticas`
- `GET /empresas/{empresaId}/instrumentos/calibracoes/agenda`
- `GET /empresas/{empresaId}/instrumentos/calibracao/all`

**Componentes:**
- Cards de estatísticas (Instrumentos, Aprovadas, Reprovadas, Vencendo/Vencidos)
- Calendário de agenda
- Lista de histórico de calibrações com accordion

**Dados Exibidos:**
- Quantidade de instrumentos
- Calibrações aprovadas/reprovadas
- Calibrações vencendo/vencidas
- Agenda em calendário
- Histórico detalhado

---

### 2. **Módulo: Compras**

**Endpoints:**
- `GET /empresas/{empresaId}/relatorio/compras/resumo`
- `GET /empresas/{empresaId}/relatorio/compras` (com filtro de data)
- `GET /empresas/{empresaId}/relatorio/fornecedor/resumo`
- `GET /empresas/{empresaId}/fornecedor`

**Sub-painéis (usar Tabs):**
1. **Fornecedores:**
   - Total de fornecedores ativos
   - Desempenho médio
   - Avaliações realizadas
   - Média de avaliações
   - Gráficos de pizza (Críticos vs Não Críticos, Aprovados vs Reprovados)
   - Tabela de fornecedores

2. **Compras:**
   - Total de pedidos
   - Cancelados
   - Recebidos
   - Não recebidos
   - Filtro por data (usar Calendar Popover)
   - Tabela de pedidos

**Componentes:**
- Tabs para alternar entre Fornecedores e Compras
- Cards de estatísticas
- Gráficos Pie Chart (usar Recharts)
- Tabelas com dados
- Filtro de data (Popover + Calendar)
- Botão de exportar PDF

---

### 3. **Módulo: Documentos**

**Endpoints:**
- `GET /empresas/{empresaId}/documentos/usuario`
- `GET /empresas/{empresaId}/documentos/categorias`
- `GET /empresas/{empresaId}/documentos/empresa`

**Componentes:**
- Tabela de documentos
- Filtro por categoria
- Ações de download
- Visualização de revisões

**Dados Exibidos:**
- Lista de documentos com acesso
- Categorias
- Revisões
- Downloads

---

### 4. **Módulo: Expedição**

**Endpoints:**
- `GET /empresas/{empresaId}/vendas/expedicao`
- `GET /empresas/{empresaId}/vendas/expedicao/resumo`
- `GET /empresas/{empresaId}/vendas/expedicao/media-avaliacao`

**Componentes:**
- 4 Cards de indicadores (IndicadorInfo)
- Lista de pedidos expedidos recentemente
- Badges de status
- Timeline de expedições

**Dados Exibidos:**
- Vendas pendentes
- Vendas expedidas
- Total de vendas
- Média de avaliação
- Lista de expedições recentes

---

### 5. **Módulo: Manutenção**

**Endpoints:**
- `GET /empresas/{empresaId}/inspecao/equipamento/{equipamentoId}`
- `GET /empresas/{empresaId}/manutencao/equipamento/{equipamentoId}`
- `GET /empresas/{empresaId}/manutencao/indicadores/equipamento`
- `GET /empresas/{empresaId}/equipamento/{equipamentoId}/agenda`
- `GET /empresas/{empresaId}/equipamento/todos`

**Componentes:**
- Seletor de equipamento
- Tabs (Métricas, Inspeções, Manutenções)
- Cards de indicadores MTTR e MTBF
- Calendário de inspeções
- Listas de inspeções e manutenções
- Gráficos de duração

**Dados Exibidos:**
- Indicadores MTTR/MTBF
- Tempo de parada
- Tempo de operação
- Agenda de inspeções
- Histórico de manutenções

---

### 6. **Módulo: Recebimentos**

**Endpoints:**
- `GET /empresas/{empresaId}/relatorio/recebimentos` (com filtro de data)

**Componentes:**
- Filtro de data (Popover + Calendar)
- Cards de estatísticas
- Tabela de recebimentos
- Gráficos de linha (avaliações ao longo do tempo)

**Dados Exibidos:**
- Total de recebimentos
- Avaliação média
- Recebimentos por data
- Avaliação mínima/máxima
- Lista detalhada

---

### 7. **Módulo: RH**

**Endpoints:**
- `GET /empresas/{empresaId}/rh/analytics/colaboradores`
- `GET /empresas/{empresaId}/rh/analytics/rotatividade?periodo={periodo}`
- `GET /empresas/{empresaId}/rh/analytics/treinamentos`
- `GET /empresas/{empresaId}/rh/analytics/colaboradores-por-cargo`
- `GET /empresas/{empresaId}/rh/colaboradores/ativos`
- `GET /empresas/{empresaId}/rh/colaboradores/demitidos`
- `GET /empresas/{empresaId}/rh/colaboradores/em-treinamento`

**Componentes:**
- 4 StatCards com tendências
- Select para período de rotatividade
- Card de análise de rotatividade
- Card de treinamentos (com sub-tabs)
- Grid de colaboradores por cargo
- Tabs de listas (Ativos, Demitidos)

**Dados Exibidos:**
- Colaboradores ativos/inativos
- Contratações no mês
- Índice de rotatividade
- Admissões/Demissões
- Treinamentos em andamento
- Distribuição por cargo
- Listas de colaboradores

---

### 8. **Módulo: Vendas**

**Endpoints:**
- `GET /empresas/{empresaId}/estatisticas/empresa/clientes`
- `GET /empresas/{empresaId}/estatisticas/empresa/produtos`
- `GET /empresas/{empresaId}/estatisticas/vendas/produto-top`
- `GET /empresas/{empresaId}/estatisticas/vendas/cliente-top`

**Componentes:**
- 4 Cards de indicadores
- Destaque para top produto e top cliente

**Dados Exibidos:**
- Total de clientes
- Total de produtos
- Top produto (mais vendido)
- Top cliente (mais compras)

---

### 9. **Módulo: Empresas (Administrativo)**

**Endpoints:**

**Gerenciamento de Empresas:**
- `GET /admin/empresa/all` - Listar todas as empresas
- `POST /admin/empresa` - Cadastrar nova empresa
- `PUT /admin/empresa/{id}` - Editar empresa
- `DELETE /admin/empresa/{id}` - Excluir empresa

**Módulos da Empresa:**
- `GET /modulo/all` - Listar todos os módulos do sistema
- `GET /admin/empresa/{idEmpresa}/modulos` - Listar módulos vinculados à empresa
- `POST /admin/empresa/{idEmpresa}/vincular/modulo` - Vincular módulo à empresa
- `DELETE /admin/empresa/{idEmpresa}/desvincular/modulo` - Desvincular módulo

**Perfis de Acesso:**
- `GET /admin/empresa/{empresaId}/perfis` - Listar perfis da empresa
- `POST /admin/perfil` - Cadastrar novo perfil
- `PUT /admin/perfil/{id}` - Editar perfil
- `DELETE /admin/perfil/{id}` - Excluir perfil
- `GET /admin/perfil/{idPerfil}/permissoes` - Listar permissões do perfil
- `POST /admin/perfil/{idPerfil}/vincular/funcao` - Adicionar permissões ao perfil
- `DELETE /admin/perfil/{idPerfil}/remover/funcao` - Remover permissões do perfil

**Usuários:**
- `GET /admin/empresa/{idEmpresa}/usuarios` - Listar usuários da empresa
- `POST /admin/usuarios` - Criar novo usuário
- `PUT /admin/usuarios/{id}` - Alterar dados do usuário
- `PATCH /admin/usuarios/{idUsuario}/status` - Alterar status do usuário

**Permissões e Funções:**
- `GET /modulo/{idModulo}/funcoes` - Listar funções de um módulo
- `GET /usuario/perfil/permissoes/modulo/{idModulo}` - Listar permissões do perfil no módulo

**Componentes:**
- **Seletor de Empresa** (Select com lista de empresas)
- **Tabs** para navegação entre:
  - Módulos
  - Perfis
  - Usuários
- **Dialogs** para:
  - Nova empresa
  - Editar empresa
  - Excluir empresa (AlertDialog)
  - Novo perfil
  - Editar perfil
  - Excluir perfil
  - Novo usuário
  - Editar usuário
  - Alterar status usuário
- **Tabelas**:
  - Lista de módulos disponíveis
  - Lista de módulos vinculados
  - Lista de perfis
  - Lista de permissões por perfil
  - Lista de usuários
- **Formulários**:
  - Cadastro/Edição de empresa (com busca CEP)
  - Cadastro/Edição de perfil
  - Cadastro/Edição de usuário
  - Vinculação de módulos
  - Gerenciamento de permissões

**Estrutura de Dados:**

**Empresa:**
```typescript
{
  id: string
  nome: string
  cnpj: string
  endereco: {
    id: string
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
}
```

**Módulo:**
```typescript
{
  id: string
  nome: string
  descricao: string
  icone: string
  rota: string
}
```

**Perfil:**
```typescript
{
  id: string
  nome: string
  administrativo: boolean
  empresa: string
  permissoes: Array<{
    id: string
    nome: string
    descricao: string
  }>
}
```

**Usuário:**
```typescript
{
  id: string
  nome: string
  email: string
  status: boolean
  perfil: {
    id: string
    nome: string
  }
}
```

**Dados Exibidos:**

**Aba Módulos:**
- Lista de todos os módulos do sistema
- Módulos vinculados à empresa (com ação de desvincular)
- Módulos disponíveis para vincular
- Status de vinculação

**Aba Perfis:**
- Lista de perfis da empresa
- Detalhes do perfil (nome, tipo administrativo)
- Permissões vinculadas ao perfil
- Funções disponíveis por módulo
- Ações: criar, editar, excluir perfil
- Gerenciar permissões (adicionar/remover)

**Aba Usuários:**
- Lista de usuários da empresa
- Nome, email, perfil, status
- Ações: criar, editar, ativar/desativar usuário

**Recursos Especiais:**
- **Alert** quando nenhuma empresa está selecionada
- **Busca de CEP** automática no formulário de empresa (integração com ViaCEP)
- **Validação de CNPJ** com máscara
- **Tabs dinâmicas** que só aparecem após seleção de empresa
- **Loading states** em todas as operações
- **Toast notifications** para feedback de ações
- **Confirmação** antes de excluir (AlertDialog)
- **Desabilitar botões** quando empresa não está selecionada

**Fluxo de Uso:**
1. Selecionar empresa na lista (ou criar nova)
2. Acessar tabs de configuração
3. Gerenciar módulos, perfis e usuários conforme necessário
4. Sistema mantém estado da empresa selecionada

**Observações Importantes:**
- Este é um módulo administrativo especial que gerencia empresas
- Diferente dos outros módulos que consomem dados POR empresa
- Aqui você GERENCIA as empresas que aparecerão nos outros módulos
- Requer permissões especiais de administrador
- Utiliza estado global (Jotai) para manter empresa selecionada: `useEmpresa()`

---

## 🎨 Componentes do OriginUI a Utilizar

Buscar em https://originui.com/ os seguintes componentes:

1. **Data Table avançada** com:
   - Filtros
   - Ordenação
   - Paginação
   - Seleção de colunas
   - Exportação

2. **Date Range Picker** para filtros de data

3. **Charts/Graficos** avançados:
   - Line Charts
   - Bar Charts
   - Pie Charts
   - Area Charts
   - Mixed Charts

4. **Timeline Component** para históricos

5. **Stats Cards** com animações

6. **Empty States** personalizados

7. **Loading Skeletons** customizados

8. **Metric Cards** com gráficos inline

9. **Comparison Cards** para comparar períodos

10. **Activity Feed** para logs/histórico

---

## 🔄 Padrões de Performance Next.js 15

### 1. Server Components por Padrão

```typescript
// Layout que busca lista de empresas no servidor
// app/dashboard/layout.tsx

import { getEmpresas } from '@/lib/api/empresas'
import { EmpresaSelector } from '@/components/shared/EmpresaSelector'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const empresas = await getEmpresas()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <EmpresaSelector empresas={empresas} />
        {children}
      </main>
    </div>
  )
}
```

### 2. Streaming com Suspense

```typescript
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ModuloPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <EstatisticasSection />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ChartSection />
      </Suspense>
    </div>
  )
}
```

### 3. Parallel Routes para Dashboard

```typescript
// app/dashboard/[empresaId]/@analytics/page.tsx
// app/dashboard/[empresaId]/@charts/page.tsx
// app/dashboard/[empresaId]/layout.tsx

export default function DashboardLayout({
  children,
  analytics,
  charts,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  charts: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">{analytics}</div>
      <div className="col-span-8">{children}</div>
      <div className="col-span-4">{charts}</div>
    </div>
  )
}
```

### 4. Loading States

```typescript
// app/dashboard/[empresaId]/[modulo]/loading.tsx

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}
```

### 5. Error Boundaries

```typescript
// app/dashboard/[empresaId]/[modulo]/error.tsx

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-bold mb-2">Algo deu errado!</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  )
}
```

### 6. Prefetching de Dados

```typescript
// Prefetch ao passar o mouse sobre links
'use client'

import { useQueryClient } from '@tanstack/react-query'
import { calibracaoApi } from './api'

export function ModuloLink({ empresaId }: { empresaId: string }) {
  const queryClient = useQueryClient()

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['calibracoes', empresaId, 'estatisticas'],
      queryFn: () => calibracaoApi.getEstatisticas(empresaId),
    })
  }

  return (
    <Link
      href={`/dashboard/${empresaId}/calibracao`}
      onMouseEnter={handleMouseEnter}
    >
      Calibrações
    </Link>
  )
}
```

### 7. Optimistic Updates

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateStatus(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      api.updateStatus(empresaId, data),
    
    onMutate: async (newData) => {
      // Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: ['items', empresaId] })
      
      // Snapshot do estado anterior
      const previousData = queryClient.getQueryData(['items', empresaId])
      
      // Atualização otimista
      queryClient.setQueryData(['items', empresaId], (old: any) => ({
        ...old,
        items: old.items.map((item: any) =>
          item.id === newData.id ? { ...item, status: newData.status } : item
        ),
      }))
      
      return { previousData }
    },
    
    onError: (err, newData, context) => {
      // Rollback em caso de erro
      queryClient.setQueryData(['items', empresaId], context?.previousData)
      toast.error('Erro ao atualizar status')
    },
    
    onSuccess: () => {
      toast.success('Status atualizado com sucesso!')
    },
    
    onSettled: () => {
      // Revalida após mutação
      queryClient.invalidateQueries({ queryKey: ['items', empresaId] })
    },
  })
}
```

---

## 🎨 Estilização e Temas

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## 📝 Checklist de Implementação

### Configuração Inicial
- [ ] Criar projeto Next.js 15
- [ ] Instalar dependências (shadcn/ui, Axios, React Query, etc.)
- [ ] Configurar Tailwind CSS 4
- [ ] Configurar TypeScript
- [ ] Configurar Axios instance
- [ ] Configurar React Query Provider
- [ ] Adicionar componentes shadcn/ui necessários

### Componentes Base
- [ ] Criar IndicadorInfo
- [ ] Criar StatCard
- [ ] Criar CalendarioEventos
- [ ] Criar EmpresaSelector
- [ ] Criar Sidebar
- [ ] Criar Header
- [ ] Criar Loading Skeletons
- [ ] Criar Error Boundaries

### Estrutura de Rotas
- [ ] Criar layout principal (`/dashboard`)
- [ ] Criar layout por empresa (`/dashboard/[empresaId]`)
- [ ] Criar loading.tsx para cada rota
- [ ] Criar error.tsx para cada rota

### Módulo Calibração
- [ ] Criar types
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar componentes de visualização
- [ ] Criar página principal
- [ ] Implementar filtros e exportação

### Módulo Compras
- [ ] Criar types (Compras e Fornecedores)
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar componentes (Tabs, Gráficos, Tabelas)
- [ ] Criar página principal
- [ ] Implementar filtros de data

### Módulo Documentos
- [ ] Criar types
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar tabela de documentos
- [ ] Criar página principal
- [ ] Implementar downloads

### Módulo Expedição
- [ ] Criar types
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar cards de indicadores
- [ ] Criar lista de expedições
- [ ] Criar página principal

### Módulo Manutenção
- [ ] Criar types
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar seletor de equipamento
- [ ] Criar componentes de métricas
- [ ] Criar calendário de inspeções
- [ ] Criar página principal com tabs

### Módulo Recebimentos
- [ ] Criar types
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar filtros de data
- [ ] Criar tabela de recebimentos
- [ ] Criar gráficos
- [ ] Criar página principal

### Módulo RH
- [ ] Criar types
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar StatCards com tendências
- [ ] Criar análise de rotatividade
- [ ] Criar cards de treinamentos
- [ ] Criar grid de cargos
- [ ] Criar tabelas de colaboradores
- [ ] Criar página principal

### Módulo Vendas
- [ ] Criar types
- [ ] Criar API functions
- [ ] Criar custom hooks
- [ ] Criar cards de indicadores
- [ ] Criar página principal

### Módulo Empresas (Administrativo)
- [ ] Criar types (Empresa, Módulo, Perfil, Usuário, Permissão)
- [ ] Criar API functions para empresas
- [ ] Criar API functions para módulos
- [ ] Criar API functions para perfis
- [ ] Criar API functions para usuários
- [ ] Criar API functions para permissões
- [ ] Criar custom hooks
- [ ] Criar seletor de empresa (componente principal)
- [ ] Criar formulário de nova empresa
- [ ] Criar formulário de edição de empresa
- [ ] Criar dialog de exclusão de empresa
- [ ] Criar componente de lista de módulos do sistema
- [ ] Criar componente de módulos vinculados
- [ ] Criar componente de vinculação de módulos
- [ ] Criar tabela de perfis
- [ ] Criar formulário de novo perfil
- [ ] Criar formulário de edição de perfil
- [ ] Criar dialog de exclusão de perfil
- [ ] Criar tabela de permissões do perfil
- [ ] Criar componente de gerenciamento de permissões
- [ ] Criar tabela de usuários
- [ ] Criar formulário de novo usuário
- [ ] Criar formulário de edição de usuário
- [ ] Criar dialog de alteração de status
- [ ] Criar página principal com tabs (Módulos, Perfis, Usuários)
- [ ] Implementar integração com ViaCEP
- [ ] Implementar validação e máscara de CNPJ
- [ ] Implementar estado global para empresa selecionada
- [ ] Implementar alert de empresa não selecionada

### Otimizações
- [ ] Implementar prefetching de dados
- [ ] Implementar optimistic updates
- [ ] Configurar cache strategies
- [ ] Adicionar Suspense boundaries
- [ ] Implementar parallel routes
- [ ] Adicionar error tracking
- [ ] Configurar performance monitoring

### Testes e Deploy
- [ ] Testar troca de empresa
- [ ] Testar carregamento de dados
- [ ] Testar estados de erro
- [ ] Testar responsividade
- [ ] Otimizar performance
- [ ] Deploy em produção

---

## 🚀 Comandos Úteis

```bash
# Instalar dependências principais
npm install next@latest react@latest react-dom@latest
npm install typescript @types/node @types/react @types/react-dom

# Tailwind CSS
npm install -D tailwindcss@latest postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add card button select tabs skeleton

# React Query
npm install @tanstack/react-query @tanstack/react-query-devtools

# Axios
npm install axios

# Outras
npm install date-fns lucide-react sonner
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/core
npm install recharts
npm install react-hook-form zod @hookform/resolvers
npm install clsx tailwind-merge class-variance-authority
npm install jotai  # Gerenciamento de estado global
```

---

## 📚 Referências

- **Next.js 15 Docs**: https://nextjs.org/docs
- **TanStack Query**: https://tanstack.com/query/latest
- **shadcn/ui**: https://ui.shadcn.com/
- **OriginUI**: https://originui.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/
- **Recharts**: https://recharts.org/
- **FullCalendar**: https://fullcalendar.io/docs
- **ViaCEP API**: https://viacep.com.br/ (para busca de CEP)

---

## 🔐 Gerenciamento de Estado Global

### Estado da Empresa Selecionada (Jotai)

Para o módulo administrativo de empresas, é necessário um estado global para manter a empresa selecionada:

```typescript
// lib/atoms/empresaAtom.ts
import { atom, useAtom } from 'jotai'

type EmpresaState = {
  selected: string | null
}

const empresaAtom = atom<EmpresaState>({
  selected: null,
})

export function useEmpresa() {
  return useAtom(empresaAtom)
}
```

**Instalação do Jotai:**
```bash
npm install jotai
```

**Uso no componente:**
```typescript
import { useEmpresa } from '@/lib/atoms/empresaAtom'

export function SomeComponent() {
  const [empresaSelecionada, setEmpresaSelecionada] = useEmpresa()
  
  // Usar empresaSelecionada.selected
  // Atualizar com setEmpresaSelecionada({ selected: 'novo-id' })
}
```

---

## 🎯 Diferenças Importantes Entre Módulos

### Módulos Operacionais vs Módulo Administrativo

**Módulos Operacionais** (Calibração, Compras, Documentos, etc.):
- Consomem dados **DE** uma empresa específica
- Rotas: `/dashboard/{empresaId}/{modulo}`
- Mostram dados operacionais/analíticos
- Empresa selecionada no nível superior (layout)
- Queries dependem do empresaId nos parâmetros da rota

**Módulo Administrativo** (Empresas):
- Gerencia as **próprias empresas** do sistema
- Rota: `/admin/empresas` ou `/dashboard/admin/empresas`
- CRUD completo de empresas, perfis, usuários
- Usa estado global para empresa selecionada
- Não depende de empresaId na rota
- Requer permissões especiais de administrador

### Estrutura de Rotas Sugerida

```
/dashboard/
  ├── [empresaId]/              # Módulos operacionais
  │   ├── calibracao/
  │   ├── compras/
  │   ├── documentos/
  │   ├── expedicao/
  │   ├── manutencao/
  │   ├── recebimentos/
  │   ├── rh/
  │   └── vendas/
  └── admin/                    # Módulos administrativos
      └── empresas/             # Gerenciamento de empresas
          └── page.tsx
```

---

## 📝 Integração com APIs Externas

### ViaCEP - Busca Automática de Endereço

Para o formulário de empresas, implementar busca automática de CEP:

```typescript
// lib/api/viacep.ts
import axios from 'axios'

export type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export async function buscarCep(cep: string): Promise<ViaCepResponse | null> {
  try {
    const cepLimpo = cep.replace(/\D/g, '')
    
    if (cepLimpo.length !== 8) {
      return null
    }

    const { data } = await axios.get<ViaCepResponse>(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    )

    if (data.erro) {
      return null
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null
  }
}
```

**Uso no formulário:**
```typescript
import { buscarCep } from '@/lib/api/viacep'
import { toast } from 'sonner'

const handleCepBlur = async (cep: string) => {
  const endereco = await buscarCep(cep)
  
  if (endereco) {
    form.setValue('logradouro', endereco.logradouro)
    form.setValue('bairro', endereco.bairro)
    form.setValue('cidade', endereco.localidade)
    form.setValue('estado', endereco.uf)
    toast.success('CEP encontrado!')
  } else {
    toast.error('CEP não encontrado')
  }
}
```

### Validação e Máscara de CNPJ

```typescript
// lib/utils/cnpj.ts

export function formatarCNPJ(cnpj: string): string {
  const numeros = cnpj.replace(/\D/g, '')
  return numeros.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )
}

export function validarCNPJ(cnpj: string): boolean {
  const numeros = cnpj.replace(/\D/g, '')

  if (numeros.length !== 14) return false
  if (/^(\d)\1+$/.test(numeros)) return false

  let soma = 0
  let pos = 5
  for (let i = 0; i < 12; i++) {
    soma += parseInt(numeros.charAt(i)) * pos
    pos = pos === 2 ? 9 : pos - 1
  }
  const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  soma = 0
  pos = 6
  for (let i = 0; i < 13; i++) {
    soma += parseInt(numeros.charAt(i)) * pos
    pos = pos === 2 ? 9 : pos - 1
  }
  const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  return (
    digito1 === parseInt(numeros.charAt(12)) &&
    digito2 === parseInt(numeros.charAt(13))
  )
}
```

**Uso no schema Zod:**
```typescript
import { z } from 'zod'
import { validarCNPJ } from '@/lib/utils/cnpj'

const empresaSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cnpj: z.string()
    .min(14, 'CNPJ inválido')
    .refine(validarCNPJ, 'CNPJ inválido'),
  // ... outros campos
})
```

---

## ✅ Considerações Finais

1. **Manter Consistência**: Use os mesmos padrões de nomenclatura e estrutura em todos os módulos
2. **Performance First**: Aproveite Server Components, Streaming e cache do Next.js 15
3. **UX**: Sempre mostre estados de loading e erro adequados
4. **Acessibilidade**: Use componentes semânticos e ARIA labels
5. **Tipos**: Mantenha tipagem forte em todo o projeto
6. **Cache**: Configure adequadamente staleTime e gcTime no React Query
7. **Error Handling**: Sempre trate erros de API adequadamente
8. **Testing**: Considere adicionar testes unitários e de integração
9. **Documentação**: Mantenha README.md atualizado com instruções

---

**Autor**: Sistema de Documentação ERP  
**Data**: 03/10/2025  
**Versão**: 1.0.0
