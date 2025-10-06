'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const paths = pathname.split('/').filter(Boolean)
    const items: BreadcrumbItem[] = [{ label: 'Início', href: '/dashboard' }]

    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`

      // Pular IDs numéricos (empresaId)
      if (!isNaN(Number(path))) {
        return
      }

      // Mapear nomes de rota para labels amigáveis
      const labelMap: Record<string, string> = {
        dashboard: 'Dashboard',
        calibracao: 'Calibração',
        compras: 'Compras',
        documentos: 'Documentos',
        expedicao: 'Expedição',
        vendas: 'Vendas',
        recebimentos: 'Recebimentos',
        rh: 'Recursos Humanos',
        manutencao: 'Manutenção',
        admin: 'Administração',
        empresas: 'Empresas',
      }

      const label = labelMap[path] || path.charAt(0).toUpperCase() + path.slice(1)
      
      // Último item não tem link
      if (index === paths.length - 1) {
        items.push({ label })
      } else {
        items.push({ label, href: currentPath })
      }
    })

    setBreadcrumbs(items)
  }, [pathname])

  if (breadcrumbs.length <= 1) return null

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Home className="h-4 w-4 text-white/80" />
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="h-4 w-4 text-white/60" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
