import { Product } from "@/types/product";

export const products: Product[] = [
  // IGNITE
  {
    id: "ignite-v50-5k",
    name: "IGNITE V50 5K",
    description: "5.000 PUFFS - Compacto e potente",
    price: 49.90,
    image: "/IGNITEV50.png",
    category: "pod",
    brand: "Ignite",
    puffs: "5000",
    inStock: true,
    flavors: ["Blue Rasberry Ice", "Strawberry Banana", "Blue Dream", "Strawberry Watermelon", "Strawberry Mango", "Watermelon Ice", "Peach Mango Watermelon"]
  },
  {
    id: "ignite-v80-8k",
    name: "IGNITE V80 8K",
    description: "8.000 PUFFS - Fluxo de ar suave + alta durabilidade",
    price: 59.90,
    image: "/IGNITEV80.png",
    category: "pod",
    brand: "Ignite",
    puffs: "8000",
    inStock: true,
    flavors: ["Cactus", "Strawberry Ice", "Banana Ice", "Ice Mint", "Passion Fruit Sour Kiwi", "Menthol", "Blueberry Ice"]
  },
  {
    id: "ignite-v150-15k",
    name: "IGNITE V150 15K",
    description: "15.000 PUFFS - Potência e longa duração",
    price: 109.90,
    image: "/IGNITEV150.png",
    category: "pod",
    brand: "Ignite",
    puffs: "15000",
    inStock: true,
    flavors: ["Ice Mint", "Blue Dream", "Strawberry Apple Watermelon", "Dragon Fruit Lemonade", "Pepermint Cream", "Sour Raspberry", "Watermelon Mix", "Cherry Banana", "Watermelon Ice", "Menthol", "Pineapple Ice"]
  },
  {
    id: "ignite-v250-25k",
    name: "IGNITE V250 25K",
    description: "25.000 PUFFS - Potência e longa duração",
    price: 109.90,
    image: "/IGNITEV250.png",
    category: "pod",
    brand: "Ignite",
    puffs: "25000",
    inStock: true,
    flavors: ["Ice Mint", "Cactus Lime Soda", "Banana Ice", "Watermelon Ice", "Grape Ice", "Strawberry Kiwi", "Banana Coconut Water", "Blueberry Ice", "Menthol", "Sweet and Sour Pomegranate", "Pineapple Mango", "Strawberry Ice"]
  },
  {
    id: "ignite-v400-40k",
    name: "IGNITE V400 40K",
    description: "40.000 PUFFS - Ultra bateria + fluxo ajustável",
    price: 124.90,
    image: "/IGNITEV400.png",
    category: "pod",
    brand: "Ignite",
    puffs: "40000",
    inStock: true,
    flavors: ["Ice Mint", "Strawberry Ice", "Grape Ice", "Menthol", "Peach Grape", "Watermelon Ice", "Strawberry Watermelon Ice", "Blueberry Ice"]
  },

  // ELF BAR
  {
    id: "elfbar-tc10000",
    name: "ELFBAR TOUCH",
    description: "10.000 PUFFS",
    price: 74.90,
    image: "/ELFBARTOUCH10K.png",
    category: "pod",
    brand: "Elf Bar",
    puffs: "10000",
    inStock: true,
    flavors: ["Blue Razz Ice", "Strawberry Ice", "Mango Ice"]
  },
  {
    id: "elfbar-230000",
    name: "ELFBAR 23K",
    description: "23.000 PUFFS - Display LED",
    price: 94.90,
    image: "/ELFBAR23K.png",
    category: "pod",
    brand: "Elf Bar",
    puffs: "23000",
    inStock: true,
    flavors: [/* mantido */]
  },
  {
    id: "elfbar-400000",
    name: "ELFBAR 40K ICE KING",
    description: "40.000 PUFFS - Display LED",
    price: 114.90,
    image: "/ELFBAR40K.png",
    category: "pod",
    brand: "Elf Bar",
    puffs: "40000",
    inStock: true,
    flavors: [/* mantido */]
  },

  // ADJUST
  {
    id: "adjust-40k",
    name: "ADJUST 40K",
    description: "40.000 PUFFS",
    price: 104.90,
    image: "/ADJUST40K.png",
    category: "pod",
    brand: "Adjust",
    puffs: "40000",
    inStock: true,
    flavors: [/* mantido */]
  },

  // NIKBAR
  {
    id: "nikbar-40k",
    name: "NIKBAR 40K",
    description: "40.000 PUFFS",
    price: 109.90,
    image: "/NIKBAR40K.png",
    category: "pod",
    brand: "Nikbar",
    puffs: "40000",
    inStock: true,
    flavors: [/* mantido */]
  }
];
