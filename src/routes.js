import express from 'express';

const routes = express();

//Controller Imports


routes.get('/', (req, res) => {
	res.json({
		message: 'routes are working'
	});
});

export default routes;