import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types/product';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, flavor?: string) => void;
  removeFromCart: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, flavor?: string) => {
    setCart(prev => {
      const existingItem = prev.find(
        item => item.id === product.id && item.selectedFlavor === flavor
      );

      if (existingItem) {
        toast.success('Quantidade atualizada!');
        return prev.map(item =>
          item.id === product.id && item.selectedFlavor === flavor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success('Produto adicionado ao carrinho!');
      return [...prev, { ...product, quantity: 1, selectedFlavor: flavor }];
    });
  };

  const removeFromCart = (productId: string, flavor?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.id === productId && item.selectedFlavor === flavor)
    ));
    toast.info('Produto removido do carrinho');
  };

  const updateQuantity = (productId: string, quantity: number, flavor?: string) => {
    if (quantity === 0) {
      removeFromCart(productId, flavor);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        (item.id === productId && item.selectedFlavor === flavor)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Carrinho limpo');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
