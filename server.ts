import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import Server from './src/index';
import Database from './src/db/index';
import Routes from './src/routes';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
import passport from 'passport';
import './src/strategies/oauth-strategy';



const db = new Database();
const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8')) as any;


app.use(
  cors({
    origin: ['http://localhost:8080', 'https://editor.swagger.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

new Routes(app);

//Phải đặt server ở dưới cùng thay vì trên cùng để nó config được middleware
//Nếu đặt ở trên Routes được load trong Server => lúc này các middleware session, passport của bạn vẫn chưa được cấu hình khi các routes đã được đăng ký.
const server: Server = new Server(app);

app
  .listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: address already in use');
    } else {
      console.log(err);
    }
  });