import {Request, Response} from 'express';
import knex from './../database/connection';

class PointsController {
    async index(req: Request, res: Response){
        const {city, uf, items} = req.query;


        const pasedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

            const points = await knex('points')
                .join('pint_items', 'points.id', '=', 'pint_items.point_id')
                .whereIn('pint_items.item_id', pasedItems)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('points.*');

        return res.status(200).json(points);
    }

    async show(req: Request, res: Response){
        const { _id } = req.params;
        
        const point = await knex('points').where('id', _id).first();

        if(!point) {
            return res.status(400).json({message: 'Point not found.'})
        }

        const items = await knex('items')
            .join('pint_items', 'items.id', '=', 'pint_items.item_id')
            .where('pint_items.point_id', _id)
            .select('items.title');
        
        return res.status(200).json({point, items});
    }

    async create(req: Request, res: Response){
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

        const point = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
    
        await trx('pint_items').insert(pointItems);
    
        await trx.commit();

        return res.status(200).json({
            id:  point_id,
            ...point
        })
    }
}

export default PointsController;