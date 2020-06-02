import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    res.status(200).json({list: 'user'})
});

const port = process.env.PORT || 3333;

app.listen(port)