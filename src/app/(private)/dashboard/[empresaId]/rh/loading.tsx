import { Skeleton } from '@/components/ui/skeleton'

export default function RHLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>

      {/* Rotatividade Skeleton */}
      <Skeleton className="h-96 w-full" />

      {/* Grid Cargos Skeleton */}
      <div>
        <Skeleton className="h-7 w-64 mb-4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>

      {/* Treinamentos Skeleton */}
      <Skeleton className="h-96 w-full" />

      {/* Colaboradores Skeleton */}
      <div>
        <Skeleton className="h-7 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}
