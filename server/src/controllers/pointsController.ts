import {Request, Response} from 'express';
import knex from './../database/connection';
import Sentry from '../config/sentry';

interface RequestUpload extends Request {
    file: Express.MulterS3.File
}


class PointsController {
    async index(request: Request, response: Response){
        const transaction = Sentry.startTransaction({
            op: "point_index",
            name: "List points and yours images with filters.",
        });

        const {city, uf, items} = request.query;
        const bucketEndPoint = process.env.BUCKET_ENDPOINT;

        try {
            const pasedItems = String(items || '')
                .split(',')
                .map(item => Number(item.trim()));
            
    
            const points = await knex('points')
                .join('point_items', 'points.id', '=', 'point_items.point_id')
                .whereIn('point_items.item_id', pasedItems)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('points.*');
    
    
            const serializedPoints = points.map(point => {
                return {
                    ...point,
                    imageUrl: `${bucketEndPoint}/${point.image}`
                }
            })
    
            return response.status(200).json(serializedPoints);

        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});            
        } finally {
            transaction.finish();
        }
    }

    async show(request: Request, response: Response){
        const transaction = Sentry.startTransaction({
            op: "point_show",
            name: "Show point and your image"
        });

        const { _id } = request.params;
        const bucketEndPoint = process.env.BUCKET_ENDPOINT;

        try {
            const point = await knex('points').where('id', _id).first();

            if(!point) {
                return response.status(400).json({message: 'Point not found.'})
            }

            const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', _id)
                .select('items.title');


                const serializedPoint = {
                    ...point,
                    imageUrl: `${bucketEndPoint}/${point.image}`
                }

            
            return response.status(200).json({point: serializedPoint, items});
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});            
        } finally {
            transaction.finish();
        }
    }

    async create(request: RequestUpload | Request, response: Response){
        const transaction = Sentry.startTransaction({
            op: "point_create",
            name: "Create a new point.",
        });
        
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        try {
            const trx = await knex.transaction();

            const fileUploaded = request.file as Express.MulterS3.File;

            const point = {
                image: fileUploaded.key,
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

            const pointItems = items
                .split(',')
                .map((item: string) => Number(item.trim()))
                .map((item_id: number) => {
                return {
                    item_id,
                    point_id
                }
            })
        
            await trx('point_items').insert(pointItems);
        
            await trx.commit();

            return response.status(200).json({
                id:  point_id,
                ...point
            })
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});            
        } finally {
            transaction.finish();
        }
    }

    async states(request: Request, response: Response){
        const transaction = Sentry.startTransaction({
            op: "point_states",
            name: "List states actives.",
        });

        try {
            const ufs = await knex('points').column('uf').groupBy('uf');
            return response.status(200).json(ufs);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});            
        } finally {
            transaction.finish();
        }
    }

    async cities(request: Request, response: Response){
        const transaction = Sentry.startTransaction({
            op: "point_cities",
            name: "List cities actives.",
        });

        const { _uf } = request.params;
        try {
            const cities = await knex('points').column({name: 'city'}).where('uf', _uf).groupBy('city');
            return response.status(200).json({uf: _uf, cities});
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});            
        } finally {
            transaction.finish();
        }
    }
}

export default PointsController;