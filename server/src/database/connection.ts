import knex from 'knex';
import knexConfig from '../config/knexfileConnection';
let config: Object = {};

config = knexConfig['production'];

const connection = knex(config);

export default connection;