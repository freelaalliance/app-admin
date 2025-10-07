import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { ReactQueryProvider } from '@/lib/react-query'
import { Toaster } from 'sonner'
import { ToastProvider } from '@/components/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ERP Alliance - Admin',
  description: 'Sistema de gestão empresarial administrativo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" >
      <body className={inter.className} suppressHydrationWarning>
        <ReactQueryProvider>
          {children}
          <Toaster richColors />
          <ToastProvider />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
