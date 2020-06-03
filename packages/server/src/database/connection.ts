import knex from 'knex';
import knexConfig from '../../knexfileConnection';
let config: Object = {};

switch (process.env.TYPERUN) {
    case 'dev':
        console.log("dev");
        config = knexConfig.development;
        break;
    case 'test':
        console.log("test");
        config = knexConfig.test;
        break;
    default:
        console.log("pro");
        config = knexConfig.production;
        break;
}

const connection = knex(config);

export default connection;