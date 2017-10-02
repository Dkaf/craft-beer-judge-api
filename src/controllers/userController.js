import db from './../models/index';
const userController = {};

// Create new user /signup route
userController.postUser = (req, res) => {
	const { username, password } = req.body;

	const user = new db.User({
		username,
		password
	});

	user.save()
		.then((newUser) => {
			res.status(200).json({
				success: true,
				data: newUser
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err
			});
		});
};

//Find User
userController.getUser = (req, res) => {
	const { userSearch } = req.params;

	db.User.find({username: userSearch })
		.populate('fridge')				
		.then((user) => {
			res.status(200).json({
				success: true,
				data: {id: user[0]._id, username: user[0].username, fridge: user[0].fridge}
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err
			});
		});

};


//Login
userController.getLogin = (req, res) => {
	res.status(200).json({success: true});
};

//Add Beer to User
userController.addBeer = (req, res) => {
	const { user, beers } = req.params;
	db.User.findOneAndUpdate({username: user},{fridge: beers}, {new: true}, (err, updatedUser) => {
		if(err) {
			return res.status(500).json({data: err});
		}
		db.User.populate(updatedUser, {path: 'fridge', model: 'Beer'}, (err, user) => {
			return res.status(200).json({success: true, data: user});
		});
	});
};

//Delete User
userController.deleteUser = (req, res) => {
	const { userRemoved } = req.params;
	db.User.remove({username: userRemoved}, (err, result) => {
		res.status(200).json({
			success: true,
			data: result
		});
	});
};

export default userController;