# Checklist de Deploy - PODE POD

Use este checklist antes de fazer o deploy para produção.

## Pré-Deploy

### Código
- [x] Build compila sem erros (`npm run build`)
- [x] Sem console.log/error no código de produção
- [x] Sem imports não utilizados
- [x] Código TypeScript sem erros

### Configurações
- [ ] Número do WhatsApp correto (5511981878093)
- [ ] Chave PIX correta (5511948453681)
- [ ] Valor mínimo para frete grátis configurado (R$ 300)
- [ ] Variáveis de ambiente do Supabase configuradas

### Imagens
- [ ] Todas as imagens dos produtos existem em `public/`
- [ ] Imagens otimizadas (tamanho adequado)
- [ ] Nomes dos arquivos correspondem aos produtos

### Banco de Dados
- [ ] Supabase está ativo
- [ ] Tabela `frete_config` criada
- [ ] Dados de configuração de frete inseridos
- [ ] Edge Function `calcular-frete` deployada

## Testes Funcionais

### Navegação
- [ ] Página principal carrega
- [ ] Produtos aparecem corretamente
- [ ] Filtros de marca funcionam
- [ ] Imagens carregam

### Carrinho
- [ ] Adicionar produto ao carrinho
- [ ] Remover produto do carrinho
- [ ] Atualizar quantidade
- [ ] Total calcula corretamente
- [ ] Limpar carrinho funciona

### Checkout
- [ ] Modal de checkout abre
- [ ] Busca de bairro funciona
- [ ] Filtro por zona funciona
- [ ] Seleção de bairro funciona
- [ ] Cálculo de frete correto
- [ ] Frete grátis acima de R$ 300 funciona
- [ ] Validação de campos obrigatórios
- [ ] Transição para tela de PIX funciona

### PIX e WhatsApp
- [ ] Chave PIX aparece correta
- [ ] Copiar chave PIX funciona
- [ ] Botão WhatsApp abre com mensagem correta
- [ ] Número do WhatsApp está correto
- [ ] Mensagem contém todos os dados do pedido

### Chatbot
- [ ] Botão do chatbot aparece
- [ ] Chatbot abre e fecha
- [ ] Opções de resposta funcionam
- [ ] Botão "Falar com atendente" abre WhatsApp
- [ ] Número do WhatsApp está correto

### Responsividade
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Performance
- [ ] Tempo de carregamento < 3s
- [ ] Imagens otimizadas
- [ ] Bundle size razoável

## Pós-Deploy

### Verificação Produção
- [ ] Site está acessível
- [ ] HTTPS funcionando
- [ ] Todas as páginas carregam
- [ ] Formulários funcionam
- [ ] WhatsApp funciona
- [ ] Sem erros no console do navegador

### SEO
- [ ] Title tag configurado
- [ ] Meta description configurado
- [ ] Open Graph tags configuradas
- [ ] Robots.txt configurado

### Analytics (Opcional)
- [ ] Google Analytics configurado
- [ ] Facebook Pixel (se aplicável)
- [ ] Rastreamento de conversões

## Segurança

- [ ] Variáveis de ambiente não expostas no código
- [ ] API keys seguras
- [ ] HTTPS ativo
- [ ] CORS configurado corretamente

## Backup

- [ ] Código versionado no Git
- [ ] Backup do banco de dados
- [ ] Documentação atualizada

## Contatos de Emergência

- WhatsApp: 5511981878093
- PIX: 5511948453681

## Notas

- Sempre teste em staging antes de produção
- Mantenha um backup antes de cada deploy
- Documente todas as mudanças

---

Data do último deploy: ___/___/______
Responsável: _________________
Status: [ ] Sucesso [ ] Falha [ ] Rollback
