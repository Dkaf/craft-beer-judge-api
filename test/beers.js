process.env.NODE_ENV = 'development';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import beerController from '../src/controllers/beerController';
import Beer from '../src/models/Beer';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index.js';

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

			var token = jwt.sign({username:'Dkaf', id: 123456}, server.get('secret'), {expiresIn: '1m'});

			chai.request(server)
				.post('/api/beer/addbeer')
				.send({beer, token})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.have.property('name');
					done();
				});
		});
	});

	describe('/getBeers', () => {
		it('should get beers by name and page', (done) => {
			chai.request(server)
				.get('/api/beers/sue/1')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.be.a('array');
					done();
				});
		});
	});
    
	describe('/getCategories', () => {
		it('should get beer categories', (done) => {
			chai.request(server)
				.get('/api/categories')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.be.a('array');
					done();
				});
		});
	});

	describe('/getSingleCategory', () => {
		it('should get a beer category by id', (done) => {
			chai.request(server)
				.get('/api/categories/1')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.be.a('object');
					res.body.data.id.should.equal(1);
					done();
				});
		});
	});
});