"use client"

import { useSearchParams } from "next/navigation";
import { TabelaPerfil } from "./_components/tabela/perfis/tabela-perfil";
import { usePerfisEmpresa } from "@/hooks/_empresas/_hooks/useAdminData";

export default function PagePerfisEmpresa() {
  const searchParams = useSearchParams()
  const empresaIdParam = searchParams.get('empresa')

  const { data, isFetching } = usePerfisEmpresa(empresaIdParam ?? '')

  return (
    <div className="grid space-y-6 p-6">
      <TabelaPerfil
        data={data ?? []}
        carregandoPerfis={isFetching}
        empresa={empresaIdParam ?? ""}
      />
    </div>
  )
}
