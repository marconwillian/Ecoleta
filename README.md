  ![Ecoleta][logo-image]

  ## Projeto desenvolvido na NLW #01 da RocketSeat.
  ---
  [![License: MIT][license-image]][license-link] <!-- [![Node.js CI](https://github.com/marconwillian/Ecoleta_backend/workflows/Node.js%20CI/badge.svg)](https://github.com/marconwillian/Ecoleta_backend/actions?query=workflow%3A%22Node.js+CI%22) -->

  Esse projeto foi feito com a intensão de platicar meus conhecimentos na stack do JavaScript usando o superset **typescript**.
  Este projeto foi feito com 3 técnologias basicas, que forão divididas em repositórios diferente, são elas:
  - [Node.js - server][repo-backend]
  - [React.js - client][repo-frontend]
  - [React Native - mobile][repo-mobile]

  Abaixo vamos tudo sobre o nosso projeto para **backend**.

  ## :rocket: Tecnologias

  - Main Libs
    - [![express (latest)](https://img.shields.io/npm/v/express/latest?label=Express&style=flat-square)][npm-express] | Usado para configurar as rotas e fazer a aplicação ouvir uma porta especifica (port:3333).
    - [![knex (latest)](https://img.shields.io/npm/v/knex/latest?label=knex.js&style=flat-square)][npm-knex] | Usado para itegrar a aplicação com o banco de dados, neste caso usado o Sqlite3 no ambiente de desenvolvimento, e para testes e para produção será usado um postgres do heroku.
    - [![react (latest)](https://img.shields.io/npm/v/react/latest?label=React.js&style=flat-square)][npm-react] | React é uma biblioteca JavaScript declarativa, eficiente e flexível para o desenvolvimento de interfaces para usuários.

  ## :minidisc: Descrição
  O projeo em si é um sistema de coleta de lixos e descartaveis, unindo as empresas que fazem estas coletas com as pessoas que precisa descartar algo, sendo que a empresa vai usar a langing page para cadastrar seus pontos, e o usuário vai poder ver os pontos pelo app.

  - O backend: https://server.ecoleta.marconwillian.dev/
  - O frontend: https://ecoleta.marconwillian.dev/
  
  ****
  Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE][license-link] para mais detalhes.


  <!-- Markdown link & img dfn's -->
  [logo-image]: https://user-images.githubusercontent.com/34342635/83749237-c663d700-a639-11ea-9ac8-64b25f99efb1.png
  [license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
  [license-link]: https://github.com/marconwillian/Ecoleta_backend/blob/master/LICENSE
  [repo-backend]: /packages/server
  [repo-frontend]: /packages/client
  [repo-mobile]: /packages/mobile
  [npm-react]: https://www.npmjs.com/package/react
  [npm-express]: https://www.npmjs.com/package/express
  [npm-knex]: https://www.npmjs.com/package/knex