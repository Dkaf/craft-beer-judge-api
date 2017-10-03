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
	const { userId } = req.params;
	const { beers } = req.body;
	db.User.findOneAndUpdate({_id: userId}, {fridge: beers}, {new: true})
		.populate('fridge')
		.exec((err, user) => {
			if(err) {
				return res.status(500).json({success: false, data: err});				
			}
			return res.status(200).json({success: true, data: user});			
		});
};

//Delete User
userController.deleteUser = (req, res) => {
	const { userRemoved } = req.params;
	db.User.remove({username: userRemoved})
		.then((user) => {
			res.status(200).json({
				success: true,
				data: user
			});
		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				data: err
			});
		});

};

export default userController;