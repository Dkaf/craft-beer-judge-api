import BreweryKey from '../../keys';
import unirest from 'unirest';

const beerController = {};

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