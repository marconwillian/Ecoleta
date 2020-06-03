import express from 'express';
import path from 'path';
import knex from './database/connection';

import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

// index, show, create, update, delete

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:_id', pointsController.show);
routes.post('/points', pointsController.create);




export default routes;