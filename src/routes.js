import express from 'express';

const routes = express();

//Controller Imports
import userController from './controllers/userController';

//User Routes
routes.post('/signup', userController.postUser);


export default routes;