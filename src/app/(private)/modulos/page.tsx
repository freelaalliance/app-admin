import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ModulosContent } from "./_components/ModulosContent"

// Marca a página como dinâmica para evitar erros de pre-rendering com useSearchParams
export const dynamic = 'force-dynamic'

export default function PageVinculoModulosEmpresa() {
  return (
    <Suspense fallback={<div className="grid space-y-6 p-6"><Skeleton className="w-full h-96" /></div>}>
      <ModulosContent />
    </Suspense>
  )
}