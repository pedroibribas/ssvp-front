# Lista de Doação da SSVP

Acesse em: [Link](https://doarssvp.vercel.app)

Página da web destinada à apresentação de lista com produtos que os benfeitores da Sociedade São Vicente de Paulo podem visualizar e escolher para doar.

<br/>

## Informações

- Status: Online
- Hospedagem: Vercel
- Linguagem: TypeScript/JavaScript
- Framework: React.js
- Criado por [Pedro Ribas](https://github.com/pedroibribas)
- Licensa MIT

<br/>

## Funcionalidades

- O usuário autenticado pode criar, editar e gerenciar listas de doações, cujos links são compartilháveis para terceiros.
- Terceiros podem visualizar e escolher itens da lista acessada.

<br/>

## Rodando o projeto

```bash
# Clone o repositório
$ git clone https://github.com/pedroibribas/ssvp-donation-list-client.git
# ou com SSH
$ git clone git@github.com:pedroibribas/ssvp-donation-list-client.git

# Acesse a pasta do projeto
$ cd ssvp-donation-list-client

# Instale todas as dependências
npm install
# ou
yarn install

# Configure as variáveis de ambiente[*]

# Rode o servidor de desenvolvimento
npm run start
# ou
yarn start

# O projeto será inicializado em <http://localhost:3000>
```

[*] Variáveis de ambiente no arquivo raiz `.env.local`:

```bash
# API
REACT_APP_APP_URL=#URL da api de dados

# Local
REACT_APP_LOCAL_URL=#URL do servidor rodando localmente
REACT_APP_ENV="development" #[**]

#[**] Quando "development", a url para obter os dados será a do servidor local.
```
