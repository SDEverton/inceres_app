## Sobre

O defafio consiste em criar um front-end que consuma uma API para fazer anotações de texto, áudio e photo.

A aplicação foi desenvolvida usando TypeScript, NextJS e para fazer a requisição foi utilizado o axios.

Como a Aplicação foi construída usando NextJS é possível fazer o deploy na Vercel desde que o back-end esteja no ar.

## Iniciando

Primeiro devemos instalar as dependências e adicionar as variáveis de ambiente:

Arquivo: next.config.js
```
module.exports = {
  env: {
    baseURL: 'HOST',
  },
}
```

```bash
npm install
#or
yarn

npm run dev
# or
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o resultado.



