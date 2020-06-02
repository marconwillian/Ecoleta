import express from 'express';

const app = express();

app.use(express.json());

/**
 * Rota: Endereço completo da requisição
 * Recurso: Qual entidade estamos acessando do sistema
 */

/**
 * ## Tipo de Requisição
 * 
 * GET: Buscar uma ou mais informações do back-end
 * POST: Criar uma nova informação no back-end
 * PUT: Atualizar uma informação existente no back-end
 * DELETE: Remover uma informação do back-end
 * 
 * ## Exemplo
 * 
 * POST: http://localhost:3333/users - Criar um usuário
 * GET: http://localhost:3333/users - Listar Usuários
 * GET: http://localhost:3333/users/5 - Busca dados do usuario com ID 5
 * 
 * 
 * ## Types Request Data
 * Request Parm: Parametros que vem no própria requisição e é obrigatório
 * Query Parm: Parametro opcional retornado na requisição que vem apos o '?' que são geralmetne opcionais para filtros, paginação entre outros
 * Rquest Body: Parametro para atualização/criação de informação
 */

const users = [
    'Marcon',
    'Murillo',
    'Valdir',
    'Teste'
];


app.get('/users', (req, res) => {
    let search = String(req.query.search);
    
    let filterUsers = search ? users.filter(user => user.includes(search)) : users;

    return res.status(200).json(filterUsers)
});

app.post('/users', (req, res) => {
    let data = req.body;

    let user = {
        name: data.name,
        email: data.email
    }

    return res.status(200).json(user)
});

app.get('/users/:_id', (req, res) => {
    let _id = Number(req.params._id);
    let user = users[_id];
    return res.status(200).json(user);
});



app.use((req, res) => {
    res.status(404).json({error: "Sorry can't find that!"})
})

const port = process.env.PORT || 3333;

app.listen(port)
console.log(`Start on port :${port}`)