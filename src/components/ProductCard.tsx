import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isTabacaria?: boolean;
}

export const ProductCard = ({ product, isTabacaria = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    if (product.flavors && product.flavors.length > 0 && !selectedFlavor) {
      setIsOpen(true);
      return;
    }

    addToCart(product, selectedFlavor);
    setSelectedFlavor('');
    setIsOpen(false);
  };

  const handleFlavorSelect = (flavor: string) => {
    setSelectedFlavor(flavor);
    addToCart(product, flavor);
    setIsOpen(false);
    setSelectedFlavor('');
  };

  return (
    <Card className="bg-card shadow-card border-border overflow-hidden transition-smooth hover:shadow-glow hover:scale-105">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover bg-muted"
          />
          {product.puffs && (
            <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
              {product.puffs} Puffs
            </Badge>
          )}
        </div>
        <div className="p-3">
          <h3 className={`font-bold text-sm mb-1 truncate ${isTabacaria ? 'text-accent' : 'text-primary'}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-foreground font-bold text-base">
            R$ {product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        {product.flavors && product.flavors.length > 0 ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full"
                variant={isTabacaria ? 'accent' : 'default'}
                size="sm"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Escolha o sabor</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-2 mt-4">
                {product.flavors.map((flavor) => (
                  <Button
                    key={flavor}
                    onClick={() => handleFlavorSelect(flavor)}
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-primary-foreground"
                  >
                    {flavor}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full"
            variant={isTabacaria ? 'accent' : 'default'}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
