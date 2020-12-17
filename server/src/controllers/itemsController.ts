import {Request, Response} from 'express';
import knex from './../database/connection';

class ItemsController {
    async index(req: Request, res: Response){
        const items = await knex('items').select('*');
        const host = req.headers.host;

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                imageUrl: `https://${host}/uploads/${item.image}`
            }
        })

        return res.status(200).json(serializedItems);
    }
};

export default ItemsController;