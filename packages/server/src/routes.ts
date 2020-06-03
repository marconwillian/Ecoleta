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

routes.post('/points', async (req, res) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = req.body;

    const trx = await knex.transaction();
    
    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });
    const point_id = insertedIds[0];
    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id
        }
    })

    await trx('pint_items').insert(pointItems);

    return res.status(200).json({sucess: true})

});




export default routes;