// src/lib/bairros.ts
export interface BairroSP {
  nome: string;
  distanciaKm: number;
  zona: 'Centro' | 'Oeste' | 'Sul' | 'Norte' | 'Leste';
  tempoEntregaMin: number;
  valorBase: number;
}

// =====================
// CONFIGURAÇÃO DE MARGEM
// =====================

// Margem fixa garantida por entrega
export const MARGEM_FIXA_ENTREGA = 15;

// Percentual sobre o valor dos produtos
export const MARGEM_PERCENTUAL_PRODUTOS = 0.03; // 3%

// Teto máximo do percentual (proteção UX)
export const TETO_PERCENTUAL_ENTREGA = 10;

// =====================
// BAIRROS / REGIÕES ATENDIDAS
// (valores base já dobrados)
// =====================
export const BAIRROS_SP: BairroSP[] = [
  // ========= CENTRO =========
  { nome: "República", distanciaKm: 1.8, zona: "Centro", tempoEntregaMin: 8, valorBase: 25.0 },
  { nome: "Sé", distanciaKm: 2.1, zona: "Centro", tempoEntregaMin: 10, valorBase: 25.6 },
  { nome: "Luz", distanciaKm: 2.3, zona: "Centro", tempoEntregaMin: 11, valorBase: 26.0 },
  { nome: "Santa Cecília", distanciaKm: 2.7, zona: "Centro", tempoEntregaMin: 12, valorBase: 27.2 },
  { nome: "Brás", distanciaKm: 3.4, zona: "Centro", tempoEntregaMin: 15, valorBase: 28.8 },
  { nome: "Belém", distanciaKm: 4.1, zona: "Centro", tempoEntregaMin: 18, valorBase: 30.2 },
  { nome: "Consolação", distanciaKm: 2.6, zona: "Centro", tempoEntregaMin: 12, valorBase: 27.0 },
  { nome: "Cerqueira César", distanciaKm: 3.1, zona: "Centro", tempoEntregaMin: 14, valorBase: 28.4 },

  // ========= OESTE =========
  { nome: "Pinheiros", distanciaKm: 4.8, zona: "Oeste", tempoEntregaMin: 18, valorBase: 30.6 },
  { nome: "Faria Lima", distanciaKm: 4.6, zona: "Oeste", tempoEntregaMin: 17, valorBase: 30.2 },
  { nome: "Jardins", distanciaKm: 3.5, zona: "Oeste", tempoEntregaMin: 14, valorBase: 28.4 },
  { nome: "Vila Madalena", distanciaKm: 4.2, zona: "Oeste", tempoEntregaMin: 15, valorBase: 29.4 },
  { nome: "Sumaré", distanciaKm: 4.9, zona: "Oeste", tempoEntregaMin: 18, valorBase: 30.8 },
  { nome: "Palmeiras-Barra Funda", distanciaKm: 5.9, zona: "Oeste", tempoEntregaMin: 22, valorBase: 34.2 },
  { nome: "Butantã", distanciaKm: 6.8, zona: "Oeste", tempoEntregaMin: 25, valorBase: 36.0 },
  { nome: "Vila Sônia", distanciaKm: 9.2, zona: "Oeste", tempoEntregaMin: 35, valorBase: 41.0 },
  { nome: "Vila Olímpia", distanciaKm: 5.5, zona: "Oeste", tempoEntregaMin: 22, valorBase: 34.0 },

  // ========= SUL =========
  { nome: "Paraíso", distanciaKm: 4.1, zona: "Sul", tempoEntregaMin: 16, valorBase: 30.0 },
  { nome: "Ipiranga", distanciaKm: 8.1, zona: "Sul", tempoEntregaMin: 30, valorBase: 36.8 },
  { nome: "Vila Mariana", distanciaKm: 6.2, zona: "Sul", tempoEntregaMin: 23, valorBase: 33.8 },
  { nome: "Saúde", distanciaKm: 7.3, zona: "Sul", tempoEntregaMin: 27, valorBase: 35.6 },
  { nome: "São Judas", distanciaKm: 7.8, zona: "Sul", tempoEntregaMin: 29, valorBase: 36.4 },
  { nome: "Conceição", distanciaKm: 8.4, zona: "Sul", tempoEntregaMin: 31, valorBase: 37.8 },
  { nome: "Jabaquara", distanciaKm: 10.2, zona: "Sul", tempoEntregaMin: 38, valorBase: 42.0 },
  { nome: "Brooklin", distanciaKm: 6.8, zona: "Sul", tempoEntregaMin: 25, valorBase: 37.0 },
  { nome: "Campo Belo", distanciaKm: 7.8, zona: "Sul", tempoEntregaMin: 29, valorBase: 36.4 },
  { nome: "Morumbi", distanciaKm: 9.5, zona: "Sul", tempoEntregaMin: 35, valorBase: 41.0 },
  { nome: "Santo Amaro", distanciaKm: 9.5, zona: "Sul", tempoEntregaMin: 35, valorBase: 41.0 },
  { nome: "Capão Redondo", distanciaKm: 14.5, zona: "Sul", tempoEntregaMin: 55, valorBase: 52.0 },
  { nome: "Campo Limpo", distanciaKm: 13.8, zona: "Sul", tempoEntregaMin: 52, valorBase: 50.0 },
  { nome: "Grajaú", distanciaKm: 18.5, zona: "Sul", tempoEntregaMin: 65, valorBase: 60.0 },
  { nome: "Varginha", distanciaKm: 20.2, zona: "Sul", tempoEntregaMin: 70, valorBase: 64.0 },

  // ========= NORTE =========
  { nome: "Tucuruvi", distanciaKm: 7.1, zona: "Norte", tempoEntregaMin: 26, valorBase: 35.8 },
  { nome: "Santana", distanciaKm: 6.3, zona: "Norte", tempoEntregaMin: 24, valorBase: 34.0 },
  { nome: "Carandiru", distanciaKm: 5.4, zona: "Norte", tempoEntregaMin: 20, valorBase: 32.0 },
  { nome: "Portuguesa-Tietê", distanciaKm: 6.0, zona: "Norte", tempoEntregaMin: 22, valorBase: 33.2 },
  { nome: "Pirituba", distanciaKm: 12.5, zona: "Norte", tempoEntregaMin: 48, valorBase: 48.0 },
  { nome: "Jaraguá", distanciaKm: 16.8, zona: "Norte", tempoEntregaMin: 60, valorBase: 56.0 },

  // ========= LESTE =========
  { nome: "Tatuapé", distanciaKm: 8.7, zona: "Leste", tempoEntregaMin: 33, valorBase: 37.8 },
  { nome: "Vila Prudente", distanciaKm: 9.2, zona: "Leste", tempoEntregaMin: 35, valorBase: 38.6 },
  { nome: "Oratório", distanciaKm: 9.8, zona: "Leste", tempoEntregaMin: 37, valorBase: 39.4 },
  { nome: "São Lucas", distanciaKm: 10.4, zona: "Leste", tempoEntregaMin: 39, valorBase: 40.6 },
  { nome: "Itaquera", distanciaKm: 15.2, zona: "Leste", tempoEntregaMin: 55, valorBase: 54.0 },
  { nome: "Corinthians-Itaquera", distanciaKm: 15.5, zona: "Leste", tempoEntregaMin: 56, valorBase: 54.6 },
  { nome: "Artur Alvim", distanciaKm: 13.4, zona: "Leste", tempoEntregaMin: 50, valorBase: 50.8 },
  { nome: "Guaianases", distanciaKm: 18.9, zona: "Leste", tempoEntregaMin: 68, valorBase: 62.0 },
  { nome: "São Miguel Paulista", distanciaKm: 16.5, zona: "Leste", tempoEntregaMin: 60, valorBase: 56.0 },

  // ========= GRANDE SP =========
  { nome: "Osasco", distanciaKm: 18.0, zona: "Oeste", tempoEntregaMin: 60, valorBase: 56.0 },
  { nome: "Barueri", distanciaKm: 26.0, zona: "Oeste", tempoEntregaMin: 80, valorBase: 70.0 },
  { nome: "Jandira", distanciaKm: 28.0, zona: "Oeste", tempoEntregaMin: 85, valorBase: 76.0 },
  { nome: "Itapevi", distanciaKm: 35.0, zona: "Oeste", tempoEntregaMin: 100, valorBase: 88.0 },

  { nome: "São Caetano do Sul", distanciaKm: 16.0, zona: "Sul", tempoEntregaMin: 55, valorBase: 54.0 },
  { nome: "Santo André", distanciaKm: 18.0, zona: "Sul", tempoEntregaMin: 60, valorBase: 58.0 },
  { nome: "Mauá", distanciaKm: 24.0, zona: "Sul", tempoEntregaMin: 75, valorBase: 68.0 },
  { nome: "Ribeirão Pires", distanciaKm: 28.0, zona: "Sul", tempoEntregaMin: 85, valorBase: 74.0 },

  { nome: "Ferraz de Vasconcelos", distanciaKm: 28.0, zona: "Leste", tempoEntregaMin: 85, valorBase: 74.0 },
  { nome: "Poá", distanciaKm: 30.0, zona: "Leste", tempoEntregaMin: 90, valorBase: 78.0 },
  { nome: "Itaquaquecetuba", distanciaKm: 32.0, zona: "Leste", tempoEntregaMin: 95, valorBase: 82.0 },
  { nome: "Mogi das Cruzes", distanciaKm: 45.0, zona: "Leste", tempoEntregaMin: 130, valorBase: 110.0 },

  { nome: "Aeroporto Internacional de Guarulhos", distanciaKm: 25.0, zona: "Norte", tempoEntregaMin: 80, valorBase: 70.0 },
];

// =====================
// UTILITÁRIOS
// =====================
export const ZONAS = ['Todas', 'Centro', 'Oeste', 'Sul', 'Norte', 'Leste'] as const;

export function getZonaColor(zona: string): string {
  const colors: Record<string, string> = {
    Centro: 'bg-purple-500',
    Oeste: 'bg-blue-500',
    Sul: 'bg-green-500',
    Norte: 'bg-red-500',
    Leste: 'bg-yellow-500',
  };
  return colors[zona] || 'bg-gray-500';
}

export function buscarBairroPorNome(nome: string): BairroSP | undefined {
  return BAIRROS_SP.find(
    b => b.nome.toLowerCase() === nome.toLowerCase()
  );
}

/**
 * Cálculo final da entrega (MODELO HÍBRIDO)
 */
export function calcularValorEntrega(
  bairro: BairroSP,
  valorProdutos: number
): number {
  const percentual = Math.min(
    valorProdutos * MARGEM_PERCENTUAL_PRODUTOS,
    TETO_PERCENTUAL_ENTREGA
  );

  return Number(
    (
      bairro.valorBase +
      MARGEM_FIXA_ENTREGA +
      percentual
    ).toFixed(2)
  );
}
