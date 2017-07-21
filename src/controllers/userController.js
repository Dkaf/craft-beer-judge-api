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


};

export default userController;