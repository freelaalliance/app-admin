"use client"

import { ListaModulos } from "@/components/modulos/lista-modulos"
import { Button } from "@/components/ui/button"
import { useAtivarModulo, useModulos, useModulosEmpresa } from "@/hooks/_empresas/_hooks/useAdminData"
import { Plus, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { TabelaModulosEmpresa } from "./modulos-vinculados/tabela-modulos"
import { toast } from "sonner"

export function ModulosContent() {
  const searchParams = useSearchParams()
  const empresaIdParam = searchParams.get('empresa')

  const { data: modulosEmpresa, isFetching: carregandoModulosEmpresa } = useModulosEmpresa(empresaIdParam ?? '')
  const { data: modulos, isFetching: carregandoModulos } = useModulos()

  const modulosNaoVinculado =
    modulos?.filter(modulo => {
      if (modulosEmpresa) {
        const moduloVinculado = modulosEmpresa.some(
          moduloEmpresa => moduloEmpresa.id === modulo.id
        )

        return !moduloVinculado
      }

      return true
    }) ?? []

  const [moduloSelecionado, selecionarModulo] = useState<string | null>(null)

  const vincularModuloEmpresa = useAtivarModulo()

  return (
    <div className="grid space-y-6 p-6">
      <div className="flex flex-col items-center md:flex-row justify-between gap-2">
        <ListaModulos
          buscandoModulos={carregandoModulos}
          listaModulos={modulosNaoVinculado}
          selecionarModulo={selecionarModulo}
          moduloSelecionado={moduloSelecionado} />

        {!vincularModuloEmpresa.isPending ? (
          <Button
            className="shadow flex justify-center md:justify-between gap-2 w-24 md:w-auto"
            disabled={!moduloSelecionado}
            onClick={async () => {

              if (moduloSelecionado) {
                await vincularModuloEmpresa.mutateAsync({
                  empresaId: empresaIdParam ?? "",
                  idModulo: moduloSelecionado
                })
              } else {
                toast.warning(
                  'Selecione o módulo que deseja vincular a esta empresa'
                )
              }
            }}
          >
            <Plus />
            <span className="hidden md:flex">Vincular</span>
          </Button>
        ) : (
          <Button
            className="shadow flex md:justify-between gap-2 w-24 md:w-auto"
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="hidden md:flex">Vinculando...</span>
          </Button>
        )}
      </div>
      <div className="flex-1">
        <TabelaModulosEmpresa
          idEmpresa={empresaIdParam ?? ""}
          data={modulosEmpresa ?? []}
          carregandoDados={carregandoModulosEmpresa} />
      </div>
    </div>
  )
}
