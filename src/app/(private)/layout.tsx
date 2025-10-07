import { AppSidebar } from "@/components/layout/AppSidebar"
import { DashboardHeader } from "@/components/layout/DashboardHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }>
      <Suspense fallback={<Skeleton className="w-72 h-screen" />}>
        <AppSidebar
          variant="inset"
        />
      </Suspense>
      <SidebarInset className="shadow-[inset_0_0_20px_0px_rgba(0,0,0,0.1)]">
        <DashboardHeader />
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}