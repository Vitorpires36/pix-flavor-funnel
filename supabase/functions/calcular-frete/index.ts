import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FreteResponse {
  distanciaKm: number;
  duracaoMin: number;
  preco: number;
  valorPorKm: number;
  margemMinima: number;
}

interface FreteConfig {
  valor_por_km: number;
  margem_minima: number;
}

const STORE_ADDRESS = "Rua Barao de Duprat, 535, Sao Paulo";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseKey);

function simularDistancia(origem: string, destino: string): number {
  const origemHash = origem
    .toLowerCase()
    .split("")
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

  const destinoHash = destino
    .toLowerCase()
    .split("")
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

  const distancia = Math.abs(origemHash - destinoHash) % 50;

  return Math.max(0.5, Math.min(distancia, 30));
}

function calcularDuracao(distanciaKm: number): number {
  const velocidadeMedia = 30;
  const minutosPorKm = 60 / velocidadeMedia;
  const tempo = distanciaKm * minutosPorKm;

  return Math.round(Math.max(10, tempo));
}

async function obterConfigFrete(): Promise<FreteConfig> {
  const { data, error } = await supabase
    .from("frete_config")
    .select("valor_por_km, margem_minima")
    .eq("ativo", true)
    .maybeSingle();

  if (error || !data) {
    return {
      valor_por_km: 2.5,
      margem_minima: 10,
    };
  }

  return {
    valor_por_km: data.valor_por_km,
    margem_minima: data.margem_minima,
  };
}

function calcularPrecoFrete(
  distanciaKm: number,
  valorPorKm: number,
  margemMinima: number
): number {
  const valorFrete = distanciaKm * valorPorKm + margemMinima;

  return Math.round(valorFrete * 100) / 100;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const origem = url.searchParams.get("origem") || STORE_ADDRESS;
    const destino = url.searchParams.get("destino");

    if (!destino || !destino.trim()) {
      return new Response(
        JSON.stringify({
          erro: "Parâmetro 'destino' é obrigatório",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const config = await obterConfigFrete();

    const distanciaKm = simularDistancia(origem, destino);
    const duracaoMin = calcularDuracao(distanciaKm);
    const preco = calcularPrecoFrete(
      distanciaKm,
      config.valor_por_km,
      config.margem_minima
    );

    const resultado: FreteResponse = {
      distanciaKm: Math.round(distanciaKm * 10) / 10,
      duracaoMin,
      preco,
      valorPorKm: config.valor_por_km,
      margemMinima: config.margem_minima,
    };

    return new Response(JSON.stringify(resultado), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

    return new Response(
      JSON.stringify({
        erro: "Erro ao calcular frete",
        mensagem: errorMessage,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
