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
import { Copy, Check, MessageCircle, MapPin, Clock, Search, Truck, Star, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { BAIRROS_SP, ZONAS, getZonaColor, type BairroSP } from '@/lib/bairros';

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
  const [selectedZona, setSelectedZona] = useState('Todos');
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
      setSelectedZona('Todos');
      setStep('form');
    }
  }, [open]);

  // Filtrar bairros
  const bairrosFiltrados = useMemo(() => {
    return BAIRROS_SP.filter(bairro => {
      const matchSearch = bairro.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchZona = selectedZona === 'Todos' || bairro.zona === selectedZona;
      return matchSearch && matchZona;
    }).sort((a, b) => a.distanciaKm - b.distanciaKm);
  }, [searchTerm, selectedZona]);

  // Cálculos
  const valorFrete = selectedBairro ? selectedBairro.valorBase : 0;
  const freteGratis = total >= 300;
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
      ? 'GRÁTIS (pedido acima de R$ 300)' 
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
          <DialogTitle className="text-foreground text-xl flex items-center gap-2">
            {step === 'form' ? (
              <>
                <Truck className="h-5 w-5" />
                Finalizar Pedido - Entrega em SP
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                Pagamento PIX
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <div className="space-y-4 py-4">
            {/* Dados Pessoais */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
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
              <div className="flex items-center justify-between">
                <Label className="text-foreground text-lg font-semibold">
                  Selecione seu Bairro
                </Label>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {bairrosFiltrados.length} de {BAIRROS_SP.length} bairros
                </span>
              </div>
              
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar bairro pelo nome..."
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
                    className="text-xs"
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
                    <p className="text-sm">Tente buscar com outro termo ou zona</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {bairrosFiltrados.map((bairro) => (
                      <button
                        key={bairro.nome}
                        onClick={() => setSelectedBairro(bairro)}
                        className={cn(
                          "w-full p-3 text-left transition-all hover:bg-muted/50",
                          selectedBairro?.nome === bairro.nome && "bg-primary/10 border-l-4 border-primary"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-foreground truncate">
                                {bairro.nome}
                              </h3>
                              <span className={cn(
                                "px-2 py-0.5 text-xs rounded-full text-white flex-shrink-0",
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
                          <div className="text-right ml-3 flex-shrink-0">
                            <div className="text-base font-bold text-primary">
                              R$ {bairro.valorBase.toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              frete
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
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-primary">
                      Bairro Selecionado
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-foreground">
                        {selectedBairro.nome}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedBairro.distanciaKm.toFixed(1)} km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ~{selectedBairro.tempoEntregaMin} min
                        </span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-white text-xs",
                          getZonaColor(selectedBairro.zona)
                        )}>
                          {selectedBairro.zona}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Valor do frete</p>
                      <p className="text-lg font-bold text-primary">
                        R$ {selectedBairro.valorBase.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avisos Frete */}
            {!freteGratis && total < 300 && selectedBairro && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                <div className="flex gap-2">
                  <Star className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      Faltam R$ {(300 - total).toFixed(2)} para frete grátis!
                    </span>
                    <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
                      Adicione mais itens ao carrinho e ganhe frete grátis
                    </p>
                  </div>
                </div>
              </div>
            )}

            {freteGratis && (
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Check className="h-4 w-4 text-green-500" />
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    🎉 Parabéns! Você ganhou FRETE GRÁTIS!
                  </p>
                </div>
              </div>
            )}

            {/* Resumo do Pedido */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-3 border">
              <h3 className="font-semibold text-foreground text-sm">Resumo do Pedido</h3>
              
              <div className="space-y-2">
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
                      <span className="text-muted-foreground">Selecione o bairro</span>
                    )}
                  </span>
                </div>

                {selectedBairro && (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Tempo estimado</span>
                    <span>~{selectedBairro.tempoEntregaMin} minutos</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-2 flex justify-between items-center">
                <span className="text-foreground font-bold">Total</span>
                <span className="text-primary text-lg font-bold">R$ {totalComFrete.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleGeneratePix}
              disabled={!selectedBairro}
              className="w-full"
              size="lg"
            >
              <Check className="mr-2 h-5 w-5" />
              Continuar para PIX
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="bg-muted p-6 rounded-lg text-center space-y-3">
              <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-xs text-muted-foreground">QR Code PIX</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Escaneie o QR Code ou copie a chave PIX abaixo
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Chave PIX (Telefone)</Label>
              <div className="flex gap-2">
                <Input
                  value={pixKey}
                  readOnly
                  className="bg-background border-border text-foreground font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyPix}
                  className="flex-shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
              <p className="text-sm font-semibold text-primary mb-1">
                Valor total a pagar
              </p>
              <p className="text-2xl font-bold text-foreground">
                R$ {totalComFrete.toFixed(2)}
              </p>
              {freteGratis && (
                <p className="text-xs text-green-500 mt-1">
                  ✓ Frete grátis incluído
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleSendWhatsApp}
                className="w-full"
                size="lg"
                variant="default"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Confirmar Pagamento via WhatsApp
              </Button>

              <Button
                onClick={() => setStep('form')}
                variant="outline"
                className="w-full"
              >
                Voltar para Dados
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Após realizar o pagamento PIX, clique no botão acima para confirmar seu pedido
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
