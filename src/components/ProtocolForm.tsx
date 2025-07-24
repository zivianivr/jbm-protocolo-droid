import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, FileTextIcon, CheckCircleIcon } from "lucide-react";
import { AttendanceTypes, AttendanceChannels, AttendanceStatus, Products } from "@/types/protocol";
import { createProtocol, searchClients } from "@/lib/protocol-generator";
import { useToast } from "@/hooks/use-toast";

interface ProtocolFormProps {
  onProtocolCreated?: (protocol: any) => void;
}

export function ProtocolForm({ onProtocolCreated }: ProtocolFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    channel: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    clientName: '',
    clientDoc: '',
    clientContact: '',
    product: '',
    description: '',
    resolution: '',
    status: 'Em Andamento' as const,
    attendant: 'Atendente Sistema', // Seria preenchido pelo usuário logado
    internalNotes: ''
  });

  const [clientSuggestions, setClientSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (formData.clientName.length > 2) {
      const suggestions = searchClients(formData.clientName);
      setClientSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.clientName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.channel || !formData.clientName || !formData.clientDoc || !formData.description) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const protocol = createProtocol(formData);
      
      toast({
        title: "Protocolo gerado com sucesso!",
        description: `Número do protocolo: ${protocol.number}`,
        variant: "default"
      });

      onProtocolCreated?.(protocol);
      
      // Reset form
      setFormData({
        type: '',
        channel: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].slice(0, 5),
        clientName: '',
        clientDoc: '',
        clientContact: '',
        product: '',
        description: '',
        resolution: '',
        status: 'Em Andamento',
        attendant: 'Atendente Sistema',
        internalNotes: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar protocolo",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const selectClient = (client: any) => {
    setFormData(prev => ({
      ...prev,
      clientName: client.name,
      clientDoc: client.document,
      clientContact: client.contact
    }));
    setShowSuggestions(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto jbm-shadow">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <FileTextIcon className="h-6 w-6 text-primary" />
          Gerar Novo Protocolo de Atendimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Atendimento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              Informações do Atendimento
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Atendimento *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {AttendanceTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel">Canal de Atendimento *</Label>
                <Select value={formData.channel} onValueChange={(value) => setFormData(prev => ({ ...prev, channel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o canal" />
                  </SelectTrigger>
                  <SelectContent>
                    {AttendanceChannels.map(channel => (
                      <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  Hora
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações do Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Informações do Cliente
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="clientName">Nome Completo/Empresa *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="Digite o nome do cliente"
                />
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                    {clientSuggestions.map((client, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-accent cursor-pointer"
                        onClick={() => selectClient(client)}
                      >
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.document}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientDoc">CPF/CNPJ *</Label>
                <Input
                  id="clientDoc"
                  value={formData.clientDoc}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientDoc: e.target.value }))}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientContact" className="flex items-center gap-1">
                  <PhoneIcon className="h-4 w-4" />
                  Contato
                </Label>
                <Input
                  id="clientContact"
                  value={formData.clientContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientContact: e.target.value }))}
                  placeholder="(24) 99999-9999"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Detalhes do Atendimento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Detalhes do Atendimento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product">Produto/Serviço</Label>
                <Select value={formData.product} onValueChange={(value) => setFormData(prev => ({ ...prev, product: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto/serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {Products.map(product => (
                      <SelectItem key={product} value={product}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AttendanceStatus.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição do Problema/Solicitação *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva detalhadamente o problema ou solicitação do cliente..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution">Ações Realizadas/Resolução</Label>
              <Textarea
                id="resolution"
                value={formData.resolution}
                onChange={(e) => setFormData(prev => ({ ...prev, resolution: e.target.value }))}
                placeholder="Descreva as ações realizadas para resolver o problema..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="internalNotes">Observações Internas</Label>
              <Textarea
                id="internalNotes"
                value={formData.internalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, internalNotes: e.target.value }))}
                placeholder="Notas que não serão compartilhadas com o cliente..."
                rows={2}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="jbm-gradient hover:opacity-90 min-w-[200px]">
              Gerar Protocolo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}