import { Protocol } from '@/types/protocol';

// Simula um banco de dados local para protocolos
let protocolCounter = 1;
const protocols: Protocol[] = [];

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