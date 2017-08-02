import express from 'express';

const routes = express();

//Controller Imports
import userController from './controllers/userController';
import beerController from './controllers/beerController';
import beerFridgeController from './controllers/beerFridgeController';

//User Routes
routes.post('/signup', userController.postUser);

//Beer Routes
routes.get('/beers/:name/:p', beerController.getBeers);
routes.get('/categories', beerController.getCategories);
routes.get('/categories/:categoryId', beerController.getSingleCategory);

//Beer Fridge Routes
routes.post('/beerFridge', beerFridgeController.createFridge);
routes.get('/beerFridge', beerFridgeController.getUserFridge);
routes.put('/beerFridge/update', beerFridgeController.updateFridge);


export default routes;