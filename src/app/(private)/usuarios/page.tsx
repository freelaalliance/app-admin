"use client"

import { useUsuarios } from "@/hooks/_empresas/_hooks/useAdminData"
import { useSearchParams } from "next/navigation"
import { DataTableUsuarios } from "./components/tabela/lista-usuarios/tabela-usuarios"

export default function UsuariosPage(){

  const searchParams = useSearchParams()
  const idEmpresa = searchParams.get('empresa') || ''

  const { data: listaUsuarios, isFetching } = useUsuarios(idEmpresa)

  return (
    <div className="grid space-y-6 p-6">
      <DataTableUsuarios data={listaUsuarios ?? []} empresa={idEmpresa} carregandoUsuarios={isFetching} />
    </div>
  )
}