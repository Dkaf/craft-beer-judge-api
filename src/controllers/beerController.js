import unirest from 'unirest';
import db from './../models/index';

const beerController = {};
const BreweryKey = process.env.BREWDB_KEY;


//New Beer
beerController.addBeer = (req, res) => {
	const { owner, beer, rating } = req.body;

	const newBeer = new db.Beer({
		name: beer.name,
		description: beer.description,
		abv: beer.abv,
		ibu: beer.ibu,
		label: beer.labels,
		style: beer.style,
		rating: rating,
		owner: owner
	});

	newBeer.save()
		.then((data) =>{
			res.status(200).json({
				success: true,
				data: data
			});
		})
		.catch((err) =>{
			res.status(500).json({
				data: err
			});
		});


};


//Search for beers by name
beerController.getBeers = (req, res) => {
	const { name, page } = req.params;
	const brewUrl = 'http://api.brewerydb.com/v2/beers/?key=' + BreweryKey + '&name=' + name + '&p=' + page;
	unirest.get(brewUrl)
		.end((data) => {
			res.status(200).json({
				success: true,
				data: data.body.data
			});
		});
};

//Find categories
beerController.getCategories = (req, res) => {
	const categoryUrl = 'http://api.brewerydb.com/v2/categories/?key=' + BreweryKey;
	unirest.get(categoryUrl)
		.end((data) => {
			res.status(200).json({
				success: true,
				data: data.body.data
			});
		});
};

//Find single category
beerController.getSingleCategory = (req, res) => {
	const { categoryId } = req.params;
	const categoryUrl = 'http://api.brewerydb.com/v2/category/'+ categoryId + '/?key=' + BreweryKey;
	unirest.get(categoryUrl)
		.end((data) => {
			res.status(200).json({
				success: true,
				data: data.body.data
			});
		});
};


export default beerController;