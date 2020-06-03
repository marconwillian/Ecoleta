import express from 'express';
import path from 'path';
import knex from './database/connection';

const routes = express.Router();

routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

routes.get('/items', async (req, res) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            imageUrl: `https://ecoleta-backend.herokuapp.com/uploads/${item.image}`
        }
    })

    return res.status(200).json(serializedItems);
});




export default routes;