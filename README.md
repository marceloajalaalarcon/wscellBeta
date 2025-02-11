# WSCELL Beta

WSCELL Beta é uma aplicação de e-commerce desenvolvida para demonstrar integração avançada com a API do Stripe, utilizando as tecnologias Next.js, TailwindCSS e TypeScript. Neste projeto, o Stripe funciona como um dashboard onde os produtos são cadastrados e, automaticamente, exibidos no site. Além disso, o sistema conta com rotas integradas do Next.js para realizar requisições ao Stripe, processar checkouts e apresentar detalhes de cada produto.

---

## Visão Geral

- **Integração com Stripe:** Gerencie os produtos diretamente no Stripe, e as informações são carregadas dinamicamente no site.
- **Rotas do Next.js:** Utiliza a API integrada do Next.js para realizar a comunicação com o Stripe e processar operações como listagem de produtos, exibição de detalhes e checkout.
- **Design Responsivo:** Construído com TailwindCSS, garantindo uma interface moderna e adaptável a diversos dispositivos.
- **Desenvolvimento com TypeScript:** Código mais robusto e com tipagem estática, facilitando a manutenção e escalabilidade do projeto.

---

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/):** Framework React para aplicações full-stack.
- **[TailwindCSS](https://tailwindcss.com/):** Utilitário CSS para construção de interfaces modernas e responsivas.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática.
- **[Stripe API](https://stripe.com/):** Plataforma para gerenciamento de pagamentos e produtos.
- **Next API Routes:** Permite criar endpoints serverless integrados ao Next.js para comunicação com serviços externos, como o Stripe.

---

## Funcionalidades

- **Listagem Automática de Produtos:** Produtos cadastrados no Stripe são exibidos automaticamente no site.
- **Detalhes de Produtos:** Páginas individuais que exibem informações detalhadas de cada produto.
- **Processo de Checkout:** Integração com o Stripe para uma experiência de pagamento segura e eficiente.
- **Rotas Dinâmicas:** Uso das rotas do Next.js para criar uma navegação intuitiva e escalável.

---

## Screenshots

- **Página Inicial**
  ![Página Inicial](https://github.com/user-attachments/assets/587017b1-20b1-4624-acd4-c0cee1030560)

- **Detalhes do Produto**
  ![Detalhes do Produto](https://github.com/user-attachments/assets/0ce1df35-6ae6-4f1c-bda7-4280cea35fe2)

- **Processo de Checkout**
  ![Checkout](https://github.com/user-attachments/assets/e889dd72-fa8f-4159-9329-e1adaace0fbb)

---


## Contato

- **Marcelo A. alarcon**  
  [marcelo.alarcon@duckdev.com.br](mailto:marcelo.alarcon@duckdev.com.br)  
  [Perfil no GitHub](https://github.com/marceloajalaalarcon)


---

## Estrutura do Projeto

```plaintext
wscellBeta/
├──src/
    ├── components/      # Componentes React reutilizáveis
    ├── app/             # Páginas do Next.js e rotas de API
    └──  lib/             # Módulos Utilitários e Integrações
├── public/            # Arquivos públicos (imagens, etc.)
├── tsconfig.json      # Configurações do TypeScript
└── README.md          # Este arquivo
```

---

## Pré-Requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/marceloajalaalarcon/wscellBeta.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd wscellBeta
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

4. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env.local` na raiz do projeto e adicione suas chaves do Stripe:
   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

---

## Execução

Para iniciar o projeto em modo de desenvolvimento:
```bash
npm run dev
```
ou
```bash
yarn dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

---

WSCELL Beta foi desenvolvido com o intuito de demonstrar habilidades em integração de APIs, desenvolvimento full-stack com Next.js, design responsivo e processamento de pagamentos com Stripe. Este projeto é ideal para recrutadores que buscam um exemplo prático de soluções modernas e escaláveis em desenvolvimento web.

