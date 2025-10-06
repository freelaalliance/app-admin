import { QueryClient } from '@tanstack/react-query'

/**
 * Prefetch de queries para melhorar performance
 * Chame estas funções em eventos de hover ou navegação
 */

export async function prefetchModuleData(
  queryClient: QueryClient,
  empresaId: string,
  module: 'calibracao' | 'compras' | 'documentos' | 'expedicao' | 'vendas' | 'recebimentos' | 'rh' | 'manutencao'
) {
  const queryKeys: Record<string, any[]> = {
    calibracao: [
      ['calibracao', 'estatisticas', empresaId],
      ['calibracao', 'agenda', empresaId],
      ['calibracao', 'historico', empresaId],
    ],
    compras: [
      ['compras', 'resumo', empresaId],
      ['compras', 'pedidos', empresaId],
      ['compras', 'fornecedores', empresaId],
    ],
    documentos: [
      ['documentos', 'resumo', empresaId],
      ['documentos', 'recentes', empresaId],
    ],
    expedicao: [
      ['expedicao', 'resumo', empresaId],
      ['expedicao', 'expedicoes', empresaId],
    ],
    vendas: [
      ['vendas', 'resumo', empresaId],
      ['vendas', 'pedidos', empresaId],
    ],
    recebimentos: [
      ['recebimentos', 'resumo', empresaId],
      ['recebimentos', 'recebimentos', empresaId],
    ],
    rh: [
      ['rh', 'resumo', empresaId],
      ['rh', 'funcionarios', empresaId],
      ['rh', 'departamentos', empresaId],
    ],
    manutencao: [
      ['manutencao', 'resumo', empresaId],
      ['manutencao', 'ordens', empresaId],
    ],
  }

  const keys = queryKeys[module] || []

  // Prefetch todas as queries do módulo
  await Promise.all(
    keys.map((key) =>
      queryClient.prefetchQuery({
        queryKey: key,
        // As queries já estão configuradas nos hooks
        staleTime: 5 * 60 * 1000, // 5 minutos
      })
    )
  )
}

export function prefetchOnHover(
  queryClient: QueryClient,
  empresaId: string,
  module: 'calibracao' | 'compras' | 'documentos' | 'expedicao' | 'vendas' | 'recebimentos' | 'rh' | 'manutencao'
) {
  return {
    onMouseEnter: () => prefetchModuleData(queryClient, empresaId, module),
  }
}
