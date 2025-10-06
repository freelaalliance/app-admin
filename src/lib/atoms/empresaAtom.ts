import { atom, useAtom } from 'jotai'

type EmpresaState = {
  selected: string | null
}

const empresaAtom = atom<EmpresaState>({
  selected: null,
})

export function useEmpresa() {
  return useAtom(empresaAtom)
}
