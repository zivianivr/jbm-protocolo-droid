import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProtocolCard } from "./ProtocolCard";
import { Protocol } from "@/types/protocol";
import { SearchIcon, FilterIcon, RefreshCwIcon } from "lucide-react";
import { getProtocols, searchProtocols } from "@/lib/protocol-generator";
import { AttendanceStatus, AttendanceTypes } from "@/types/protocol";

interface ProtocolListProps {
  onProtocolSelect?: (protocol: Protocol) => void;
  refreshTrigger?: number;
}

export function ProtocolList({ onProtocolSelect, refreshTrigger }: ProtocolListProps) {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshProtocols = () => {
    setIsLoading(true);
    // Simular loading
    setTimeout(() => {
      setProtocols(getProtocols());
      setIsLoading(false);
    }, 500);
  };

  // Load protocols on mount and when refreshTrigger changes
  useState(() => {
    refreshProtocols();
  });

  useState(() => {
    if (refreshTrigger) {
      refreshProtocols();
    }
  });

  const filteredProtocols = useMemo(() => {
    let filtered = searchQuery ? searchProtocols(searchQuery) : protocols;
    
    if (statusFilter) {
      filtered = filtered.filter(p => p.status === statusFilter);
    }
    
    if (typeFilter) {
      filtered = filtered.filter(p => p.type === typeFilter);
    }
    
    return filtered;
  }, [protocols, searchQuery, statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por número, cliente, CPF/CNPJ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os status</SelectItem>
            {AttendanceStatus.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os tipos</SelectItem>
            {AttendanceTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={refreshProtocols}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          <RefreshCwIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredProtocols.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">
              {searchQuery || statusFilter || typeFilter 
                ? "Nenhum protocolo encontrado com os filtros aplicados"
                : "Nenhum protocolo cadastrado ainda"
              }
            </div>
            {(searchQuery || statusFilter || typeFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("");
                  setTypeFilter("");
                }}
              >
                Limpar filtros
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProtocols.map((protocol) => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                onViewDetails={onProtocolSelect}
              />
            ))}
          </div>
        )}
      </div>

      {filteredProtocols.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          {filteredProtocols.length} protocolo(s) encontrado(s)
        </div>
      )}
    </div>
  );
}