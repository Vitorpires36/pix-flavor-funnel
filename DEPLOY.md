# Guia de Deploy - PODE POD

Este documento descreve como fazer o deploy da aplicação PODE POD.

## Pré-requisitos

- Conta no Lovable.dev (recomendado) ou outro serviço de hosting
- Node.js 18+ instalado
- Supabase configurado (já incluído via Lovable)

## Deploy via Lovable

A aplicação está configurada para deploy automático via Lovable:

1. Acesse [Lovable.dev](https://lovable.dev/projects/9124cb65-e16c-4572-bb75-eefaf059d833)
2. Clique em "Share" > "Publish"
3. Seu site será publicado automaticamente

## Deploy Manual

Se preferir fazer deploy manual, siga os passos:

### 1. Build da Aplicação

```bash
npm install
npm run build
```

Isso gerará uma pasta `dist/` com os arquivos estáticos.

### 2. Deploy dos Arquivos Estáticos

Você pode fazer deploy da pasta `dist/` em qualquer serviço de hospedagem estática:

- **Vercel**: `vercel --prod`
- **Netlify**: Arraste a pasta `dist/` para o Netlify Drop
- **GitHub Pages**: Configure o GitHub Actions
- **AWS S3**: Upload da pasta `dist/`

### 3. Configuração de Variáveis de Ambiente

As variáveis de ambiente do Supabase são configuradas automaticamente pelo Lovable.
Se estiver fazendo deploy manual, você precisará configurar:

- `VITE_SUPABASE_URL`: URL do seu projeto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase

## Edge Functions (Supabase)

A aplicação possui uma Edge Function para cálculo de frete:

### Deploy da Edge Function

A Edge Function já está deployada via Supabase. Se precisar atualizar:

1. Acesse o painel do Supabase
2. Vá em Edge Functions
3. A função `calcular-frete` já está configurada

## Banco de Dados

O banco de dados Supabase está configurado com:

- Tabela `frete_config` para configuração dinâmica de frete
- Valores padrão já inseridos

### Verificar Configuração

Execute no SQL Editor do Supabase:

```sql
SELECT * FROM frete_config WHERE ativo = true;
```

## Configurações Importantes

### Números de WhatsApp

Os números de WhatsApp estão configurados em:

- `src/components/CheckoutDialog.tsx` (linha 291): `5511981878093`
- `src/components/Chatbot.tsx` (linha 61): `5511981878093`

Para alterar, basta editar esses arquivos e fazer novo deploy.

### Chave PIX

A chave PIX está em `src/components/CheckoutDialog.tsx` (linha 221): `5511948453681`

### Valor para Frete Grátis

Configurado em `src/components/CheckoutDialog.tsx` (linha 247): R$ 300,00

## Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ Site carrega corretamente
2. ✅ Imagens dos produtos aparecem
3. ✅ Carrinho funciona
4. ✅ Checkout abre e seleciona bairros
5. ✅ Botão WhatsApp direciona corretamente
6. ✅ Chave PIX é copiável
7. ✅ Chatbot funciona

## Troubleshooting

### Imagens não aparecem

- Verifique se todas as imagens em `public/` foram enviadas
- Certifique-se que os nomes dos arquivos correspondem aos produtos

### Erro no Checkout

- Verifique a conexão com Supabase
- Confirme que a tabela `frete_config` existe e tem dados

### Edge Function não responde

- Verifique no painel do Supabase se a função está deployada
- Teste diretamente a URL da função

## Suporte

Para problemas ou dúvidas:

- Verifique a documentação do Lovable
- Acesse o console do Supabase para logs
- Verifique o console do navegador para erros JavaScript

## Atualizações Futuras

Para atualizar a aplicação:

1. Faça as alterações no código
2. Teste localmente com `npm run dev`
3. Faça commit e push para o repositório
4. O Lovable fará o redeploy automaticamente

---

Última atualização: Dezembro 2024
