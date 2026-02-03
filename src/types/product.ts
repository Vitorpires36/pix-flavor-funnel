export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'pod' | 'tabacaria';
  brand?: string;
  flavors?: string[];
  puffs?: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedFlavor?: string;
}
