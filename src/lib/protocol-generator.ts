import { Protocol } from '@/types/protocol';

// Simula um banco de dados local para protocolos
let protocolCounter = 1;
const protocols: Protocol[] = [];

// Adicionar alguns protocolos de exemplo para demonstração
const initializeProtocols = () => {
  if (protocols.length === 0) {
    // Protocolo 1
    protocols.push({
      id: '1',
      number: '2025-0124-000001',
      clientName: 'João Silva',
      clientDoc: '123.456.789-00',
      clientContact: '(24) 99999-9999',
      type: 'Suporte Técnico',
      channel: 'Telefone',
      date: new Date().toISOString().split('T')[0],
      time: '14:30',
      product: 'Link Dedicado - 50Mbps',
      description: 'Cliente relatando lentidão na conexão durante o período da tarde',
      attendant: 'Ana Silva',
      status: 'Em Andamento',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resolution: ''
    });

    // Protocolo 2
    protocols.push({
      id: '2',
      number: '2025-0124-000002',
      clientName: 'Empresa XYZ Ltda',
      clientDoc: '12.345.678/0001-90',
      clientContact: '(24) 77777-7777',
      type: 'Instalação',
      channel: 'WhatsApp',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      time: '09:15',
      product: 'Link Dedicado - 100Mbps',
      description: 'Solicitação de instalação de link dedicado 100MB',
      attendant: 'Carlos Pereira',
      status: 'Pendente',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      resolution: ''
    });

    // Protocolo 3
    protocols.push({
      id: '3',
      number: '2025-0123-000003',
      clientName: 'Maria Santos',
      clientDoc: '987.654.321-00',
      clientContact: '(24) 88888-8888',
      type: 'Suporte VoIP',
      channel: 'E-mail',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      time: '16:45',
      product: 'VoIP - Linha Premium',
      description: 'Problemas de qualidade de áudio nas ligações',
      attendant: 'Pedro Costa',
      status: 'Concluído',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date().toISOString(),
      resolution: 'Configuração de codec ajustada. Problema resolvido.'
    });

    protocolCounter = 4;
  }
};

export function generateProtocolNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // Formatar contador com 6 dígitos
  const counter = String(protocolCounter).padStart(6, '0');
  protocolCounter++;
  
  return `${year}-${month}${day}-${counter}`;
}

export function createProtocol(data: Omit<Protocol, 'id' | 'number' | 'createdAt' | 'updatedAt'>): Protocol {
  const id = crypto.randomUUID();
  const number = generateProtocolNumber();
  const now = new Date().toISOString();
  
  const protocol: Protocol = {
    ...data,
    id,
    number,
    createdAt: now,
    updatedAt: now
  };
  
  protocols.push(protocol);
  return protocol;
}

export function getProtocols(): Protocol[] {
  initializeProtocols(); // Garante que os protocolos de exemplo estejam carregados
  return [...protocols].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getProtocolByNumber(number: string): Protocol | undefined {
  return protocols.find(p => p.number === number);
}

export function getProtocolsByClient(clientDoc: string): Protocol[] {
  return protocols.filter(p => p.clientDoc === clientDoc)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateProtocol(id: string, updates: Partial<Protocol>): Protocol | undefined {
  const index = protocols.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  
  protocols[index] = {
    ...protocols[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return protocols[index];
}

export function searchProtocols(query: string): Protocol[] {
  initializeProtocols(); // Garante que os protocolos de exemplo estejam carregados
  const lowerQuery = query.toLowerCase();
  return protocols.filter(p => 
    p.number.toLowerCase().includes(lowerQuery) ||
    p.clientName.toLowerCase().includes(lowerQuery) ||
    p.clientDoc.includes(query) ||
    p.type.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.attendant.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Função para obter estatísticas dos protocolos
export function getProtocolStats() {
  initializeProtocols();
  const total = protocols.length;
  const concluidos = protocols.filter(p => p.status === 'Concluído').length;
  const pendentes = protocols.filter(p => p.status === 'Pendente').length;
  const emAndamento = protocols.filter(p => p.status === 'Em Andamento').length;
  
  return {
    total,
    concluidos,
    pendentes,
    emAndamento
  };
}

// Cliente mock para demonstração
const mockClients = [
  { name: 'João Silva', document: '123.456.789-00', contact: '(24) 99999-9999', email: 'joao@email.com' },
  { name: 'Maria Santos', document: '987.654.321-00', contact: '(24) 88888-8888', email: 'maria@email.com' },
  { name: 'Empresa XYZ Ltda', document: '12.345.678/0001-90', contact: '(24) 77777-7777', email: 'contato@xyz.com.br' }
];

export function searchClients(query: string) {
  return mockClients.filter(client => 
    client.name.toLowerCase().includes(query.toLowerCase()) ||
    client.document.includes(query)
  );
}