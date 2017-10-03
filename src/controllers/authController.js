import app from '../app';
import jwt from 'jsonwebtoken';


const authController = {};



authController.verifyToken = (req, res, next) => {
	let token = req.body.token || req.query.token || req.headers['x-access-token'];
    
	if(token) {
		jwt.verify(token, app.get('secret'), (err, decoded) => {
			if(err) {
				res.json({success: false, message: 'Failed to verify token'});
				throw err;
			} else if(!decoded.id || !decoded.username) {
				return res.json({success: false, message: 'No Payload in token'});
			}
			else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(403).json({success: false, message: 'no token provided'});
	}
};

export default authController;

