# API de Cálculo de Frete

API simples para cálculo de frete baseado em distância.

## Instalação

```bash
npm install
```

## Como Usar

### Iniciar o servidor:

```bash
npm start
```

O servidor estará disponível em: `http://localhost:4000`

### Modo desenvolvimento (auto-restart):

```bash
npm run dev
```

## Rotas Disponíveis

### 1. Calcular Frete (com origem e destino)

```
GET http://localhost:4000/api/frete?origem=Rua%20A&destino=Rua%20B
```

**Resposta:**
```json
{
  "distanciaKm": 4.8,
  "duracaoMin": 12,
  "preco": 17.25
}
```

### 2. Calcular Frete (distância aleatória)

```
GET http://localhost:4000/api/frete
```

**Resposta:**
```json
{
  "distanciaKm": 8.3,
  "duracaoMin": 21,
  "preco": 28.99
}
```

### 3. Health Check

```
GET http://localhost:4000/health
```

**Resposta:**
```json
{
  "status": "ok",
  "servidor": "API de Frete",
  "versao": "1.0.0"
}
```

## Fórmula de Cálculo

```javascript
preco = 5 + distanciaKm * 2.5
if (preco < 10) preco = 10
preco *= 1.15
preco = Math.round(preco * 100) / 100
```

**Duração:** `distância * 2.5 minutos/km`

## Exemplos de Teste

### cURL:
```bash
curl "http://localhost:4000/api/frete?origem=Centro&destino=Periferia"
```

### JavaScript (fetch):
```javascript
const response = await fetch('http://localhost:4000/api/frete?origem=Centro&destino=Periferia');
const dados = await response.json();
console.log(dados);
```

## Expandir Funcionalidades

Para integrar com APIs de mapas reais (Google Maps, OpenStreetMap, etc):

1. Obtenha uma API key do serviço escolhido
2. Substitua a função `calcularDistanciaSimulada()` por uma chamada à API
3. Use `node-fetch` para fazer requisições HTTP

Exemplo:
```javascript
import fetch from 'node-fetch';

async function calcularDistanciaReal(origem, destino) {
  const response = await fetch(`https://api-de-mapas.com/distance?from=${origem}&to=${destino}&key=SUA_KEY`);
  const data = await response.json();
  return data.distance;
}
```
