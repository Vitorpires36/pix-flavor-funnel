import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus } from 'lucide-react';
import AnalyticsDashboard from "@/components/ui/analytics-dashboard";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface FreightItem {
  id: string;
  value: number;
}

const INITIAL_PODS: ProductItem[] = [
  { id: 'ignite-v50', name: 'Ignite V50', price: 74.90, quantity: 0 },
  { id: 'ignite-v80', name: 'Ignite V80', price: 89.90, quantity: 0 },
  { id: 'ignite-v120', name: 'Ignite V120', price: 94.90, quantity: 0 },
  { id: 'ignite-v150', name: 'Ignite V150', price: 99.90, quantity: 0 },
  { id: 'ignite-v250', name: 'Ignite V250', price: 124.90, quantity: 0 },
  { id: 'ignite-v300', name: 'Ignite V300', price: 129.90, quantity: 0 },
  { id: 'ignite-v400-1', name: 'Ignite V400', price: 129.90, quantity: 0 },
  { id: 'ignite-v400-2', name: 'Ignite V400 (Promo)', price: 119.90, quantity: 0 },
  { id: 'elfbar-bc16k', name: 'Elfbar BC 16K', price: 99.90, quantity: 0 },
  { id: 'elfbar-bc-touch-10k', name: 'Elfbar BC TOUCH 10K', price: 69.90, quantity: 0 },
  { id: 'elfbar-18k', name: 'Elfbar 18K', price: 84.90, quantity: 0 },
  { id: 'elfbar-23k', name: 'Elfbar 23K', price: 89.90, quantity: 0 },
  { id: 'elfbar-30k', name: 'Elfbar 30K', price: 129.90, quantity: 0 },
  { id: 'elfbar-40k', name: 'Elfbar 40K', price: 134.90, quantity: 0 },
  { id: 'lostmary-20k', name: 'LostMary 20K', price: 94.90, quantity: 0 },
  { id: 'lostmary-30k', name: 'LostMary 30K', price: 119.90, quantity: 0 },
  { id: 'oxbar-9.5k', name: 'Oxbar 9.5K', price: 74.90, quantity: 0 },
  { id: 'oxbar-10k', name: 'Oxbar 10K', price: 79.90, quantity: 0 },
  { id: 'oxbar-30k', name: 'Oxbar 30K', price: 104.90, quantity: 0 },
  { id: 'maskking-40k', name: 'Maskking 40K', price: 99.90, quantity: 0 },
  { id: 'waka-20k', name: 'Waka 20k', price: 84.90, quantity: 0 },
  { id: 'cabo-tipo-c', name: 'Cabo Tipo C', price: 16.90, quantity: 0 },
];

const INITIAL_CANSMOKE: ProductItem[] = [
  { id: 'seda-ocb-xpert', name: 'Seda OCB X-Pert', price: 8.00, quantity: 0 },
  { id: 'seda-ocb-black', name: 'Seda OCB Black 1/4', price: 6.00, quantity: 0 },
  { id: 'piteira-hiper', name: 'Piteira Hiper Large GG', price: 8.00, quantity: 0 },
  { id: 'filtros-slim', name: 'Filtros Slim Longos BB', price: 9.90, quantity: 0 },
  { id: 'isqueiro', name: 'Isqueiro', price: 8.90, quantity: 0 },
  { id: 'tabaco-amsterdam', name: 'Tabaco Amsterdam', price: 23.90, quantity: 0 },
  { id: 'tabaco-acrema', name: 'Tabaco ACrema', price: 22.90, quantity: 0 },
  { id: 'cuia', name: 'Cuia', price: 0, quantity: 0 },
  { id: 'tesoura', name: 'Tesoura', price: 0, quantity: 0 },
  { id: 'bag', name: 'BAG', price: 0, quantity: 0 },
];

