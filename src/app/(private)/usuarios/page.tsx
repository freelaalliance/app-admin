import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { UsuariosContent } from "./_components/UsuariosContent"

// Marca a página como dinâmica para evitar erros de pre-rendering com useSearchParams
export const dynamic = 'force-dynamic'

export default function UsuariosPage() {
  return (
    <Suspense fallback={<div className="grid space-y-6 p-6"><Skeleton className="h-[400px] w-full" /></div>}>
      <UsuariosContent />
    </Suspense>
  )
}