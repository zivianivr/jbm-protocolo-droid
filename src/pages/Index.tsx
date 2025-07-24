import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { ProtocolForm } from "@/components/ProtocolForm";
import { ProtocolList } from "@/components/ProtocolList";
import { PlusIcon, FileTextIcon, SearchIcon, BarChart3Icon, PhoneIcon, MapPinIcon, MailIcon } from "lucide-react";
import { Protocol } from "@/types/protocol";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

  const handleProtocolCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <PhoneIcon className="h-4 w-4" />
                <span>024 3511-0100</span>
              </div>
              <div className="flex items-center gap-1">
                <MailIcon className="h-4 w-4" />
                <span>contato@jbmtelecom.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Sistema de <span className="text-primary">Gestão de Protocolos</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gerencie protocolos de atendimento para suporte VoIP, links dedicados e demais serviços da JBM Telecom
          </p>
        </div>

        <Tabs defaultValue="novo" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-lg mx-auto mb-8">
            <TabsTrigger value="novo" className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Novo</span>
            </TabsTrigger>
            <TabsTrigger value="lista" className="flex items-center gap-2">
              <FileTextIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Protocolos</span>
            </TabsTrigger>
            <TabsTrigger value="busca" className="flex items-center gap-2">
              <SearchIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Buscar</span>
            </TabsTrigger>
            <TabsTrigger value="relatorios" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              <span className="hidden sm:inline">Relatórios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="novo" className="space-y-6">
            <ProtocolForm onProtocolCreated={handleProtocolCreated} />
          </TabsContent>

          <TabsContent value="lista" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Protocolos de Atendimento</h2>
              <p className="text-muted-foreground">Visualize e gerencie todos os protocolos cadastrados</p>
            </div>
            <ProtocolList refreshTrigger={refreshTrigger} onProtocolSelect={setSelectedProtocol} />
          </TabsContent>

          <TabsContent value="busca" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Buscar Protocolos</h2>
              <p className="text-muted-foreground">Encontre protocolos específicos usando filtros avançados</p>
            </div>
            <ProtocolList refreshTrigger={refreshTrigger} onProtocolSelect={setSelectedProtocol} />
          </TabsContent>

          <TabsContent value="relatorios" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Relatórios e Estatísticas</h2>
              <p className="text-muted-foreground">Analise o desempenho dos atendimentos</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Total de Protocolos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">0</div>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">0</div>
                  <p className="text-xs text-muted-foreground">Resolvidos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">0</div>
                  <p className="text-xs text-muted-foreground">Aguardando</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">--</div>
                  <p className="text-xs text-muted-foreground">Resolução</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades em Desenvolvimento</CardTitle>
                <CardDescription>
                  Relatórios detalhados e dashboards estarão disponíveis em breve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Relatórios por período</li>
                  <li>• Análise de desempenho por atendente</li>
                  <li>• Gráficos de volume de atendimentos</li>
                  <li>• Exportação de dados</li>
                  <li>• Métricas de satisfação</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Soluções de conectividade avançadas para impulsionar o seu negócio.
              </p>
              <p className="text-xs text-muted-foreground">
                99,9% de disponibilidade ao ano
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>024 3511-0100</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />
                  <span>contato@jbmtelecom.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span>www.jbmtelecom.com.br</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Internet Dedicada</li>
                <li>PABX em Nuvem</li>
                <li>Telefonia VoIP</li>
                <li>Monitoramento 24x7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-4 text-center text-xs text-muted-foreground">
            © 2025 JBM Telecom. Sistema de Gestão de Protocolos - Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;