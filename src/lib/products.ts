import { Product } from "@/types/product";

export const products: Product[] = [
  // IGNITE
  {
    id: "ignite-v50-5k",
    name: "IGNITE V50 5K",
    description: "5.000 PUFFS - Tela LED + Controle de Airflow",
    price: 54.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Ignite",
    puffs: "5000",
    inStock: true,
    flavors: ["Morango", "Uva", "Menta", "Melancia", "Limão"]
  },
  {
    id: "ignite-v50-15k",
    name: "IGNITE V50 15K",
    description: "15.000 PUFFS - Tela LED + Controle de Airflow",
    price: 64.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Ignite",
    puffs: "15000",
    inStock: true,
    flavors: ["Blue Razz", "Strawberry Banana", "Grape Ice", "Watermelon Ice"]
  },
  {
    id: "ignite-v80",
    name: "IGNITE V80 8K",
    description: "8.000 PUFFS - Tela LED",
    price: 74.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Ignite",
    puffs: "8000",
    inStock: true,
    flavors: ["Peach Mango", "Lychee Ice", "Mint", "Grape"]
  },
  {
    id: "ignite-v150",
    name: "IGNITE V150 15K",
    description: "15.000 PUFFS - Mega Bateria 850mAh",
    price: 84.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Ignite",
    puffs: "15000",
    inStock: true,
    flavors: ["Mixed Berries", "Tropical Punch", "Cool Mint", "Watermelon"]
  },

  // ELF BAR
  {
    id: "elfbar-bc5000",
    name: "ELFBAR BC5000",
    description: "5.000 PUFFS - Design Premium",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Elf Bar",
    puffs: "5000",
    inStock: true,
    flavors: ["Morango Kiwi", "Mirtilo", "Manga", "Maracujá", "Framboesa"]
  },
  {
    id: "elfbar-te6000",
    name: "ELFBAR TE6000",
    description: "6.000 PUFFS",
    price: 64.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Elf Bar",
    puffs: "6000",
    inStock: true,
    flavors: ["Blue Razz Ice", "Strawberry Ice", "Mango Ice"]
  },
  {
    id: "elfbar-pi9000",
    name: "ELFBAR PI9000",
    description: "9.000 PUFFS - Tela Digital",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Elf Bar",
    puffs: "9000",
    inStock: true,
    flavors: ["Watermelon Ice", "Peach Ice", "Grape Ice"]
  },
  {
    id: "elfbar-ew-kit-16k",
    name: "ELFBAR EW KIT 16K",
    description: "16.000 PUFFS - Sistema POD Recarregável",
    price: 94.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Elf Bar",
    puffs: "16000",
    inStock: true,
    flavors: ["Fresh Mint", "Tropical Fruit", "Berry Mix"]
  },
  {
    id: "elfbar-bc10000",
    name: "ELFBAR BC10000",
    description: "10.000 PUFFS - Display LED",
    price: 69.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Elf Bar",
    puffs: "10000",
    inStock: true,
    flavors: ["Lemon Mint", "Strawberry Mango", "Blueberry Ice"]
  },

  // LOST MARY
  {
    id: "lostmary-bm5000",
    name: "LOST MARY BM5000",
    description: "5.000 PUFFS - Design Exclusivo",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Lost Mary",
    puffs: "5000",
    inStock: true,
    flavors: ["Morango Melancia", "Uva Ice", "Limonada", "Blueberry", "Pêssego"]
  },
  {
    id: "lostmary-os5000",
    name: "LOST MARY OS5000",
    description: "5.000 PUFFS",
    price: 64.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Lost Mary",
    puffs: "5000",
    inStock: true,
    flavors: ["Kiwi Passion", "Cherry Ice", "Pineapple Ice"]
  },
  {
    id: "lostmary-mo10000",
    name: "LOST MARY MO10000",
    description: "10.000 PUFFS - Bateria Potente",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Lost Mary",
    puffs: "10000",
    inStock: true,
    flavors: ["Double Apple", "Mango Peach", "Watermelon Lemon"]
  },

  // OXBAR
  {
    id: "oxbar-10k",
    name: "OXBAR 10K",
    description: "10.000 PUFFS",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Oxbar",
    puffs: "10000",
    inStock: true,
    flavors: ["Mint Ice", "Strawberry", "Grape"]
  },
  {
    id: "oxbar-30k",
    name: "OXBAR 30K",
    description: "30.000 PUFFS - Ultra Duração",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Oxbar",
    puffs: "30000",
    inStock: true,
    flavors: ["Blue Razz", "Watermelon Ice", "Mango Ice"]
  },

  // SEX ADDICT
  {
    id: "sex-addict-5k",
    name: "SEX ADDICT 5K",
    description: "5.000 PUFFS",
    price: 54.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Sex Addict",
    puffs: "5000",
    inStock: true,
    flavors: ["Strawberry", "Blueberry", "Grape Ice"]
  },
  {
    id: "sex-addict-8k",
    name: "SEX ADDICT 8K",
    description: "8.000 PUFFS - Tela LED",
    price: 64.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Sex Addict",
    puffs: "8000",
    inStock: true,
    flavors: ["Watermelon", "Peach Ice", "Mint"]
  },

  // ADJUST
  {
    id: "adjust-kit",
    name: "ADJUST KIT",
    description: "Kit Completo Recarregável",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Adjust",
    inStock: true,
    flavors: []
  },

  // FUNKYLANDS
  {
    id: "funkylands-ti7000",
    name: "FUNKYLANDS TI7000",
    description: "7.000 PUFFS - Display Digital",
    price: 69.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Funkylands",
    puffs: "7000",
    inStock: true,
    flavors: ["Rainbow Candy", "Cool Mint", "Strawberry Ice"]
  },

  // BEM BOLADO
  {
    id: "bem-bolado-6k",
    name: "BEM BOLADO 6K",
    description: "6.000 PUFFS",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Bem Bolado",
    puffs: "6000",
    inStock: true,
    flavors: ["Morango", "Uva", "Melancia"]
  },

  // NIKBAR
  {
    id: "nikbar-5k",
    name: "NIKBAR 5K",
    description: "5.000 PUFFS",
    price: 54.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "pod",
    brand: "Nikbar",
    puffs: "5000",
    inStock: true,
    flavors: ["Mint", "Strawberry", "Grape"]
  },

  // TABACARIA
  {
    id: "essencia-zomo-30ml",
    name: "ESSÊNCIA ZOMO 30ML",
    description: "Essência Premium",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: ["Strong Grape", "Orange Mint", "My Granny", "Passion Lemongrass"]
  },
  {
    id: "essencia-zomo-50ml",
    name: "ESSÊNCIA ZOMO 50ML",
    description: "Essência Premium 50ml",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: ["Strong Grape", "Orange Mint", "My Granny", "Passion Lemongrass"]
  },
  {
    id: "essencia-narguice-30ml",
    name: "ESSÊNCIA NARGUICE 30ML",
    description: "Linha Nacional",
    price: 34.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: ["Morango", "Uva", "Menta"]
  },
  {
    id: "carvao-three-kings",
    name: "CARVÃO THREE KINGS",
    description: "Caixa com 10 unidades",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: []
  },
  {
    id: "carvao-coco-1kg",
    name: "CARVÃO DE COCO 1KG",
    description: "Carvão Natural de Coco",
    price: 34.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: []
  },
  {
    id: "piteira-bem-bolado",
    name: "PITEIRA BEM BOLADO",
    description: "Pacote com filtros",
    price: 9.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: []
  },
  {
    id: "seda-bem-bolado",
    name: "SEDA BEM BOLADO",
    description: "Seda de Qualidade",
    price: 4.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: []
  },
  {
    id: "isqueiro-bic-grande",
    name: "ISQUEIRO BIC GRANDE",
    description: "BIC GRANDE - Consultar cores",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: []
  },
  {
    id: "isqueiro-bic-pequeno",
    name: "ISQUEIRO BIC PEQUENO",
    description: "BIC PEQUENO - Consultar cores",
    price: 8.90,
    image: "https://images.unsplash.com/photo-1606941525941-8b15e6a5c4f0?w=400&h=400&fit=crop",
    category: "tabacaria",
    inStock: true,
    flavors: []
  },
];
