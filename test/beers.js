process.env.NODE_ENV = 'development';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import beerController from '../src/controllers/beerController';
import Beer from '../src/models/Beer';
import User from '../src/models/User';
// import { getBeers } from '/.nock_responses';
import fs from 'fs';

import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import server from '../src/index.js';
import dotenv from 'dotenv';
dotenv.config();

const should = chai.should();

chai.use(chaiHttp);

describe('beerController', () => {
	beforeEach((done) => {
		Beer.remove({}, (err) =>{
			done();            
		});
	});

	describe('/addBeer', () => {
		it('should add a beer to the database', (done) => {

			let beer = {
				'id': 'Uk0aCI',
				'name': 'Sue',
				'description': 'The south is famous for smoking everything. Why not beer? Sue is a big, rich, smoky malt bomb of a beer, with mellow smokiness coming from barley malts smoked with cherry wood, and assertive bitterness from Galena and Perle hops to cleanse the finish.',
				'abv': '9.2',
				'ibu': '72',
				'labels': {
					'icon': 'https://s3.amazonaws.com/brewerydbapi/beer/Uk0aCI/upload_9BBdB4-icon.png',
					'medium': 'https://s3.amazonaws.com/brewerydbapi/beer/Uk0aCI/upload_9BBdB4-medium.png',
					'large': 'https://s3.amazonaws.com/brewerydbapi/beer/Uk0aCI/upload_9BBdB4-large.png'
				},
				'style': {
					'id': 158,
					'categoryId': 3,
					'category': {
						'id': 3,
						'name': 'North American Origin Ales',
						'createDate': '2012-03-21 20:06:45'
					},
					'name': 'American-Style Imperial Porter',
					'shortName': 'American Imperial Porter',
					'description': 'American-style imperial porters are black in color. No roast barley or strong burnt/astringent black malt character should be perceived. Medium malt, caramel and cocoa-like sweetness. Hop bitterness is perceived at a medium-low to medium level. Hop flavor and aroma may vary from being low to medium-high. This is a full bodied beer. Ale-like fruity esters should be evident but not overpowering and compliment hop character and malt derived sweetness. Diacetyl (butterscotch) levels should be absent.',
					'ibuMin': '35',
					'ibuMax': '50',
					'abvMin': '5.5',
					'abvMax': '9.5',
					'srmMin': '40',
					'srmMax': '40',
					'ogMin': '1.08',
					'ogMax': '1.1',
					'fgMin': '1.02',
					'fgMax': '1.03',
					'createDate': '2013-08-10 12:42:51',
					'updateDate': '2015-04-07 15:49:32'
				}
			};

			let user = new User({username: 'Daniel', password: 'testPassword', fridge:[]});
			user.save();
			let token = jwt.sign({username: user.username, id: user._id}, server.get('secret'), {expiresIn: '10s'});

			chai.request(server)
				.post('/api/beer/addbeer')
				.send({beer, token})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.have.property('beer');
					res.body.data.beer.should.be.a('object');
					res.body.data.should.have.property('username');
					res.body.data.username.should.be.a('string');
					res.body.data.should.have.property('fridge');
					res.body.data.fridge.should.be.a('array');
					res.body.data.fridge.length.should.equal(1);
					done();
				});
		});
	});

	describe('/removeBeer', () => {
		it('should remove beer for a user', (done) => {
			
			let user = new User({username: 'Daniel', password: 'testPassword', fridge: []});
			user.save( (err, user) => {
				if(err) {
					throw err;
				}
			});
			let beer = new Beer({name: 'pseudo sue', _owner: user._id});
			beer.save()
				.then((beer) => {
					User.findByIdAndUpdate(user._id)
						.then( (user) => {
							user.fridge.push(beer._id);
						}).catch((err) => {
							throw err;
						});
				}).catch( (err) => {
					throw err;
				});
			let token = jwt.sign({username: user.username, id: user._id }, server.get('secret'), {expiresIn: '10s'}); 				
			chai.request(server)
				.delete('/api/beer')
				.send({beerId: beer._id, token})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('message');
					res.body.message.should.be.a('string');
					done();
				});
		});
	});

	describe('/getBeers', () => {
		it('should get beers by name and page', (done) => {


			let contents = fs.readFileSync(__dirname + '/nock_responses/getBeers.json');

			let jsonContents = JSON.parse(contents);

			nock('http://api.brewerydb.com/v2')
				.get('/beers/?key=' + process.env.BREWDB_KEY + '&name=sue&p=1')
				.reply(200, jsonContents);



			chai.request(server)
				.get('/api/beers/sue/1')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.should.be.a('object');
					done();
				});
		});
	});
    
	describe('/getCategories', () => {
		it('should get beer categories', (done) => {

			let contents = fs.readFileSync(__dirname + '/nock_responses/getCategories.json');

			let jsonContents = JSON.parse(contents);
			
			nock('http://api.brewerydb.com/v2')
				.get('/categories/?key=' + process.env.BREWDB_KEY)
				.reply(200, jsonContents);


			chai.request('http://localhost:8080')
				.get('/api/categories')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.should.have.property('data');
					res.body.data.should.be.a('array');
					done();
				});
		});
	});

	describe('/getSingleCategory', () => {
		it('should get a beer category by id', (done) => {

			let contents = fs.readFileSync(__dirname + '/nock_responses/getSingleCategory.json');

			let jsonContents = JSON.parse(contents);
			

			nock('http://api.brewerydb.com/v2')
				.get('/category/5/?key=' + process.env.BREWDB_KEY)
				.reply(200, jsonContents);
			


			chai.request(server)
				.get('/api/categories/5')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.be.a('object');
					res.body.data.id.should.equal(5);
					done();
				});
		});
	});
});