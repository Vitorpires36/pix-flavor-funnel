import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.get('/api/frete', (req, res) => {
  try {
    const { origem, destino } = req.query;

    let distanciaKm;

    if (origem && destino) {
      distanciaKm = calcularDistanciaSimulada(origem, destino);
    } else {
      distanciaKm = gerarDistanciaAleatoria();
    }

    const duracaoMin = calcularDuracao(distanciaKm);
    const preco = calcularPreco(distanciaKm);

    const resultado = {
      distanciaKm: Math.round(distanciaKm * 10) / 10,
      duracaoMin: Math.round(duracaoMin),
      preco: preco
    };

    console.log(`📦 Frete calculado: ${resultado.distanciaKm}km - R$ ${resultado.preco}`);

    res.json(resultado);

  } catch (error) {
    console.error('❌ Erro ao calcular frete:', error.message);
    res.status(500).json({
      erro: 'Erro ao calcular frete',
      mensagem: error.message
    });
  }
});

function calcularDistanciaSimulada(origem, destino) {
  const hashOrigem = origem.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hashDestino = destino.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const distancia = Math.abs(hashOrigem - hashDestino) / 10;

  return Math.max(0.5, Math.min(distancia, 50));
}

function gerarDistanciaAleatoria() {
  return Math.random() * 20 + 1;
}

function calcularDuracao(distanciaKm) {
  return distanciaKm * 2.5;
}

function calcularPreco(distanciaKm) {
  let preco = 5 + distanciaKm * 2.5;

  if (preco < 10) {
    preco = 10;
  }

  preco *= 1.15;

  preco = Math.round(preco * 100) / 100;

  return preco;
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    servidor: 'API de Frete',
    versao: '1.0.0'
  });
});

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    rotas_disponiveis: [
      'GET /api/frete?origem=enderecoA&destino=enderecoB',
      'GET /api/frete (gera distância aleatória)',
      'GET /health'
    ]
  });
});

app.listen(PORT, () => {
  console.log('');
  console.log('🚚 ================================');
  console.log(`🚚 Servidor de Frete Rodando!`);
  console.log(`🚚 URL: http://localhost:${PORT}`);
  console.log('🚚 ================================');
  console.log('');
  console.log('📍 Rotas disponíveis:');
  console.log(`   GET http://localhost:${PORT}/api/frete`);
  console.log(`   GET http://localhost:${PORT}/api/frete?origem=enderecoA&destino=enderecoB`);
  console.log(`   GET http://localhost:${PORT}/health`);
  console.log('');
  console.log('📦 Fórmula de cálculo:');
  console.log('   preco = 5 + distanciaKm * 2.5');
  console.log('   preco minimo = 10');
  console.log('   preco final = preco * 1.15 (taxa)');
  console.log('');
  console.log('⏱️  Duração estimada: distância * 2.5 min/km');
  console.log('');
});
