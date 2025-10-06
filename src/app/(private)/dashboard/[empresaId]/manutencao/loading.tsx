import { Skeleton } from '@/components/ui/skeleton'

export default function ManutencaoLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Seletor Skeleton */}
      <Skeleton className="h-10 w-[300px]" />

      {/* Tabs Skeleton */}
      <Skeleton className="h-12 w-full max-w-2xl" />

      {/* Content Skeleton */}
      <div className="space-y-6">
        {/* Cards MTTR/MTBF */}
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>

        {/* Cards Indicadores */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>

        {/* Gráfico */}
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
}
