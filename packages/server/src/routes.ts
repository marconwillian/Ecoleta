import express from 'express';

const routes = express.Router();

routes.get('/users/:_id', (req, res) => {
    return res.status(200).json({});
});

export default routes;