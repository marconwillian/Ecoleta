  ![Ecoleta][logo-image]

  ## Projeto desenvolvido na na primeira nwl da RocketSeat.
  ---
  [![License: MIT][license-image]][license-link] <!-- [![Node.js CI](https://github.com/marconwillian/Ecoleta_backend/workflows/Node.js%20CI/badge.svg)](https://github.com/marconwillian/Ecoleta_backend/actions?query=workflow%3A%22Node.js+CI%22) -->

  Esse projeto foi feito com a intensão de platicar meus conhecimentos na stack do JavaScript usando o superset **typescript**.
  Este projeto foi feito com 3 técnologias basicas, que forão divididas em repositórios diferente, são elas:
  - [**Node.js - backend (Este Respositório)**](#rocket-tecnologias)
  - [React.js - frondend / desktop][repo-frontend]
  - [React Native - mobile][repo-mobile]

  Abaixo vamos tudo sobre o nosso projeto para **backend**.

  ## :rocket: Tecnologias

  - Main Libs
    - [![express (latest)](https://img.shields.io/npm/v/express/latest?label=Express&style=flat-square)][npm-express] | Usado para configurar as rotas e fazer a aplicação ouvir uma porta especifica (port:3333).
    - [![celebrate (latest)](https://img.shields.io/npm/v/celebrate/latest?label=Celebrate&style=flat-square)][npm-celebrate] | Integração do Express com o Joi para validação de dados.
    - [![knex (latest)](https://img.shields.io/npm/v/knex/latest?label=knex.js&style=flat-square)][npm-knex] | Usado para itegrar a aplicação com o banco de dados, neste caso usado o Sqlite3
    - [![Sqlite3 (latest)](https://img.shields.io/npm/v/sqlite3/latest?label=Sqlite3&style=flat-square)][npm-sqlite] | Banco de dados rodando velo node.js
    - [![Cors (latest)](https://img.shields.io/npm/v/cors/latest?label=Cors&style=flat-square)][npm-cors] | Usado para proteger e altenticar a origem das requisições na api.

  - Test Libs
    - [![jest (latest)](https://img.shields.io/npm/v/jest/latest?label=Jest&style=flat-square)][npm-jest] | Usado para fazer os testes na aplicação.
    - [![supertest (latest)](https://img.shields.io/npm/v/supertest/latest?label=SuperTest&style=flat-square)][npm-supertest] | Usado para fazer tste atravez da rota inteira.
    - [![cross-env (latest)](https://img.shields.io/npm/v/cross-env/latest?label=Cross+Env&style=flat-square)][npm-cross-env] | Usado para definir process universais.

  - Dev Libs
    

  ## :minidisc: Descrição
  Ele foi publicado em: https://ecoleta-backend.herokuapp.com/
  
  ****
  Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE][license-link] para mais detalhes.


  <!-- Markdown link & img dfn's -->
  [logo-image]: https://i.imgur.com/ftyy51h.png
  [license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
  [license-link]: https://github.com/marconwillian/Ecoleta_backend/blob/master/LICENSE
  [repo-frontend]: https://github.com/marconwillian/Ecoleta_frontend
  [repo-mobile]: https://github.com/marconwillian/Ecoleta_mobile
  [npm-express]: https://www.npmjs.com/package/express
  [npm-celebrate]: https://www.npmjs.com/package/celebrate
  [npm-knex]: https://www.npmjs.com/package/knex
  [npm-sqlite]: https://www.npmjs.com/package/sqlite3
  [npm-cors]: https://www.npmjs.com/package/cors
  [npm-jest]: https://www.npmjs.com/package/jest
  [npm-supertest]: https://www.npmjs.com/package/supertest
  [npm-cross-env]: https://www.npmjs.com/package/cross-env