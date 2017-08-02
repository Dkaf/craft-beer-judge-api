import db from './../models/index';

const beerFridgeController = {};


//Create Fridge
beerFridgeController.createFridge = (req, res) => {
	const { owner } = req.body;

	const fridge = new db.BeerFridge({
		owner
	});

	fridge.save()
		.then((newFridge) => {
			res.status(200).json({
				success: true,
				data: newFridge
			});
		})
		.catch((err) => {
			res.status(500).json({
				data: err
			});
		});
};



//Get User's Fridge
beerFridgeController.getUserFridge = (req, res) => {
	const { user } = req.params;
	db.BeerFridge.find({owner: user})
		.populate('beers')
		.exec( (err, fridge) => {
			if(err){
				return res.status(500).json({
					message: err
				});
			}
			return res.status(200).json({
				success: true,
				data: fridge
			});
		});
};

//Add Beers to Fridge
beerFridgeController.updateFridge = (req, res) => {
	const { user, beers } = req.body;
	db.BeerFridge.findOneAndUpdate({user: user}, {beers: beers},{new: true}, (err, fridge) => {
		if(err) {
			return res.status(500).json({
				message: err
			});
		}
		db.Beer.populate(fridge, {path:'beers', model:'Beer'}, (err, fridge) => {
			return res.status(200).json({
				success: true,
				data: fridge
			});
		});
	});
};

export default beerFridgeController;