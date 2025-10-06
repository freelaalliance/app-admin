import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '../Breadcrumbs'

// Mock do usePathname do Next.js
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard/123/calibracao',
}))

// Mock do Link do Next.js
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Breadcrumbs', () => {
  it('deve renderizar breadcrumb Início', () => {
    render(<Breadcrumbs />)
    expect(screen.getByText('Início')).toBeInTheDocument()
  })

  it('deve renderizar caminho Dashboard', () => {
    render(<Breadcrumbs />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('deve renderizar módulo com label correto', () => {
    render(<Breadcrumbs />)
    expect(screen.getByText('Calibração')).toBeInTheDocument()
  })

  it('deve renderizar links clicáveis exceto o último', () => {
    render(<Breadcrumbs />)
    
    const inicioLink = screen.getByText('Início').closest('a')
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    const calibracaoSpan = screen.getByText('Calibração').closest('span')

    expect(inicioLink).toHaveAttribute('href', '/dashboard')
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    expect(calibracaoSpan).toBeInTheDocument()
  })
})
