import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Chatbot } from '@/components/Chatbot';
import { products as initialProducts } from '@/lib/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/product';

const Index = () => {
  // Estado inicial usa a lista fixa, mas será substituído pelos dados do servidor
  const [productsData, setProductsData] = useState<Product[]>(initialProducts);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Busca os dados atualizados do Painel Admin (remove duplicatas e atualiza estoque)
  useEffect(() => {
    // Tenta buscar na porta 4001 (Admin Server)
    fetch('http://localhost:4001/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          console.log('✅ Produtos sincronizados com o Admin (Porta 4001)!');
          setProductsData(data);
        }
      })
      .catch(err => {
        console.error('❌ Erro ao buscar produtos na porta 4001:', err);
        // Fallback para tentar 4000 caso o usuário esteja usando essa porta
        fetch('http://localhost:4000/api/products')
          .then(res => res.json())
          .then(data => {
             if (Array.isArray(data) && data.length > 0) {
               console.log('✅ Produtos sincronizados com o Server Local (Porta 4000)!');
               setProductsData(data);
             }
          })
          .catch(err2 => console.error('❌ Erro ao buscar produtos na porta 4000 também:', err2));
      });
  }, []);

  const podProducts = productsData.filter(p => p.category === 'pod');
  
  const brands = ['Ignite', 'Elf Bar', 'Lost Mary', 'Oxbar', 'Sex Addict', 'Adjust', 'Nikbar'];
  
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
            LOSTMARY  - NIKBAR
          </p>
        </div>
      </div>

      {/* Conteúdo Principal - Pods */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Pods</h2>
        
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto mb-6 bg-card">
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

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-12 border-t-2 border-primary">
        <p className="text-sm">
          © 2026 PodePod. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
