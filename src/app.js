import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

mongoose.connect('mongodb://localhost:27017/craft_beer_judge', () => {
	console.log('connected to mongodb...');
});

const app = express();

//Middleware
app.use(bodyParser.json());

app.use('/api', routes);

export default app;