## Sobre

O defafio consiste em criar um front-end que consuma uma API com 5 mil localizações e disponibilize isso no mapa
na forma de MarkerClusterer, sendo assim gerando macro regiões onde se concentra uma determinada quantidade de localizações.

A aplicação foi desenvolvida usando o Google Maps, TypeScript, NextJS e para fazer a requisição foi utilizado o axios.

## Iniciando

Primeiro devemos instalar as dependências e adicionar as variáveis de ambiente:

Arquivo: next.config.js
```
module.exports = {
  env: {
    mapsKey: 'API_KEY_MAPS',
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

ou

https://desafiocontele.vercel.app/


