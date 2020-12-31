import {Request, Response} from 'express';
import knex from './../database/connection';
import Sentry from '../config/sentry';

class ItemsController {
    async index(request: Request, response: Response){
        const host = process.env.HOST;

        const transaction = Sentry.startTransaction({
          op: "item_index",
          name: "List itens and yours images",
        });

        try {
            const items = await knex('items').select('*');
    
            const serializedItems = items.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    imageUrl: `${host}/uploads/${item.image}`
                }
            })
    
            return response.status(200).json(serializedItems);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    }
};

export default ItemsController;