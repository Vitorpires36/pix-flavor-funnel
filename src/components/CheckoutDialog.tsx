import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, MessageCircle, MapPin, Clock, Truck, Zap, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { BAIRROS_SP, getZonaColor, type BairroSP } from '@/lib/bairros';

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
  const [openCombobox, setOpenCombobox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'form' | 'pix'>('form');

  const pixKey = '11948453681';

  // Reset ao abrir
  useEffect(() => {
    if (open) {
      setName('');
      setPhone('');
      setEndereco('');
      setSelectedBairro(null);
      setOpenCombobox(false);
      setStep('form');
    }
  }, [open]);

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

  const handleSendWhatsApp = async () => {
    // Save sale to Admin Server
    try {
      await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name, phone, endereco, bairro: selectedBairro?.nome },
          items: cart,
          total: totalComFrete,
          frete: freteGratis ? 0 : valorFrete,
          paymentMethod: 'pix',
          status: 'pending_confirmation'
        }),
      });
    } catch (error) {
      console.error('Failed to save sale:', error);
      // Continue anyway to not block the user
    }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* SELETOR DE BAIRRO COMBOBOX */}
            <div className="space-y-2">
              <Label className="text-foreground">Bairro</Label>
              <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombobox}
                    className="w-full justify-between bg-background border-border text-foreground"
                  >
                    {selectedBairro ? (
                      <div className="flex items-center gap-2">
                        <span>{selectedBairro.nome}</span>
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full text-white",
                          getZonaColor(selectedBairro.zona)
                        )}>
                          {selectedBairro.zona}
                        </span>
                      </div>
                    ) : (
                      "Selecione seu bairro..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar bairro..." />
                    <CommandList>
                      <CommandEmpty>Bairro não encontrado.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {BAIRROS_SP.sort((a, b) => a.nome.localeCompare(b.nome)).map((bairro) => (
                          <CommandItem
                            key={bairro.nome}
                            value={bairro.nome}
                            onSelect={(currentValue) => {
                              const selected = BAIRROS_SP.find(
                                (b) => b.nome.toLowerCase() === currentValue.toLowerCase()
                              );
                              setSelectedBairro(selected || null);
                              setOpenCombobox(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedBairro?.nome === bairro.nome ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span>{bairro.nome}</span>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className={cn(
                                  "px-1.5 py-0.5 rounded text-white text-[10px]",
                                  getZonaColor(bairro.zona)
                                )}>
                                  {bairro.zona}
                                </span>
                                <span>R$ {bairro.valorBase.toFixed(2)}</span>
                                <span>• ~{bairro.tempoEntregaMin} min</span>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Informações de Frete Selecionado */}
            {selectedBairro && (
              <div className="bg-muted/50 p-3 rounded-lg flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>~{selectedBairro.tempoEntregaMin} min</span>
                   </div>
                   <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedBairro.distanciaKm.toFixed(1)} km</span>
                   </div>
                </div>
                <div className="font-semibold text-primary">
                  Frete: R$ {selectedBairro.valorBase.toFixed(2)}
                </div>
              </div>
            )}

            {/* Avisos Frete Grátis */}
            {!freteGratis && total < 300 && selectedBairro && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-center">
                 <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    Faltam R$ {(300 - total).toFixed(2)} para frete grátis!
                 </span>
              </div>
            )}

            {freteGratis && (
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-center">
                 <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    🎉 Frete Grátis aplicado!
                 </span>
              </div>
            )}

            {/* Resumo Simplificado */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Total com Frete</span>
                <span className="text-xl font-bold text-primary">R$ {totalComFrete.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleGeneratePix}
                disabled={!selectedBairro || !name || !phone || !endereco}
                className="w-full"
                size="lg"
              >
                <Check className="mr-2 h-5 w-5" />
                Ir para Pagamento
              </Button>
            </div>
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

            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-center">
              <p className="text-sm font-semibold text-primary mb-1">
                Valor Final
              </p>
              <p className="text-3xl font-bold text-foreground">
                R$ {totalComFrete.toFixed(2)}
              </p>
              {freteGratis && (
                <p className="text-xs text-green-500 mt-1">
                  ✓ Frete grátis incluído
                </p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={handleSendWhatsApp}
                className="w-full"
                size="lg"
                variant="default"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Confirmar no WhatsApp
              </Button>

              <Button
                onClick={() => setStep('form')}
                variant="ghost"
                className="w-full"
              >
                Voltar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