const AdminSales = () => {
  const [pods, setPods] = useState<ProductItem[]>(INITIAL_PODS);
  const [cansmoke, setCansmoke] = useState<ProductItem[]>(INITIAL_CANSMOKE);
  const [fretes, setFretes] = useState<FreightItem[]>([
    { id: '1', value: 15 },
    { id: '2', value: 40 },
    { id: '3', value: 5 },
    { id: '4', value: 15 },
  ]);

  const updateQuantity = (id: string, qty: number, type: 'pods' | 'cansmoke') => {
    const setter = type === 'pods' ? setPods : setCansmoke;
    setter(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: qty } : item
    ));
  };

  const updatePrice = (id: string, price: number, type: 'pods' | 'cansmoke') => {
    const setter = type === 'pods' ? setPods : setCansmoke;
    setter(prev => prev.map(item => 
      item.id === id ? { ...item, price: price } : item
    ));
  };

  const addFrete = () => {
    setFretes(prev => [...prev, { id: Date.now().toString(), value: 0 }]);
  };

  const updateFrete = (id: string, value: number) => {
    setFretes(prev => prev.map(item => 
      item.id === id ? { ...item, value } : item
    ));
  };

  const removeFrete = (id: string) => {
    setFretes(prev => prev.filter(item => item.id !== id));
  };

  const totalPods = useMemo(() => pods.reduce((acc, item) => acc + (item.price * item.quantity), 0), [pods]);
  const totalPodsQty = useMemo(() => pods.reduce((acc, item) => acc + item.quantity, 0), [pods]);
  
  const totalCansmoke = useMemo(() => cansmoke.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cansmoke]);
  const totalCansmokeQty = useMemo(() => cansmoke.reduce((acc, item) => acc + item.quantity, 0), [cansmoke]);

  const totalFretes = useMemo(() => fretes.reduce((acc, item) => acc + item.value, 0), [fretes]);

  const grandTotal = totalPods + totalCansmoke + totalFretes;
  // Assuming Profit is manual or calculated? The prompt has "Obs: Lucro R$130,80". 
  // For now I'll just calculate the Revenue (Faturamento). Profit requires Cost Price which I don't have.
  // I'll add a manual field for Profit or Observation as requested.

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <AnalyticsDashboard />
      <div className="my-8" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin - Vendas (Dezembro)</h1>
        <div className="text-xl font-bold bg-primary/10 p-4 rounded-lg">
          Total Geral: {formatCurrency(grandTotal)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* PODEPOD Section */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-center">PODEPOD</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Modelo</TableHead>
                    <TableHead className="w-[100px]">Preço</TableHead>
                    <TableHead className="w-[80px]">Qtd</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pods.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                         {/* Allow price edit just in case */}
                         <Input 
                          type="number" 
                          value={item.price} 
                          onChange={(e) => updatePrice(item.id, Number(e.target.value), 'pods')}
                          className="h-8 w-20"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value), 'pods')}
                          className="h-8 w-16 bg-secondary/20"
                          min="0"
                        />
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell>TOTAL</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{totalPodsQty}</TableCell>
                    <TableCell className="text-right">{formatCurrency(totalPods)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* CANSMOKE Section */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader className="bg-accent/5">
              <CardTitle className="text-center text-accent-foreground">CANSMOKE</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="w-[100px]">Preço</TableHead>
                    <TableHead className="w-[80px]">Qtd</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cansmoke.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          value={item.price} 
                          onChange={(e) => updatePrice(item.id, Number(e.target.value), 'cansmoke')}
                          className="h-8 w-20"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value), 'cansmoke')}
                          className="h-8 w-16 bg-secondary/20"
                          min="0"
                        />
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell>TOTAL</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{totalCansmokeQty}</TableCell>
                    <TableCell className="text-right">{formatCurrency(totalCansmoke)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* FRETES Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-secondary/10">
              <CardTitle className="text-center">FRETES</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {fretes.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    value={item.value} 
                    onChange={(e) => updateFrete(item.id, Number(e.target.value))}
                    className="flex-1"
                    placeholder="Valor"
                    step="0.01"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFrete(item.id)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addFrete} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Adicionar
              </Button>
              <Separator />
              <div className="flex justify-between items-center font-bold text-lg pt-2">
                <span>Total</span>
                <span>{formatCurrency(totalFretes)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSales;
