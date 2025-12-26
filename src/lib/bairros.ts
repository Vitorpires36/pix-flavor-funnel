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
import {
  Copy, Check, MessageCircle, MapPin, Clock, Search, Truck, Star, Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  BAIRROS_SP,
  ZONAS,
  getZonaColor,
  calcularFreteDinamico,
  freteFullSpDisponivel,
  FRETE_FULL_SP_VALOR,
  type BairroSP
} from '@/lib/bairros';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { cart, total, clearCart } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [selectedBairro, setSelectedBairro] = useState<BairroSP | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZona, setSelectedZona] = useState('Todos');
  const [step, setStep] = useState<'form' | 'pix'>('form');

  const pixKey = '5511948453681';
  const fullSpDisponivel = freteFullSpDisponivel();

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

  const bairrosFiltrados = useMemo(() => {
    return BAIRROS_SP.filter(b =>
      b.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedZona === 'Todos' || b.zona === selectedZona)
    );
  }, [searchTerm, selectedZona]);

  const valorFrete = selectedBairro
    ? calcularFreteDinamico(selectedBairro, total)
    : 0;

  const valorFreteFinal = fullSpDisponivel
    ? Math.min(valorFrete, FRETE_FULL_SP_VALOR)
    : valorFrete;

  const totalComFrete = total + valorFreteFinal;

  const handleGeneratePix = () => {
    if (!name || !phone || !endereco || !selectedBairro) {
      toast.error('Preencha todos os campos');
      return;
    }
    setStep('pix');
  };

  const handleSendWhatsApp = () => {
    const message =
      `🛍️ *Novo Pedido*\n\n` +
      `👤 ${name}\n📱 ${phone}\n📍 ${endereco}\n🏘️ ${selectedBairro?.nome}\n\n` +
      cart.map(i =>
        `• ${i.quantity}x ${i.name} - R$ ${(i.price * i.quantity).toFixed(2)}`
      ).join('\n') +
      `\n\n🚚 Frete: R$ ${valorFreteFinal.toFixed(2)}\n💰 Total: R$ ${totalComFrete.toFixed(2)}`;

    window.open(
      `https://wa.me/5511981878093?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    clearCart();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 'form' ? 'Finalizar Pedido' : 'Pagamento PIX'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <div className="space-y-4">
            <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} />
            <Input placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />

            <Input
              placeholder="Buscar bairro"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            {bairrosFiltrados.map(bairro => (
              <Button
                key={bairro.nome}
                variant={selectedBairro?.nome === bairro.nome ? 'default' : 'outline'}
                onClick={() => setSelectedBairro(bairro)}
                className="w-full justify-between"
              >
                {bairro.nome}
                <span>R$ {calcularFreteDinamico(bairro, total).toFixed(2)}</span>
              </Button>
            ))}

            {fullSpDisponivel && (
              <div className="bg-green-100 p-3 rounded text-sm text-green-700">
                🚀 Frete Full SP disponível por R$ 15,00 (entrega hoje)
              </div>
            )}

            <Button onClick={handleGeneratePix} className="w-full">
              Continuar para PIX
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p>Chave PIX</p>
            <Input readOnly value={pixKey} />
            <p className="font-bold">Total: R$ {totalComFrete.toFixed(2)}</p>
            <Button onClick={handleSendWhatsApp} className="w-full">
              Confirmar no WhatsApp
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
