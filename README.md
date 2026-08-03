# Task Manager — Frontend

Interface web para gerenciamento de tarefas, consumindo a [Task Manager API](https://github.com/ssergionp/task-manager-api). Projeto de portfólio construído para praticar React, autenticação JWT com renovação automática, e integração completa entre frontend e backend em produção.

🔗 **Aplicação em produção:** https://task-manager-frontend-swart.vercel.app
🔗 **Repositório do backend:** https://github.com/ssergionp/task-manager-api

> Leia em: [Português](README.md) | [English](README.en.md)

## Funcionalidades

- Login com usuário e senha (autenticação JWT)
- Persistência de sessão (login mantido ao recarregar a página)
- Rotas protegidas — usuário não autenticado é redirecionado para `/login`
- Renovação automática de token via interceptor do Axios: se uma requisição falha com 401, o token é renovado automaticamente e a requisição original é repetida, sem o usuário perceber
- Listagem paginada de tarefas, com isolamento de dados por usuário
- CRUD completo de tarefas (criar, editar, deletar) direto pela interface
- Badges coloridas indicando o status da tarefa (A Fazer, Em Andamento, Concluída)

## Stack

- **[React](https://react.dev/)** com **[Vite](https://vite.dev/)** como build tool
- **[React Router](https://reactrouter.com/)** para roteamento e rotas protegidas
- **[Axios](https://axios-http.com/)** para requisições HTTP, com interceptors customizados
- **[Tailwind CSS v4](https://tailwindcss.com/)** para estilização (setup moderno via `@tailwindcss/vite`, sem arquivo de configuração)
- **Context API** do React para gerenciamento de estado de autenticação

## Rodando localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- O [backend](https://github.com/ssergionp/task-manager-api) rodando localmente (veja o README daquele repositório) — ou apontando para a instância em produção, se preferir

### Passo a passo

1. Clone o repositório:
```bash
   git clone https://github.com/ssergionp/task-manager-frontend.git
   cd task-manager-frontend
```

2. Instale as dependências:
```bash
   npm install
```

3. Crie um arquivo `.env.local` na raiz do projeto (esse arquivo não é versionado, cada ambiente tem o seu):

VITE_API_URL=http://localhost:8080

Troque pela URL da instância do backend que você quer usar (local ou produção).

4. Rode o servidor de desenvolvimento:
```bash
   npm run dev
```

5. Acesse `http://localhost:5173` (ou a porta indicada no terminal).

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_URL` | URL base da API do backend | `http://localhost:8080` (local) ou `https://task-manager-api-vcu3.onrender.com` (produção) |

> **Por que o prefixo `VITE_`?** O Vite só expõe para o código do navegador variáveis de ambiente cujo nome começa com `VITE_` — isso evita expor acidentalmente segredos de build no bundle final.

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera a build de produção na pasta `dist/` |
| `npm run preview` | Serve localmente a build de produção, para testes finais |
| `npm run lint` | Roda o ESLint sobre o projeto |

## Deploy

A aplicação está publicada na [Vercel](https://vercel.com), com deploy automático a cada push na branch `main`. A variável de ambiente `VITE_API_URL` é configurada diretamente no painel do projeto na Vercel, apontando para a instância de produção do backend no [Render](https://render.com).

> **Nota:** o backend está hospedado no plano gratuito do Render, que "dorme" após 15 minutos de inatividade. A primeira requisição após esse período pode levar de 30 a 50 segundos para responder, enquanto o serviço reinicia.

## Autor

Sérgio do Nascimento Pereira
