import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useFreteCalculation } from '@/hooks/use-frete-calculation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, MessageCircle, Truck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { cart, total, clearCart } = useCart();
  const { loading: freteLoading, data: freteData, error: freteError, calcularFrete } = useFreteCalculation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'form' | 'pix'>('form');
  const [calculandoFrete, setCalculandoFrete] = useState(false);

  const pixKey = '5511948453681';

  useEffect(() => {
    if (open) {
      setName('');
      setPhone('');
      setAddress('');
      setStep('form');
      setCalculandoFrete(false);
    }
  }, [open]);

  const totalComFrete = freteData ? total + freteData.preco : total;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success('Chave PIX copiada!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCalcularFrete = async () => {
    if (!address.trim()) {
      toast.error('Preencha o endereço de entrega!');
      return;
    }
    setCalculandoFrete(true);
    const resultado = await calcularFrete(address);
    setCalculandoFrete(false);
    if (resultado) {
      toast.success(`Frete calculado: ${resultado.duracaoMin} min aprox.`);
    } else if (freteError) {
      toast.error(`Erro ao calcular frete: ${freteError}`);
    }
  };

  const handleGeneratePix = () => {
    if (!name || !phone || !address) {
      toast.error('Preencha todos os campos!');
      return;
    }
    if (!freteData) {
      toast.error('Calcule o frete antes de continuar!');
      return;
    }
    setStep('pix');
  };

  const handleSendWhatsApp = () => {
    const message = `🛍️ *Novo Pedido - PODE POD*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📱 *Telefone:* ${phone}\n` +
      `📍 *Endereço:* ${address}\n` +
      `🚚 *Prazo Entrega:* ${freteData?.duracaoMin} minutos aprox.\n\n` +
      `*Produtos:*\n` +
      cart.map(item =>
        `• ${item.quantity}x ${item.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ''} - R$ ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n') +
      `\n\n*Resumo:*\n` +
      `💳 Subtotal: R$ ${total.toFixed(2)}\n` +
      `🚚 Frete: R$ ${freteData?.preco.toFixed(2)}\n` +
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
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">
            {step === 'form' ? 'Finalizar Pedido' : 'Pagamento PIX'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <div className="space-y-4 py-4">
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
              <Label htmlFor="address" className="text-foreground">Endereço de Entrega</Label>
              <div className="flex gap-2">
                <Input
                  id="address"
                  placeholder="Rua, número, bairro"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
                <Button
                  onClick={handleCalcularFrete}
                  disabled={!address.trim() || calculandoFrete || freteLoading}
                  variant="outline"
                  size="sm"
                  className="px-3"
                  title="Calcular frete"
                >
                  <Truck className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {freteError && (
              <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex gap-2">
                <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm text-destructive">{freteError}</span>
              </div>
            )}

            {freteData && (
              <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Distância</span>
                  <span className="font-semibold text-foreground">{freteData.distanciaKm} km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tempo estimado</span>
                  <span className="font-semibold text-foreground">{freteData.duracaoMin} min</span>
                </div>
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entrega</span>
                <span className="font-semibold text-foreground">
                  {freteData ? `R$ ${freteData.preco.toFixed(2)}` : '–'}
                </span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary text-lg">R$ {totalComFrete.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleGeneratePix}
              disabled={!freteData}
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
                R$ {total.toFixed(2)}
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
