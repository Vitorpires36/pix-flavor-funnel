import { useState, useCallback } from 'react';

interface FreteResponse {
  distanciaKm: number;
  duracaoMin: number;
  preco: number;
  valorPorKm: number;
  margemMinima: number;
}

interface FreteState {
  loading: boolean;
  data: FreteResponse | null;
  error: string | null;
}

const STORE_ADDRESS = 'Rua Barao de Duprat, 535, Sao Paulo';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const useFreteCalculation = () => {
  const [frete, setFrete] = useState<FreteState>({
    loading: false,
    data: null,
    error: null,
  });

  const calcularFrete = useCallback(async (enderecoEntrega: string) => {
    if (!enderecoEntrega.trim()) {
      setFrete({
        loading: false,
        data: null,
        error: 'Endereço de entrega é obrigatório',
      });
      return null;
    }

    setFrete({ loading: true, data: null, error: null });

    try {
      const params = new URLSearchParams({
        origem: STORE_ADDRESS,
        destino: enderecoEntrega,
      });

      const apiUrl = `${SUPABASE_URL}/functions/v1/calcular-frete?${params}`;

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao calcular frete');
      }

      const data: FreteResponse = await response.json();

      setFrete({
        loading: false,
        data,
        error: null,
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setFrete({
        loading: false,
        data: null,
        error: errorMessage,
      });
      return null;
    }
  }, []);

  const resetFrete = useCallback(() => {
    setFrete({
      loading: false,
      data: null,
      error: null,
    });
  }, []);

  return {
    ...frete,
    calcularFrete,
    resetFrete,
  };
};
