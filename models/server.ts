import dotenv from 'dotenv';

dotenv.config();

import express, {Application} from 'express';
import userRoutes from '../routes/User';
import loginRoutes from '../routes/Login';
import cryptoCurrencyesRoutes from '../routes/CryptoCurrencies';
import  cryptosUser from '../routes/CryptosUser';

import cors from 'cors';
import db from "../database/connection";
class Server {

    private app: Application;
    private readonly port: string;
    private apiPath = {
        users: '/api/users',
        login: '/api/login',
        cryptoCurrencyes: '/api/cryptoCurrencyes',
        cryptosUser: '/api/cryptosUser'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnect().then(r => console.log('Connection has been established successfully.'));
        this.middlewares();
        this.routes();
    }

    async dbConnect() {
        try {
            await db.authenticate();
        } catch (error: any) {
             Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPath.users, userRoutes);
        this.app.use(this.apiPath.login, loginRoutes );
        this.app.use(this.apiPath.cryptoCurrencyes, cryptoCurrencyesRoutes);
        this.app.use(this.apiPath.cryptosUser, cryptosUser);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }
}

export default Server;