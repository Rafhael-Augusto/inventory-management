# 📦 Inventory Management

Aplicação fullstack para gerenciamento de estoque, construída com Next.js, Prisma e PostgreSQL.

Permite visualizar métricas, gerenciar produtos e acompanhar níveis de estoque em tempo real.

## 📊 Funcionalidades

### Dashboard
- Valor total do estoque
- Total de produtos
- Produtos com estoque baixo

### Produtos
- Adicionar e remover produtos
- Visualização em tabela
- Busca com debounce

### Autenticação
- Email e senha
- Login com Google
- Login com GitHub
- Implementado com Better Auth

## 🛠️ Tecnologias

### Frontend
- Next.js
- React
- TailwindCSS
- shadcn/ui
- Radix UI
- Recharts

### Backend
- Next.js (Server Actions / API)
- Prisma ORM
- PostgreSQL

### Outros
- Better Auth
- React Hook Form
- Zod
- use-debounce
- Lucide + React Icons

## 📦 Instalação

### Clone o repositório

```bash
git clone git@github.com:Rafhael-Augusto/inventory-management.git
```

### Entre na pasta

```bash
cd inventory-management
```

### Instale as dependências

```bash
npm install
```

## ⚙️ Configuração

Crie um arquivo .env:

```bash
BETTER_AUTH_SECRET="better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID="github-client-id"
GITHUB_CLIENT_SECRET="github-client-secret"

GOOGLE_CLIENT_ID="google-client-id"
GOOGLE_CLIENT_SECRET="google-client-secret"

DATABASE_URL="data-base-url"
```

## Depois rode:

```bash
npx prisma generate
npx prisma migrate dev
```

## 🚀 Rodando o projeto

```bash
npm run dev
```

## Abra:

```bash
http://localhost:3000
```

# Link pra vercel

```bash
https://inventory-management-gamma-one-18.vercel.app/
```
