import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    res.status(200).json({list: 'user'})
});

app.listen(3333)