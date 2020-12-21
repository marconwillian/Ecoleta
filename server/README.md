  ![Ecoleta][logo-image]

  ## Projeto desenvolvido na NLW #01 da RocketSeat.
  ---
  [![License: MIT][license-image]][license-link]<br>
  ![Deploy Develop - Test, Build & Redeploy](https://github.com/marconwillian/Ecoleta/workflows/Deploy%20Develop%20-%20Test,%20Build%20&%20Redeploy/badge.svg?branch=develop)<br>
  ![Deploy - Test, Build & Redeploy](https://github.com/marconwillian/Ecoleta/workflows/Deploy%20-%20Test,%20Build%20&%20Redeploy/badge.svg?branch=main)

  Esse projeto foi feito com a intensão de platicar meus conhecimentos na stack do JavaScript usando o superset **typescript**.
  Este projeto foi feito com 3 técnologias basicas, que forão divididas em repositórios diferente, são elas:
  - [**Node.js - backend (Este Respositório)**](#rocket-tecnologias)
  - [React.js - frondend / desktop][repo-frontend]
  - [React Native - mobile][repo-mobile]

  Abaixo vamos tudo sobre o nosso projeto para **backend**.

  ## :rocket: Tecnologias

  - Main Libs
    - [![express (latest)](https://img.shields.io/npm/v/express/latest?label=Express&style=flat-square)][npm-express] | Usado para configurar as rotas e fazer a aplicação ouvir uma porta especifica (port:3333).
    - [![knex (latest)](https://img.shields.io/npm/v/knex/latest?label=knex.js&style=flat-square)][npm-knex] | Usado para itegrar a aplicação com o banco de dados, neste caso usado o Sqlite3
    - [![Sqlite3 (latest)](https://img.shields.io/npm/v/sqlite3/latest?label=Sqlite3&style=flat-square)][npm-sqlite] | Banco de dados rodando velo node.js
    - [![Cors (latest)](https://img.shields.io/npm/v/cors/latest?label=Cors&style=flat-square)][npm-cors] | Usado para proteger e altenticar a origem das requisições na api.

  - Dev Libs
    - [![Typescript (latest)](https://img.shields.io/npm/v/typescript/latest?label=Typescript&style=flat-square)][npm-typescript] | Usado para proteger e altenticar a origem das requisições na api.
    - [![cross-env (latest)](https://img.shields.io/npm/v/cross-env/latest?label=Cross+Env&style=flat-square)][npm-cross-env] | Usado para definir process.env universais.
    - [![ts-node (latest)](https://img.shields.io/npm/v/ts-node/latest?label=ts+Node&style=flat-square)][npm-ts-node] | Usado para execultar os arquivos .ts sem precisar dar um bulding.
    

  ## :minidisc: Descrição
  Ele foi publicado em como produção: https://server-ecoleta.marconwillian.dev/.<br>
  Sua versão em develop é publicado em outra porta: https://server-ecoleta.marconwillian.dev:8080/

  ****
  Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE][license-link] para mais detalhes.


  <!-- Markdown link & img dfn's -->
  [logo-image]: /assets/green.png
  [license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
  [license-link]: https://github.com/marconwillian/Ecoleta_backend/blob/master/LICENSE
  [repo-backend]: /packages/server
  [repo-frontend]: /packages/client
  [repo-mobile]: /packages/mobile
  [npm-express]: https://www.npmjs.com/package/express
  [npm-typescript]: https://www.npmjs.com/package/celebrate
  [npm-knex]: https://www.npmjs.com/package/knex
  [npm-sqlite]: https://www.npmjs.com/package/sqlite3
  [npm-cors]: https://www.npmjs.com/package/cors
  [npm-cross-env]: https://www.npmjs.com/package/cross-env
  [npm-ts-node]: https://www.npmjs.com/package/ts-node