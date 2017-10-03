import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import routes from './routes';
import config from 'config';
import dotenv from 'dotenv';
dotenv.config();

let DBHost = config.get('DBHost');

mongoose.connect(DBHost, {
	useMongoClient: true
}).then(console.log("Connected to mongodb..."));
let db = mongoose.connection;
db.on('error', console.error.bind('connection error'));

const app = express();

//Middleware
app.use(bodyParser.json());
app.set('secret', process.env.SECRET_KEY);

app.use('/api', routes);

export default app;