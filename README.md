# 🚀 Dev Link

O **Dev Link** é uma aplicação estilo Linktree desenvolvida com React, que permite aos usuários cadastrarem e compartilharem seus links e redes sociais favoritas em uma página personalizada.

## 🧩 Funcionalidades

- Página **Home** pública com os links do usuário.
- Sistema de **Login** com redirecionamento automático para usuários não autenticados.
- Área **Admin** onde usuários autenticados podem:
  - Cadastrar, editar e excluir **links personalizados**.
  - Cadastrar suas **redes sociais favoritas**.
- Uso de **rotas dinâmicas** com React Router DOM.
- Interface moderna e responsiva com **Tailwind CSS**.
- **Autenticação e banco de dados** com Firebase.

## 🛠️ Tecnologias Utilizadas

- **React** — Biblioteca principal da aplicação.
- **React Router DOM** — Para gerenciamento de rotas e redirecionamento.
- **Tailwind CSS** — Para estilização rápida e responsiva.
- **Firebase** — Autenticação de usuários e armazenamento de dados.

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/dev-link.git
cd dev-link
npm install
```

Crie um arquivo `.env` com suas credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Inicie o projeto:

```bash
npm run dev
```

## 🚧 Em Desenvolvimento

Funcionalidades futuras planejadas:

- Página pública com personalização de tema.
- Compartilhamento fácil do link da página do usuário.
- Análise de cliques nos links.

🔗 Acesse o Projeto

https://dev-link-one-lemon.vercel.app/
