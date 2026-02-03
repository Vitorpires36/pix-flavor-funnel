import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CartView } from './CartView';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 gradient-primary shadow-glow">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg cursor-pointer">
              <span className="text-2xl font-bold text-white">PODE POD</span>
            </div>
          </Link>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-secondary text-secondary-foreground">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg bg-background border-border">
            <SheetHeader>
              <SheetTitle className="text-foreground">Carrinho de Compras</SheetTitle>
            </SheetHeader>
            <CartView />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
