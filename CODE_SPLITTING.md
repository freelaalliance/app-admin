# Code Splitting - Next.js 15

Este projeto utiliza code splitting automático do Next.js para otimizar o carregamento.

## Estratégias Implementadas

### 1. Route-based Code Splitting (Automático)
O Next.js automaticamente divide o código por rotas usando o App Router:
- Cada `page.tsx` é um chunk separado
- Carregamento lazy automático de rotas

### 2. Component-based Code Splitting (Manual)

Use `next/dynamic` para componentes pesados:

```tsx
import dynamic from 'next/dynamic'

// Componentes pesados (charts, PDF viewers, editores)
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  loading: () => <LoadingSkeleton type="card" />,
  ssr: false, // Desabilita SSR se necessário
})

const ChartComponent = dynamic(
  () => import('recharts').then(mod => ({ default: mod.LineChart })),
  { ssr: false }
)

// Módulos administrativos
const AdminModule = dynamic(() => import('./admin/empresas'), {
  loading: () => <LoadingSkeleton type="table" count={5} />,
})
```

### 3. Library Code Splitting

Bibliotecas pesadas devem ser carregadas dinamicamente:

```tsx
// PDF Export
const handleExportPDF = async () => {
  const { exportToPDF } = await import('@/lib/utils/pdfExport')
  exportToPDF({ title, filename, columns, data })
}

// Excel Export
const handleExportExcel = async () => {
  const { exportToExcel } = await import('@/lib/utils/excelExport')
  exportToExcel({ filename, data, columns })
}

// Charts (Recharts)
const LineChart = dynamic(
  () => import('recharts').then(mod => mod.LineChart),
  { ssr: false }
)
```

### 4. Suspense Boundaries

Usado em conjunto com React Suspense:

```tsx
import { Suspense } from 'react'
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton'

export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton type="card" count={3} />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### 5. Prefetching Inteligente

Prefetch de módulos no hover:

```tsx
import { useQueryClient } from '@tanstack/react-query'
import { prefetchOnHover } from '@/lib/utils/prefetch'

function ModuleCard({ module, empresaId }) {
  const queryClient = useQueryClient()
  
  return (
    <Card {...prefetchOnHover(queryClient, empresaId, module)}>
      {/* Card content */}
    </Card>
  )
}
```

## Componentes que Devem Usar Code Splitting

### Pesados (>50KB)
- ✅ Recharts (LineChart, BarChart, PieChart)
- ✅ jsPDF + autoTable (PDF export)
- ✅ xlsx (Excel export)
- ✅ Editores de texto ricos (se adicionar no futuro)
- ✅ Visualizadores de PDF

### Módulos Grandes
- ✅ Admin/Empresas (20 arquivos, múltiplos componentes)
- ✅ RH (5h de desenvolvimento, muitos formulários)
- ✅ Manutenção (6h de desenvolvimento, dashboards complexos)

### Componentes Condicionais
- ✅ Modais/Dialogs que não aparecem imediatamente
- ✅ Componentes de exportação (só carrega quando clica)
- ✅ Formulários complexos em abas

## Análise de Bundle

Para verificar o tamanho dos bundles:

```bash
# Build de produção
npm run build

# Analyze (se configurado)
npm run analyze
```

## Métricas de Performance

Monitore:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## Recomendações

1. **Sempre use `next/dynamic`** para componentes > 50KB
2. **Adicione Suspense boundaries** em páginas com queries assíncronas
3. **Prefetch no hover** para melhorar navegação
4. **Lazy load modais** que não aparecem na tela inicial
5. **SSR false** para componentes client-only (charts, maps)

## Exemplo Completo

```tsx
'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton'

// Code splitting de chart pesado
const DashboardChart = dynamic(
  () => import('@/components/charts/DashboardChart'),
  {
    loading: () => <LoadingSkeleton type="card" />,
    ssr: false,
  }
)

// Export dinâmico
const handleExport = async (format: 'pdf' | 'excel') => {
  if (format === 'pdf') {
    const { exportToPDF } = await import('@/lib/utils/pdfExport')
    exportToPDF({ title: 'Relatório', filename: 'relatorio', columns, data })
  } else {
    const { exportToExcel } = await import('@/lib/utils/excelExport')
    exportToExcel({ filename: 'relatorio', data })
  }
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  })

  return (
    <div className="space-y-6">
      {/* Conteúdo estático carrega imediatamente */}
      <Header onExport={handleExport} />

      {/* Chart pesado em Suspense */}
      <Suspense fallback={<LoadingSkeleton type="card" count={2} />}>
        {!isLoading && <DashboardChart data={data} />}
      </Suspense>
    </div>
  )
}
```

---

**Última atualização**: Fase 4 - Otimizações
