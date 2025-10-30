
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download } from 'lucide-react'
import { downloadFile } from '../../../_actions/upload-actions'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RevisoesDocumentoType } from '../../../_types/documentosTypes'

interface TabelaRevisoesDocumentoProps {
  revisoes: Array<RevisoesDocumentoType>
}

export function TabelaRevisoesDocumento({
  revisoes,
}: TabelaRevisoesDocumentoProps) {
  const handleDownload = async (arquivo: string) => {
    const url = await downloadFile(arquivo)

    if (url) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', arquivo)
      link.setAttribute('target', '_blank')
      document.body.appendChild(link)
      link.click()
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader className='select-none'>
          <TableRow>
            <TableHead>Revisão</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Arquivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {revisoes.map(revisao => (
            <TableRow key={revisao.id}>
              <TableCell>{revisao.numeroRevisao}</TableCell>
              <TableCell>
                {format(new Date(revisao.revisadoEm),  'P', {
                  locale: ptBR
                })}
              </TableCell>
              <TableCell>{revisao.usuario}</TableCell>
              <TableCell>
                <Button
                  variant="default"
                  onClick={() => handleDownload(revisao.arquivoId)}
                >
                  <Download className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className='flex flex-row h-8 items-center select-none px-4'>
          <span>{`${revisoes.length} ${revisoes.length <= 1 ? 'revisão registrada' : 'revisões registradas'}`}</span>
        </TableFooter>
      </Table>
    </div>
  )
}
