import db from './../models/index';
import app from '../app';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
const userController = {};

// Create new user /signup route
userController.postUser = (req, res) => {
	const { username, password } = req.body;

	const hash =  bcrypt.hashSync(password);

	const user = new db.User({
		username,
		password: hash
	});

	user.save()
		.then((newUser) => {
			let payload = {
				username: user.username,
				id: user._id
			};
			let token = jwt.sign(payload, app.get('secret'), {expiresIn: '30m'});
			res.status(200).json({
				success: true,
				data: newUser.username,
				token: token
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
userController.login = (req, res) => {
	const { name, password } = req.body;
	db.User.findOne({'username': name})
		.then((user) => {
			if(!user) {
				res.status(500).json({success: false, message:'User not found'});
			} else if(user) {
				if(!bcrypt.compareSync(password, user.password)) {									
					res.status(500).json({success: false, message:'Login failed. Incorrect password'});
				} else if(bcrypt.compareSync(password, user.password)) {
					const payload = {
						username: user.username,
						id: user._id
					};

					let token = jwt.sign(payload, app.get('secret'), {
						expiresIn: '24h'
					});

					res.status(200).json({success: true, token: token});
					
				}
			}
		}).catch((err) => {
			throw err;
		});
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
			} else if(user.username != req.decoded.username) {
				return res.status(403).json({success: false, message:'Incorrect permissions'});
			}
			return res.status(200).json({success: true, data: user});			
		});
};





//Delete User
userController.deleteUser = (req, res) => {
	const { userRemoved } = req.params;
	if(userRemoved != req.decoded.username) {
		return res.status(403).json({success: false, message:'Incorrect permissions'});
	} else {
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
	}
};

export default userController;