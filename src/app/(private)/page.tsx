'use client'

import {
  Building2,
  Package, UserCircle2
} from "lucide-react"
import { MetricCard, MetricCardSkeleton } from "@/components/shared/MetricCard"
import {
  useDashboardStats,
  useEmpresas,
  useModulos
} from "@/hooks/_empresas/_hooks/useAdminData"

export default function AdminDashboardPage() {
  // Hooks de dados existentes
  const { data: empresas, isFetching: empresasLoading } = useEmpresas()
  const { data: modulos, isFetching: modulosLoading } = useModulos()
  const { data: dashboardStats, isFetching: dashboardStatsLoading } = useDashboardStats()

  // Calcular métricas básicas dos dados existentes
  const totalEmpresas = empresas?.length || 0
  const totalModulos = modulos?.length || 0
  const totalUsuariosAtivos = dashboardStats?.totalUsuariosAtivos || 0
  const totalModulosEmUso = dashboardStats?.totalModulosEmUso || 0
  const empresasRecentesCadastradas = dashboardStats?.empresasRecentesCadastradas || 0
  const modulosMaisUtilizados = dashboardStats?.modulosMaisUtilizados || []

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral do sistema Alliance ERP
          </p>
        </div>
        
      </div>

      {/* Métricas Básicas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {empresasLoading ? (
          <MetricCardSkeleton />
        ) : (
          <MetricCard
            title="Total de Empresas"
            value={totalEmpresas}
            icon={Building2}
            description="Empresas cadastradas no sistema"
            formatter={(value) => value.toString()}
          />
        )}
        {modulosLoading ? (
          <MetricCardSkeleton />
        ) : (
          <MetricCard
            title="Total de Módulos"
            value={totalModulos}
            icon={Package}
            description="Módulos disponíveis"
            formatter={(value) => value.toString()}
          />
        )}
        {dashboardStatsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <MetricCardSkeleton key={index} showTrend />
          ))
        ) : (
          <>
            <MetricCard
              title="Usuários Ativos"
              value={totalUsuariosAtivos}
              icon={UserCircle2}
              description="Usuários ativos no sistema"
              formatter={(value) => value.toString()}
            />
            <MetricCard
              title="Módulos em Uso"
              value={totalModulosEmUso}
              icon={Package}
              description="Módulos atualmente em uso"
              formatter={(value) => value.toString()}
            />
            <MetricCard
              title="Empresas Recentes"
              value={empresasRecentesCadastradas}
              icon={Building2}
              description="Empresas cadastradas no último mês"
              formatter={(value) => value.toString()}
            />
            <MetricCard
              title="Módulos Mais Utilizados"
              value={modulosMaisUtilizados.length}
              icon={Package}
              description="Módulos mais utilizados"
              formatter={(value) => value.toString()}
            />
          </>
        )}
      </div>
    </div>
  )
}

