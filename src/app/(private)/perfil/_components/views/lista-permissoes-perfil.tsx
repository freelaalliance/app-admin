import { PermissaoPerfilType } from "@/hooks/_empresas/_types/perfilTypes"
import { DataTablePermissoes } from "../tabela/permissoes-perfil/tabela-permissoes"

interface ListaPermissoesPerfilProps {
  idPerfil: string
  listaPermissoesVinculado: Array<PermissaoPerfilType>
}
export default function ListaPermissoesPerfil({
  idPerfil,
  listaPermissoesVinculado,
}: ListaPermissoesPerfilProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-center">
      <DataTablePermissoes
        data={listaPermissoesVinculado}
        idPerfil={idPerfil}
      />
    </div>
  )
}
