// src/components/BairroSelector.tsx

import { useState, useMemo } from 'react';
import { MapPin, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BAIRROS_SP, ZONAS, getZonaColor, type BairroSP } from '@/lib/bairros';
import { cn } from '@/lib/utils';

interface BairroSelectorProps {
  onSelect: (bairro: BairroSP) => void;
  selectedBairro?: BairroSP | null;
}

export const BairroSelector = ({ onSelect, selectedBairro }: BairroSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZona, setSelectedZona] = useState('Todas');

  const bairrosFiltrados = useMemo(() => {
    return BAIRROS_SP.filter(bairro => {
      const matchSearch = bairro.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchZona = selectedZona === 'Todas' || bairro.zona === selectedZona;
      return matchSearch && matchZona;
    }).sort((a, b) => a.distanciaKm - b.distanciaKm);
  }, [searchTerm, selectedZona]);

  return (
    <div className="space-y-4">
      {/* Busca */}
      <div>
        <Label htmlFor="search-bairro" className="text-foreground mb-2">
          Buscar Bairro
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-bairro"
            type="text"
            placeholder="Digite o nome do bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border text-foreground"
          />
        </div>
      </div>

      {/* Filtro por Zona */}
      <div>
        <Label className="text-foreground mb-2">Filtrar por Zona</Label>
        <div className="flex flex-wrap gap-2">
          {ZONAS.map(zona => (
            <Button
              key={zona}
              onClick={() => setSelectedZona(zona)}
              variant={selectedZona === zona ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "transition-all",
                selectedZona === zona && "shadow-glow"
              )}
            >
              {zona}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de Bairros */}
      <div>
        <Label className="text-foreground mb-2">
          Selecione seu Bairro ({bairrosFiltrados.length} encontrados)
        </Label>
        <div className="border border-border rounded-lg max-h-[400px] overflow-y-auto bg-card">
          {bairrosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum bairro encontrado</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {bairrosFiltrados.map((bairro) => (
                <button
                  key={bairro.nome}
                  onClick={() => onSelect(bairro)}
                  className={cn(
                    "w-full p-4 text-left transition-all hover:bg-muted",
                    selectedBairro?.nome === bairro.nome && "bg-primary/10 border-l-4 border-primary"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-foreground">
                          {bairro.nome}
                        </h3>
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full text-white",
                          getZonaColor(bairro.zona)
                        )}>
                          {bairro.zona}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {bairro.distanciaKm.toFixed(1)} km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ~{bairro.tempoEntregaMin} min
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        R$ {bairro.valorBase.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bairro Selecionado */}
      {selectedBairro && (
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
          <p className="text-sm font-semibold text-blue-400 mb-2">
            ✓ Bairro Selecionado
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-foreground">
                {selectedBairro.nome}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedBairro.distanciaKm.toFixed(1)} km • ~{selectedBairro.tempoEntregaMin} min
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Frete</p>
              <p className="text-xl font-bold text-primary">
                R$ {selectedBairro.valorBase.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
