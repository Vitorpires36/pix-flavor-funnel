import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Chatbot } from '@/components/Chatbot';
import { products } from '@/lib/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const podProducts = products.filter(p => p.category === 'pod');
  const tabacariaProducts = products.filter(p => p.category === 'tabacaria');
  
  const brands = ['Ignite', 'Elf Bar', 'Lost Mary', 'Oxbar', 'Sex Addict', 'Adjust', 'Funkylands', 'Bem Bolado', 'Nikbar'];
  
  const filteredPods = selectedBrand === 'all' 
    ? podProducts 
    : podProducts.filter(p => p.brand === selectedBrand);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Banner de Aviso */}
      <div className="bg-muted text-foreground py-3 px-4 text-center">
        <p className="text-sm font-light italic">
          ⚠️ Proibida venda para menores de 18 anos • Produto contém nicotina
        </p>
      </div>

      {/* Marcas Disponíveis */}
      <div className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            IGNITE - ELFBAR - OXBAR - SEX ADDICT - ADJUST<br className="sm:hidden" />
            <span className="hidden sm:inline"> • </span>
            LOSTMARY - FUNKYLANDS - BEM BOLADO - NIKBAR
          </p>
        </div>
      </div>

      {/* Conteúdo Principal - Pods */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Vapes & Pods</h2>
        
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-6 bg-card">
            <TabsTrigger 
              value="all" 
              onClick={() => setSelectedBrand('all')}
              className="text-xs sm:text-sm"
            >
              Todos
            </TabsTrigger>
            {brands.map((brand) => (
              <TabsTrigger 
                key={brand}
                value={brand} 
                onClick={() => setSelectedBrand(brand)}
                className="text-xs sm:text-sm"
              >
                {brand}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedBrand} className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredPods.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredPods.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Nenhum produto encontrado para esta marca</p>
          </div>
        )}
      </main>

      {/* Seção Tabacaria */}
      <section className="bg-gradient-to-b from-background to-card py-12 border-t-2 border-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-accent mb-6 text-center">
            🔥 Tabacaria
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tabacariaProducts.map((product) => (
              <ProductCard key={product.id} product={product} isTabacaria />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-12 border-t-2 border-primary">
        <p className="text-sm">
          © 2024 PODE POD - Todos os direitos reservados
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Venda proibida para menores de 18 anos
        </p>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
