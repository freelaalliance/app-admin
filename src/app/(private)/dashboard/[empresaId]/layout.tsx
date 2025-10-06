import { DashboardHeader } from '@/components/layout/DashboardHeader'

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  )
}
