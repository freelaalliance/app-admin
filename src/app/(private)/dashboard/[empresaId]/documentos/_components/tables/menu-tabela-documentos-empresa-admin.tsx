
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RemoverDocumentoAlertDialog } from '../dialogs/remover-documento-empresa-dialog';
import { DadosDocumentoDialog } from '../dialogs/documento-dialog';
import { DocumentoType } from '../../_types/documentosTypes';
import { downloadFile } from '../../_actions/upload-actions';
import { toast } from 'sonner';

interface MenuTabelaDocumentosEmpresaProps {
  documento: DocumentoType
}

export function MenuTabelaDocumentosEmpresaAdmin({ documento }: MenuTabelaDocumentosEmpresaProps) {

  const handleDownload = async (arquivo: string) => {
    try {
      const result = await downloadFile(arquivo);

      if (!result.success) {
        toast.error(result.message || 'Erro ao baixar arquivo');
        return;
      }

      // Abre o arquivo em uma nova aba (bom para visualizar PDFs)
      window.open(result.url, '_blank');
      toast.success('Download iniciado!');
    } catch (error) {
      toast.error('Erro ao baixar arquivo. Tente novamente.');
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
      <DropdownMenuContent align="end" className="w-40">
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
