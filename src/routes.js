import express from 'express';

const routes = express();

//Controller Imports
import userController from './controllers/userController';
import beerController from './controllers/beerController';
import authController from './controllers/authController';

//User Routes
routes.post('/signup', userController.postUser);
routes.post('/login', userController.login);
routes.get('/getuser/:userSearch', userController.getUser);
routes.put('/user/addbeer/:userId', authController.verifyToken, userController.addBeer);
routes.delete('/deleteuser/:userRemoved', authController.verifyToken, userController.deleteUser);

//Beer Routes
routes.post('/beer/addbeer', authController.verifyToken, beerController.addBeer);
routes.get('/beers/:name/:p', beerController.getBeers);
routes.get('/categories', beerController.getCategories);
routes.get('/categories/:categoryId', beerController.getSingleCategory);

//Beer Fridge Routes
// routes.post('/beerfridge', beerFridgeController.createFridge);
// routes.get('/beerfridge/:user', beerFridgeController.getUserFridge);
// routes.put('/beerfridge/update', beerFridgeController.updateFridge);


export default routes;