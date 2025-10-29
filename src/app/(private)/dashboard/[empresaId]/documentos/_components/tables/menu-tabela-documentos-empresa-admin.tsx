
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RemoverDocumentoAlertDialog } from '../dialogs/remover-documento-empresa-dialog';
import { DadosDocumentoDialog } from '../dialogs/documento-dialog';
import { DocumentoType } from '../../_types/documentosTypes';
import { downloadFile } from '../../_actions/upload-actions';
//import { RemoverDocumentoAlertDialog } from '@/app/modulo/administrativo/modulos/documentos/_components/dialogs/remover-documento-empresa-dialog';

interface MenuTabelaDocumentosEmpresaProps {
  documento: DocumentoType
}

export function MenuTabelaDocumentosEmpresaAdmin({ documento }: MenuTabelaDocumentosEmpresaProps) {

  const handleDownload = async (arquivo: string) => {
    const url = await downloadFile(arquivo);

    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', arquivo);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="size-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleDownload(
          documento.revisoes[0].arquivoUrl
        )}>
          Baixar última revisão
        </DropdownMenuItem>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={e => {
              e.preventDefault()
            }}>
              Detalhes
            </DropdownMenuItem>
          </DialogTrigger>
          <DadosDocumentoDialog documento={documento} />
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={e => {
                e.preventDefault()
              }}
            >
              Remover documento
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <RemoverDocumentoAlertDialog documento={documento}/>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
