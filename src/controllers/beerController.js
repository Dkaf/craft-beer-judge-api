import unirest from 'unirest';
import db from './../models/index';
import dotenv from 'dotenv';
dotenv.config();


const beerController = {};
const BreweryKey = process.env.BREWDB_KEY;


//New Beer
beerController.addBeer = (req, res) => {
	const { beer, rating } = req.body;

	const newBeer = new db.Beer({
		name: beer.name,
		description: beer.description,
		abv: beer.abv,
		ibu: beer.ibu,
		label: beer.labels,
		style: beer.style,
		rating: rating,
		_owner: req.decoded.id
	});

	newBeer.save()
		.then((beer) => {
			db.User.findByIdAndUpdate(req.decoded.id)
				.then( (user) => {
					user.fridge.push(beer._id);
					res.status(200).json({
						success: true,
						data: {
							beer,
							username: user.username,
							fridge: user.fridge
						}
					});
				}).catch( (err) => {
					res.status(500).json({success: false, message: err});
				});
		})
		.catch((err) =>{
			res.status(500).json({
				data: err
			});
			throw err;
		});

};

//Remove Beer
beerController.removeBeer = (req, res) => {
	let { beerId } = req.body;

	db.Beer.findByIdAndRemove(beerId)
		.then((beer) => {			
			if(req.decoded.id != beer._owner) {
				res.status(403).json({
					success: false,
					message: 'You do not have the correct permissions for this'
				});
			} else {
				res.status(200).json({
					success: true,
					message: 'Successfully removed ' + beer
				});
			}
		}).catch((err) => {
			res.status(500).json({
				success: false,
				message: err
			});
		});
};

//Search for beers by name
beerController.getBeers = (req, res) => {
	const { name } = req.params;
	const brewUrl = 'http://api.brewerydb.com/v2/search?key=' + BreweryKey + '&q=' + name + '&type=beer';
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