export interface Protocol {
  id: string;
  number: string; // Formato: AAAA-MMDD-NNNNNN
  type: string;
  channel: string;
  date: string;
  time: string;
  clientName: string;
  clientDoc: string; // CPF/CNPJ
  clientContact: string;
  product: string;
  description: string;
  resolution: string;
  status: 'Em Andamento' | 'Concluído' | 'Pendente' | 'Escalado' | 'Cancelado';
  attendant: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  name: string;
  document: string;
  contact: string;
  email?: string;
  address?: string;
}

export const AttendanceTypes = [
  'Suporte VoIP',
  'Suporte Link Dedicado', 
  'Instalação',
  'Orçamento',
  'Comercial',
  'Financeiro',
  'Outros'
];

export const AttendanceChannels = [
  'WhatsApp',
  'Telefone',
  'E-mail',
  'Presencial'
];

export const AttendanceStatus = [
  'Em Andamento',
  'Concluído', 
  'Pendente',
  'Escalado',
  'Cancelado'
];

export const Products = [
  'VoIP - Linha Básica',
  'VoIP - Linha Premium',
  'Link Dedicado - 10Mbps',
  'Link Dedicado - 50Mbps',
  'Link Dedicado - 100Mbps',
  'Link Dedicado - 500Mbps',
  'PABX em Nuvem',
  'Telefonia IP',
  'Monitoramento 24x7',
  'Outros'
];