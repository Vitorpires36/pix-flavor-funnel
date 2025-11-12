// src/components/CheckoutDialog.tsx
// SUBSTITUA TODO O CONTEÚDO DO ARQUIVO POR ESTE CÓDIGO

import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, MessageCircle, AlertCircle, MapPin, Clock, Search } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ==================== DADOS DOS BAIRROS ====================
interface BairroSP {
  nome: string;
  distanciaKm: number;
  zona: string;
  tempoEntregaMin: number;
  valorBase: number;
}

const BAIRROS_SP: BairroSP[] = [
  // ZONA CENTRO
  { nome: "República", distanciaKm: 1.8, zona: "Centro", tempoEntregaMin: 8, valorBase: 13.24 },
  { nome: "Sé", distanciaKm: 2.1, zona: "Centro", tempoEntregaMin: 10, valorBase: 13.78 },
  { nome: "Santa Ifigênia", distanciaKm: 1.5, zona: "Centro", tempoEntregaMin: 7, valorBase: 12.70 },
  { nome: "Luz", distanciaKm: 2.3, zona: "Centro", tempoEntregaMin: 11, valorBase: 14.14 },
  { nome: "Bom Retiro", distanciaKm: 2.8, zona: "Centro", tempoEntregaMin: 13, valorBase: 15.04 },
  
  // ZONA OESTE
  { nome: "Vila Madalena", distanciaKm: 4.2, zona: "Oeste", tempoEntregaMin: 15, valorBase: 17.56 },
  { nome: "Pinheiros", distanciaKm: 4.8, zona: "Oeste", tempoEntregaMin: 18, valorBase: 18.64 },
  { nome: "Jardins", distanciaKm: 3.5, zona: "Oeste", tempoEntregaMin: 12, valorBase: 16.30 },
  { nome: "Itaim Bibi", distanciaKm: 5.2, zona: "Oeste", tempoEntregaMin: 20, valorBase: 19.36 },
  { nome: "Vila Olímpia", distanciaKm: 5.5, zona: "Oeste", tempoEntregaMin: 22, valorBase: 19.90 },
  { nome: "Brooklin", distanciaKm: 6.8, zona: "Oeste", tempoEntregaMin: 25, valorBase: 22.24 },
  
  // ZONA SUL
  { nome: "Vila Mariana", distanciaKm: 6.2, zona: "Sul", tempoEntregaMin: 23, valorBase: 21.16 },
  { nome: "Ipiranga", distanciaKm: 8.1, zona: "Sul", tempoEntregaMin: 30, valorBase: 24.58 },
  { nome: "Santo Amaro", distanciaKm: 9.5, zona: "Sul", tempoEntregaMin: 35, valorBase: 27.10 },
  { nome: "Saúde", distanciaKm: 7.3, zona: "Sul", tempoEntregaMin: 27, valorBase: 23.14 },
  { nome: "Campo Belo", distanciaKm: 7.8, zona: "Sul", tempoEntregaMin: 29, valorBase: 24.04 },
  { nome: "Jabaquara", distanciaKm: 10.2, zona: "Sul", tempoEntregaMin: 38, valorBase: 28.36 },
  
  // ZONA NORTE
  { nome: "Santana", distanciaKm: 6.3, zona: "Norte", tempoEntregaMin: 24, valorBase: 21.34 },
  { nome: "Tucuruvi", distanciaKm: 7.1, zona: "Norte", tempoEntregaMin: 26, valorBase: 22.78 },
  { nome: "Casa Verde", distanciaKm: 8.5, zona: "Norte", tempoEntregaMin: 32, valorBase: 25.30 },
  { nome: "Vila Guilherme", distanciaKm: 7.9, zona: "Norte", tempoEntregaMin: 30, valorBase: 24.22 },
  { nome: "Vila Maria", distanciaKm: 9.2, zona: "Norte", tempoEntregaMin: 34, valorBase: 26.56 },
  
  // ZONA LESTE
  { nome: "Tatuapé", distanciaKm: 8.7, zona: "Leste", tempoEntregaMin: 33, valorBase: 25.66 },
  { nome: "Vila Prudente", distanciaKm: 9.2, zona: "Leste", tempoEntregaMin: 35, valorBase: 26.56 },
  { nome: "Penha", distanciaKm: 10.8, zona: "Leste", tempoEntregaMin: 40, valorBase: 29.44 },
  { nome: "Carrão", distanciaKm: 9.8, zona: "Leste", tempoEntregaMin: 37, valorBase: 27.64 },
  { nome: "Vila Formosa", distanciaKm: 11.2, zona: "Leste", tempoEntregaMin: 42, valorBase: 30.16 },
];

const ZONAS = ['Todas', 'Centro', 'Oeste', 'Sul', 'Norte', 'Leste'];

