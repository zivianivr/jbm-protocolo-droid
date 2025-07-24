import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Protocol } from "@/types/protocol";
import { CalendarIcon, UserIcon, PhoneIcon, FileTextIcon, DownloadIcon, ShareIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProtocolCardProps {
  protocol: Protocol;
  onViewDetails?: (protocol: Protocol) => void;
}

const statusColors = {
  'Em Andamento': 'bg-blue-500',
  'Concluído': 'bg-green-500',
  'Pendente': 'bg-yellow-500',
  'Escalado': 'bg-orange-500',
  'Cancelado': 'bg-red-500'
};

export function ProtocolCard({ protocol, onViewDetails }: ProtocolCardProps) {
  const { toast } = useToast();

  const handleShare = () => {
    const text = `Protocolo JBM Telecom: ${protocol.number}\nCliente: ${protocol.clientName}\nStatus: ${protocol.status}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Protocolo JBM Telecom',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Protocolo copiado!",
        description: "Informações do protocolo copiadas para a área de transferência.",
      });
    }
  };

  const handleDownload = () => {
    // Simular download de PDF
    toast({
      title: "Download iniciado",
      description: "O PDF do protocolo está sendo preparado...",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow jbm-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-primary">
              {protocol.number}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(protocol.createdAt).toLocaleDateString('pt-BR')} às {protocol.time}
            </p>
          </div>
          <Badge 
            className={`${statusColors[protocol.status]} text-white`}
          >
            {protocol.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{protocol.clientName}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-muted-foreground" />
            <span>{protocol.clientContact}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            <span>{protocol.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{protocol.channel}</span>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded-md">
          <p className="text-sm text-muted-foreground mb-1">Descrição:</p>
          <p className="text-sm line-clamp-2">{protocol.description}</p>
        </div>

        {protocol.resolution && (
          <div className="bg-primary/10 p-3 rounded-md">
            <p className="text-sm text-primary font-medium mb-1">Resolução:</p>
            <p className="text-sm line-clamp-2">{protocol.resolution}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(protocol)}
            className="flex-1"
          >
            Ver Detalhes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <ShareIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}