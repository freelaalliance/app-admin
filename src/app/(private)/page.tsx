'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Plus, Building2, Package, Users as UsersIcon, Settings } from 'lucide-react'
import { EmpresaDialog } from '@/hooks/_empresas/_components/dialogs/EmpresaDialog'
import { ModulosTab } from '@/hooks/_empresas/_components/tabs/ModulosTab'
import { PerfisTab } from '@/hooks/_empresas/_components/tabs/PerfisTab'
import { UsuariosTab } from '@/hooks/_empresas/_components/tabs/UsuariosTab'
import {
  useModulosEmpresa
} from '@/hooks/_empresas/_hooks/useAdminData'
import { empresaType, EmpresaFormType } from '@/hooks/_empresas/_types/empresaTypes'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { createEmpresa, updateEmpresa } from '@/hooks/_empresas/_api/empresasApi'


export default function AdminEmpresasPage() {

  // Main render
  return (
    <></>
  )
}

