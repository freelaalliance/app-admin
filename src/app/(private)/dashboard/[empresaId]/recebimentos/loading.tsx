import { Skeleton } from '@/components/ui/skeleton'

export default function RecebimentosLoading() {
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

      {/* Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>

      {/* Filtro Skeleton */}
      <Skeleton className="h-24 w-full" />

      {/* Gráfico Skeleton */}
      <Skeleton className="h-80 w-full" />

      {/* Tabela Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-64" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    </div>
  )
}
