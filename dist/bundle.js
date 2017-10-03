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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

var _User = __webpack_require__(4);

var _User2 = _interopRequireDefault(_User);

var _BeerFridge = __webpack_require__(13);

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
	owner: String
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _app = __webpack_require__(8);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen(process.env.PORT || 8080, function () {
	console.log('server is working!');
});

exports.default = _app2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(9);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = __webpack_require__(10);

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = __webpack_require__(11);

var _routes2 = _interopRequireDefault(_routes);

var _config = __webpack_require__(17);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DBHost = _config2.default.get('DBHost');

_mongoose2.default.connect(DBHost, {
	useMongoClient: true
}).then(console.log("Connected to mongodb..."));
var db = _mongoose2.default.connection;
db.on('error', console.error.bind('connection error'));

var app = (0, _express2.default)();

//Middleware
app.use(_bodyParser2.default.json());

app.use('/api', _routes2.default);

exports.default = app;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _userController = __webpack_require__(12);

var _userController2 = _interopRequireDefault(_userController);

var _beerController = __webpack_require__(14);

var _beerController2 = _interopRequireDefault(_beerController);

var _beerFridgeController = __webpack_require__(16);

var _beerFridgeController2 = _interopRequireDefault(_beerFridgeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();

//Controller Imports


//User Routes
routes.post('/signup', _userController2.default.postUser);
routes.get('/getuser/:userSearch', _userController2.default.getUser);

//Beer Routes
routes.post('/beer/addbeer', _beerController2.default.addBeer);
routes.get('/beers/:name/:p', _beerController2.default.getBeers);
routes.get('/categories', _beerController2.default.getCategories);
routes.get('/categories/:categoryId', _beerController2.default.getSingleCategory);

//Beer Fridge Routes
routes.post('/beerfridge', _beerFridgeController2.default.createFridge);
routes.get('/beerfridge/:user', _beerFridgeController2.default.getUserFridge);
routes.put('/beerfridge/update', _beerFridgeController2.default.updateFridge);

exports.default = routes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = {};

// Create new user /signup route
userController.postUser = function (req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    password = _req$body.password;


	var user = new _index2.default.User({
		username: username,
		password: password
	});

	user.save().then(function (newUser) {
		res.status(200).json({
			success: true,
			data: newUser
		});
	}).catch(function (err) {
		res.status(500).json({
			message: err
		});
	});
};

//Find User
userController.getUser = function (req, res) {
	var userSearch = req.params.userSearch;


	_index2.default.User.find({ username: userSearch }).populate('fridge').then(function (user) {
		res.status(200).json({
			success: true,
			data: { id: user[0]._id, username: user[0].username, fridge: user[0].fridge }
		});
	}).catch(function (err) {
		res.status(500).json({
			message: err
		});
	});
};

//Login
userController.getLogin = function (req, res) {
	res.status(200).json({ success: true });
};

//Add Beer to User
userController.addBeer = function (req, res) {
	var _req$params = req.params,
	    user = _req$params.user,
	    beers = _req$params.beers;

	_index2.default.User.findOneAndUpdate({ username: user }, { fridge: beers }, { new: true }, function (err, updatedUser) {
		if (err) {
			return res.status(500).json({ data: err });
		}
		_index2.default.User.populate(updatedUser, { path: 'fridge', model: 'Beer' }, function (err, user) {
			return res.status(200).json({ success: true, data: user });
		});
	});
};

//Delete User
userController.deleteUser = function (req, res) {
	var userRemoved = req.params.userRemoved;

	_index2.default.User.remove({ username: userRemoved }, function (err, result) {
		res.status(200).json({
			success: true,
			data: result
		});
	});
};

exports.default = userController;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Beer = __webpack_require__(2);

var _Beer2 = _interopRequireDefault(_Beer);

var _User = __webpack_require__(4);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _unirest = __webpack_require__(15);

var _unirest2 = _interopRequireDefault(_unirest);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var beerController = {};
var BreweryKey = process.env.BREWDB_KEY;

//New Beer
beerController.addBeer = function (req, res) {
	var _req$body = req.body,
	    owner = _req$body.owner,
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
		owner: owner
	});

	newBeer.save().then(function (data) {
		res.status(200).json({
			success: true,
			data: data
		});
	}).catch(function (err) {
		res.status(500).json({
			data: err
		});
	});
};

//Search for beers by name
beerController.getBeers = function (req, res) {
	var _req$params = req.params,
	    name = _req$params.name,
	    page = _req$params.page;

	var brewUrl = 'http://api.brewerydb.com/v2/beers/?key=' + BreweryKey + '&name=' + name + '&p=' + page;
	_unirest2.default.get(brewUrl).end(function (data) {
		res.status(200).json({
			success: true,
			data: data.body.data
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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("unirest");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var beerFridgeController = {};

//Create Fridge
beerFridgeController.createFridge = function (req, res) {
	var owner = req.body.owner;


	var fridge = new _index2.default.BeerFridge({
		owner: owner
	});

	fridge.save().then(function (newFridge) {
		res.status(200).json({
			success: true,
			data: newFridge
		});
	}).catch(function (err) {
		res.status(500).json({
			data: err
		});
	});
};

//Get User's Fridge
beerFridgeController.getUserFridge = function (req, res) {
	var user = req.params.user;

	_index2.default.BeerFridge.find({ owner: user }).populate('beers').exec(function (err, fridge) {
		if (err) {
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
beerFridgeController.updateFridge = function (req, res) {
	var _req$body = req.body,
	    user = _req$body.user,
	    beers = _req$body.beers;

	_index2.default.BeerFridge.findOneAndUpdate({ user: user }, { beers: beers }, { new: true }, function (err, fridge) {
		if (err) {
			return res.status(500).json({
				message: err
			});
		}
		_index2.default.Beer.populate(fridge, { path: 'beers', model: 'Beer' }, function (err, fridge) {
			return res.status(200).json({
				success: true,
				data: fridge
			});
		});
	});
};

exports.default = beerFridgeController;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map