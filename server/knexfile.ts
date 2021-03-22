require('ts-node/register');

import 'dotenv/config';
import config from './src/config/knexConfig';;


module.exports= config["development"];