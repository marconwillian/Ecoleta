import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';
import Sentry from './config/sentry';


const app = express();

app.use(cors());
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

 routes(app);

app.use(errors());
app.use((request, response) => {

    const transaction = Sentry.startTransaction(
        {
            op: "not_find",
            name: "Route not found",
            data: {
                path: request.path
            },
        }
    );

    try {
        return response.status(404).json({error: "Sorry can't find that!"})
    } catch (error) {
        Sentry.captureException(error);
        return response.status(400).json({error: true, message: error});
    } finally {
        transaction.finish();
    }
})

const port = 3000;

app.listen(port)
console.log(`Start on port :${port}`)