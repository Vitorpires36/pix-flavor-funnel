# PODE POD - E-commerce de Vapes e Pods

Loja online de vapes e pods descartáveis com sistema de entregas para São Paulo.

## Project info

**URL**: https://lovable.dev/projects/9124cb65-e16c-4572-bb75-eefaf059d833

## Funcionalidades

- Catálogo de produtos com 8+ marcas (Ignite, Elf Bar, Lost Mary, Oxbar, etc)
- Carrinho de compras com gestão de quantidades
- Sistema de checkout com seleção de 126+ bairros de SP
- Cálculo automático de frete por distância
- Frete grátis acima de R$ 300
- Integração com WhatsApp para pedidos
- Pagamento via PIX
- Chatbot interativo para atendimento

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9124cb65-e16c-4572-bb75-eefaf059d833) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Vite** - Build tool e dev server
- **TypeScript** - Type safety
- **React 18** - UI framework
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **Supabase** - Backend e banco de dados
- **Edge Functions** - Cálculo de frete serverless

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9124cb65-e16c-4572-bb75-eefaf059d833) and click on Share -> Publish.

Para instruções detalhadas de deploy, veja:
- **[DEPLOY.md](./DEPLOY.md)** - Guia completo de deploy
- **[CHECKLIST_DEPLOY.md](./CHECKLIST_DEPLOY.md)** - Checklist pré-deploy
- **[REVISAO_FINAL.md](./REVISAO_FINAL.md)** - Relatório de revisão

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Estrutura do Projeto

```
projeto/
├── public/                    # Imagens dos produtos
├── src/
│   ├── components/           # Componentes React
│   ├── contexts/             # Context API (Carrinho)
│   ├── lib/                  # Utilitários e dados
│   ├── pages/                # Páginas da aplicação
│   └── types/                # TypeScript types
├── supabase/
│   ├── functions/            # Edge Functions
│   └── migrations/           # Migrações do banco
└── [documentação]            # DEPLOY.md, CHECKLIST, etc
```

## Configurações Importantes

- **WhatsApp**: 5511981878093
- **PIX**: 5511948453681
- **Frete Grátis**: Pedidos acima de R$ 300
- **Bairros Atendidos**: 126+ bairros em São Paulo

## Comandos Úteis

```bash
npm run dev          # Iniciar desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
```

## Suporte

Para problemas ou dúvidas, consulte:
- [DEPLOY.md](./DEPLOY.md) para guia de deploy
- [REVISAO_FINAL.md](./REVISAO_FINAL.md) para status do projeto
- Console do Supabase para logs do backend
