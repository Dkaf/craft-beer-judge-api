/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(11);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = __webpack_require__(12);

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = __webpack_require__(13);

var _routes2 = _interopRequireDefault(_routes);

var _config = __webpack_require__(20);

var _config2 = _interopRequireDefault(_config);

var _dotenv = __webpack_require__(7);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var DBHost = _config2.default.get('DBHost');

_mongoose2.default.connect(DBHost, {
	useMongoClient: true
}).then(console.log("Connected to mongodb..."));
var db = _mongoose2.default.connection;
db.on('error', console.error.bind('connection error'));

var app = (0, _express2.default)();

//Middleware
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.set('secret', process.env.SECRET_KEY);

app.use('/api', _routes2.default);

exports.default = app;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var beerSchema = new Schema({
	name: String,
	description: String,
	abv: String,
	ibu: String,
	label: Object,
	style: {
		category: Object,
		name: String,
		description: String
	},
	rating: Number,
	_owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Beer = _mongoose2.default.model('Beer', beerSchema);

exports.default = Beer;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _User = __webpack_require__(5);

var _User2 = _interopRequireDefault(_User);

var _BeerFridge = __webpack_require__(15);

var _BeerFridge2 = _interopRequireDefault(_BeerFridge);

var _Beer = __webpack_require__(2);

var _Beer2 = _interopRequireDefault(_Beer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	User: _User2.default,
	BeerFridge: _BeerFridge2.default,
	Beer: _Beer2.default
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Beer = __webpack_require__(2);

var _Beer2 = _interopRequireDefault(_Beer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


_mongoose2.default.Promise = global.Promise;

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: [4, 'Username must be at least 4 characters']
	},
	password: {
		type: String,
		required: true,
		minlength: [8, 'Password must be at least 8 characters']
	},
	fridge: [{ type: Schema.Types.ObjectId, ref: 'Beer' }]
});

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(10);


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen(process.env.PORT || 8080, function () {
	console.log('server is working!');
});

exports.default = _app2.default;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _userController = __webpack_require__(14);

var _userController2 = _interopRequireDefault(_userController);

var _beerController = __webpack_require__(17);

var _beerController2 = _interopRequireDefault(_beerController);

var _authController = __webpack_require__(19);

var _authController2 = _interopRequireDefault(_authController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();

//Controller Imports


//User Routes
routes.post('/signup', _userController2.default.postUser);
routes.post('/login', _userController2.default.login);
routes.get('/getuser/', _authController2.default.verifyToken, _userController2.default.getUser);
routes.put('/user/addbeer/', _authController2.default.verifyToken, _userController2.default.addBeer);
routes.delete('/deleteuser/:userRemoved', _authController2.default.verifyToken, _userController2.default.deleteUser);

//Beer Routes
routes.post('/beer/addbeer', _authController2.default.verifyToken, _beerController2.default.addBeer);
routes.delete('/beer', _authController2.default.verifyToken, _beerController2.default.removeBeer);
routes.get('/beers/:name', _beerController2.default.getBeers);
routes.get('/categories', _beerController2.default.getCategories);
routes.get('/categories/:categoryId', _beerController2.default.getSingleCategory);

//Beer Fridge Routes
// routes.post('/beerfridge', beerFridgeController.createFridge);
// routes.get('/beerfridge/:user', beerFridgeController.getUserFridge);
// routes.put('/beerfridge/update', beerFridgeController.updateFridge);


exports.default = routes;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

var _jsonwebtoken = __webpack_require__(6);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptNodejs = __webpack_require__(16);

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = {};

// Create new user /signup route
userController.postUser = function (req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    password = _req$body.password;


	_index2.default.User.findOne({ 'username': username }, function (user) {
		if (user) {
			return res.status(500).json({
				success: false,
				message: 'User already exists'
			});
		}
	});

	if (!username) {
		return res.status(400).json({
			success: false,
			message: 'Missing username in body'
		});
	} else if (!password) {
		return res.status(400).json({
			success: false,
			message: 'Missing password in body'
		});
	} else {
		var hash = _bcryptNodejs2.default.hashSync(password);

		var user = new _index2.default.User({
			username: username,
			password: hash
		});

		user.save().then(function (newUser) {
			var payload = {
				username: user.username,
				id: user._id
			};
			var token = _jsonwebtoken2.default.sign(payload, _app2.default.get('secret'), { expiresIn: '30m' });
			res.status(201).json({
				success: true,
				data: newUser.username,
				token: token
			});
		}).catch(function (err) {
			res.status(500).json({
				message: err
			});
		});
	}
};

//Find User
userController.getUser = function (req, res) {
	_index2.default.User.findById(req.decoded.id).populate('fridge').then(function (user) {
		res.status(200).json({
			success: true,
			data: { id: user._id, username: user.username, fridge: user.fridge }
		});
	}).catch(function (err) {
		res.status(500).json({
			message: err
		});
		throw err;
	});
};

//Login
userController.login = function (req, res) {
	var _req$body2 = req.body,
	    username = _req$body2.username,
	    password = _req$body2.password;

	_index2.default.User.findOne({ 'username': username }).then(function (user) {
		if (!user) {
			res.status(500).json({ success: false, message: 'User not found' });
		} else if (user) {
			if (!_bcryptNodejs2.default.compareSync(password, user.password)) {
				res.status(500).json({ success: false, message: 'Login failed. Incorrect password' });
			} else if (_bcryptNodejs2.default.compareSync(password, user.password)) {
				var payload = {
					iss: 'https://shielded-brook-50392.herokuapp.com/',
					username: user.username,
					id: user._id
				};

				var token = _jsonwebtoken2.default.sign(payload, _app2.default.get('secret'), {
					expiresIn: '1h'
				});

				res.status(200).json({ success: true, token: token });
			}
		}
	}).catch(function (err) {
		throw err;
	});
};

//Add Beer to User
userController.addBeer = function (req, res) {
	var beers = req.body.beers;


	_index2.default.User.findOneAndUpdate({ _id: req.decoded.id }, { fridge: beers }, { new: true }).populate('fridge').exec(function (err, user) {
		if (err) {
			return res.status(500).json({ success: false, data: err });
		} else if (user.username != req.decoded.username) {
			return res.status(403).json({ success: false, message: 'Incorrect permissions' });
		}
		return res.status(200).json({ success: true, data: user.fridge });
	});
};

//Delete User
userController.deleteUser = function (req, res) {
	var userRemoved = req.params.userRemoved;

	if (userRemoved != req.decoded.username) {
		return res.status(403).json({ success: false, message: 'Incorrect permissions' });
	} else {
		_index2.default.User.remove({ username: userRemoved }).then(function (user) {
			res.status(200).json({
				success: true,
				data: user
			});
		}).catch(function (err) {
			res.status(500).json({
				success: false,
				data: err
			});
		});
	}
};

exports.default = userController;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Beer = __webpack_require__(2);

var _Beer2 = _interopRequireDefault(_Beer);

var _User = __webpack_require__(5);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var beerFridgeSchema = new Schema({
	beers: [{
		type: Schema.Types.ObjectId, ref: _Beer2.default
	}],
	owner: {
		name: { type: Schema.Types.ObjectId, ref: _User2.default }
	}
});

var BeerFridge = _mongoose2.default.model('BeerFridge', beerFridgeSchema);

exports.default = BeerFridge;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _unirest = __webpack_require__(18);

var _unirest2 = _interopRequireDefault(_unirest);

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

var _dotenv = __webpack_require__(7);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var beerController = {};
var BreweryKey = process.env.BREWDB_KEY;

//New Beer
beerController.addBeer = function (req, res) {
	var _req$body = req.body,
	    beer = _req$body.beer,
	    rating = _req$body.rating;


	var newBeer = new _index2.default.Beer({
		name: beer.name,
		description: beer.description,
		abv: beer.abv,
		ibu: beer.ibu,
		label: beer.labels,
		style: beer.style,
		rating: rating,
		_owner: req.decoded.id
	});

	newBeer.save().then(function (beer) {
		_index2.default.User.findByIdAndUpdate(req.decoded.id, { new: true }).then(function (user) {
			user.fridge.push(beer._id);
			user.save(function (user) {});
			res.status(200).json({
				success: true,
				data: {
					beer: beer,
					username: user.username,
					fridge: user.fridge
				}
			});
		}).catch(function (err) {
			res.status(500).json({ success: false, message: err });
		});
	}).catch(function (err) {
		res.status(500).json({
			data: err
		});
		throw err;
	});
};

//Remove Beer
beerController.removeBeer = function (req, res) {
	var beerId = req.body.beerId;


	_index2.default.Beer.findByIdAndRemove(beerId).then(function (beer) {
		if (req.decoded.id != beer._owner) {
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
	}).catch(function (err) {
		res.status(500).json({
			success: false,
			message: err
		});
	});
};

//Search for beers by name
beerController.getBeers = function (req, res) {
	var name = req.params.name;

	var brewUrl = 'http://api.brewerydb.com/v2/search?key=' + BreweryKey + '&q=' + name + '&type=beer';
	_unirest2.default.get(brewUrl).end(function (data) {
		res.status(200).json({
			success: true,
			data: data.body
		});
	});
};

//Find categories
beerController.getCategories = function (req, res) {
	var categoryUrl = 'http://api.brewerydb.com/v2/categories/?key=' + BreweryKey;
	_unirest2.default.get(categoryUrl).end(function (data) {
		res.status(200).json({
			success: true,
			data: data.body.data
		});
	});
};

//Find single category
beerController.getSingleCategory = function (req, res) {
	var categoryId = req.params.categoryId;

	var categoryUrl = 'http://api.brewerydb.com/v2/category/' + categoryId + '/?key=' + BreweryKey;
	_unirest2.default.get(categoryUrl).end(function (data) {
		res.status(200).json({
			success: true,
			data: data.body.data
		});
	});
};

exports.default = beerController;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("unirest");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

var _jsonwebtoken = __webpack_require__(6);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authController = {};

authController.verifyToken = function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		_jsonwebtoken2.default.verify(token, _app2.default.get('secret'), function (err, decoded) {
			if (err) {
				res.json({ success: false, message: 'Failed to verify token' });
				throw err;
			} else if (!decoded.id || !decoded.username) {
				return res.json({ success: false, message: 'No Payload in token' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(403).json({ success: false, message: 'no token provided' });
	}
};

exports.default = authController;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map