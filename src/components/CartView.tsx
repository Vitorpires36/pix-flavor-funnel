import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { CheckoutDialog } from './CheckoutDialog';

export const CartView = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-muted-foreground">
        <ShoppingBag className="h-24 w-24 mb-4 opacity-50" />
        <p className="text-lg">Seu carrinho está vazio</p>
        <p className="text-sm">Adicione produtos para continuar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.selectedFlavor || 'no-flavor'}`}
            className="bg-card border border-border rounded-lg p-4 shadow-card"
          >
            <div className="flex gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md bg-muted"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate text-foreground">
                  {item.name}
                </h3>
                {item.selectedFlavor && (
                  <p className="text-xs text-primary mt-1">
                    Sabor: {item.selectedFlavor}
                  </p>
                )}
                <p className="text-sm font-bold mt-1 text-foreground">
                  R$ {item.price.toFixed(2)}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedFlavor)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-semibold text-foreground">
                    {item.quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedFlavor)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                    onClick={() => removeFromCart(item.id, item.selectedFlavor)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-4 space-y-3 bg-background">
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-foreground">Total:</span>
          <span className="text-primary">R$ {total.toFixed(2)}</span>
        </div>
        
        <Button
          className="w-full"
          size="lg"
          onClick={() => setCheckoutOpen(true)}
        >
          Finalizar Pedido
        </Button>
        
        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={clearCart}
        >
          Limpar Carrinho
        </Button>
      </div>

      <CheckoutDialog 
        open={checkoutOpen} 
        onOpenChange={setCheckoutOpen} 
      />
    </div>
  );
};
