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

userController.getUser = (req, res) => {
	const { username } = req.body;

	db.User.find({username: username})
		.then((user) => {
			res.status(200).json({
				success: true,
				data: user
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

export default userController;