const getZonaColor = (zona: string): string => {
  const colors: Record<string, string> = {
    'Centro': 'bg-purple-500',
    'Oeste': 'bg-blue-500',
    'Sul': 'bg-green-500',
    'Norte': 'bg-red-500',
    'Leste': 'bg-yellow-500'
  };
  return colors[zona] || 'bg-gray-500';
};

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { cart, total, clearCart } = useCart();
  
  // Estados
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [selectedBairro, setSelectedBairro] = useState<BairroSP | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZona, setSelectedZona] = useState('Todas');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'form' | 'pix'>('form');

  const pixKey = '5511948453681';

  // Reset ao abrir
  useEffect(() => {
    if (open) {
      setName('');
      setPhone('');
      setEndereco('');
      setSelectedBairro(null);
      setSearchTerm('');
      setSelectedZona('Todas');
      setStep('form');
    }
  }, [open]);

  // Filtrar bairros
  const bairrosFiltrados = useMemo(() => {
    return BAIRROS_SP.filter(bairro => {
      const matchSearch = bairro.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchZona = selectedZona === 'Todas' || bairro.zona === selectedZona;
      return matchSearch && matchZona;
    }).sort((a, b) => a.distanciaKm - b.distanciaKm);
  }, [searchTerm, selectedZona]);

  // Cálculos
  const valorFrete = selectedBairro ? selectedBairro.valorBase : 0;
  const freteGratis = total >= 100;
  const totalComFrete = freteGratis ? total : total + valorFrete;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success('Chave PIX copiada!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGeneratePix = () => {
    if (!name || !phone || !endereco) {
      toast.error('Preencha todos os campos!');
      return;
    }
    if (!selectedBairro) {
      toast.error('Selecione seu bairro!');
      return;
    }
    setStep('pix');
  };

  const handleSendWhatsApp = () => {
    const freteTexto = freteGratis 
      ? 'GRÁTIS (pedido acima de R$ 100)' 
      : `R$ ${valorFrete.toFixed(2)}`;

    const message = `🛍️ *Novo Pedido - PODE POD*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📱 *Telefone:* ${phone}\n` +
      `📍 *Endereço:* ${endereco}\n` +
      `🏘️ *Bairro:* ${selectedBairro?.nome} (${selectedBairro?.zona})\n` +
      `📏 *Distância:* ${selectedBairro?.distanciaKm.toFixed(1)} km\n` +
      `🚚 *Prazo Entrega:* ~${selectedBairro?.tempoEntregaMin} minutos\n\n` +
      `*Produtos:*\n` +
      cart.map(item =>
        `• ${item.quantity}x ${item.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ''} - R$ ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n') +
      `\n\n*Resumo:*\n` +
      `💳 Subtotal: R$ ${total.toFixed(2)}\n` +
      `🚚 Frete: ${freteTexto}\n` +
      `💰 *Total:* R$ ${totalComFrete.toFixed(2)}\n\n` +
      `✅ Pagamento via PIX confirmado!`;

    const whatsappUrl = `https://wa.me/5511981878093?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    onOpenChange(false);
    setStep('form');
    toast.success('Pedido enviado! Aguarde o contato.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">
            {step === 'form' ? 'Finalizar Pedido' : 'Pagamento PIX'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <div className="space-y-4 py-4">
            {/* Dados Pessoais */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-foreground">
                Endereço Completo (Rua, Número, Complemento)
              </Label>
              <Input
                id="endereco"
                placeholder="Rua Exemplo, 123, Apto 45"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            {/* SELETOR DE BAIRRO */}
            <div className="border-t border-border pt-4 space-y-4">
              <Label className="text-foreground text-lg font-semibold">Selecione seu Bairro</Label>
              
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar bairro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>

              {/* Filtro por Zona */}
              <div className="flex flex-wrap gap-2">
                {ZONAS.map(zona => (
                  <Button
                    key={zona}
                    onClick={() => setSelectedZona(zona)}
                    variant={selectedZona === zona ? 'default' : 'outline'}
                    size="sm"
                  >
                    {zona}
                  </Button>
                ))}
              </div>

              {/* Lista de Bairros */}
              <div className="border border-border rounded-lg max-h-[300px] overflow-y-auto bg-card">
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
                        onClick={() => setSelectedBairro(bairro)}
                        className={cn(
                          "w-full p-3 text-left transition-all hover:bg-muted",
                          selectedBairro?.nome === bairro.nome && "bg-primary/10 border-l-4 border-primary"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-foreground">
                                {bairro.nome}
                              </h3>
                              <span className={cn(
                                "px-2 py-0.5 text-xs rounded-full text-white",
                                getZonaColor(bairro.zona)
                              )}>
                                {bairro.zona}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                            <div className="text-base font-bold text-primary">
                              R$ {bairro.valorBase.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bairro Selecionado */}
              {selectedBairro && (
                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
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
                      <p className="text-lg font-bold text-primary">
                        R$ {selectedBairro.valorBase.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avisos Frete */}
            {!freteGratis && total < 100 && selectedBairro && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">
                    Faltam R$ {(100 - total).toFixed(2)} para frete grátis!
                  </span>
                </div>
              </div>
            )}

            {freteGratis && (
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 text-center">
                  🎉 Você ganhou FRETE GRÁTIS!
                </p>
              </div>
            )}

            {/* Resumo */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entrega</span>
                <span className="font-semibold text-foreground">
                  {selectedBairro ? (
                    freteGratis ? (
                      <span className="text-green-500 font-bold">GRÁTIS</span>
                    ) : (
                      `R$ ${valorFrete.toFixed(2)}`
                    )
                  ) : (
                    '–'
                  )}
                </span>
              </div>
              {selectedBairro && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tempo estimado</span>
                  <span>~{selectedBairro.tempoEntregaMin} minutos</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary text-lg">R$ {totalComFrete.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleGeneratePix}
              disabled={!selectedBairro}
              className="w-full"
              size="lg"
            >
              Gerar PIX
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="bg-muted p-6 rounded-lg text-center space-y-3">
              <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                <div className="text-6xl">📱</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Escaneie o QR Code ou copie a chave PIX
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Chave PIX</Label>
              <div className="flex gap-2">
                <Input
                  value={pixKey}
                  readOnly
                  className="bg-background border-border text-foreground"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyPix}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
              <p className="text-sm font-semibold text-primary mb-1">
                Valor a pagar
              </p>
              <p className="text-2xl font-bold text-foreground">
                R$ {totalComFrete.toFixed(2)}
              </p>
            </div>

            <Button
              onClick={handleSendWhatsApp}
              className="w-full"
              size="lg"
              variant="whatsapp"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Confirmar Pagamento via WhatsApp
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Após realizar o pagamento, clique no botão acima para confirmar
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
