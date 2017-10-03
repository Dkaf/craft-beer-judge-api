process.env.NODE_ENV = 'development';

import mongoose from 'mongoose';
import userController from '../src/controllers/userController';
import User from '../src/models/User';
import Beer from '../src/models/Beer';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app.js';

const should = chai.should();

chai.use(chaiHttp);

describe('userController', () => {
	beforeEach((done) => {
		User.remove({}, (err) => {
			done();
		});
	});

	describe('postUser', () => {
		it('should add a user', (done) => {
			let user = {
				username: 'testName',
				password: 'testPassword'
			};

			chai.request(server)
				.post('/api/signup')
				.send(user)
				.end((err,res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.have.property('username');
					res.body.data.should.have.property('password');
					done();
				});


		});
	});

	describe('getUser', () => {
		it('should find a user by username', (done) => {
			let beer = new Beer({name:'pseduo sue', owner: 'testName'});
			beer.save();
			let user = new User({username: 'testName', password: 'testPassword', fridge: beer});
			user.save((err, user) => {
				chai.request(server)
					.get('/api/getuser/' + user.username)
					.send(user)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.success.should.equal(true);
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('id');
						res.body.data.should.have.property('username');
						res.body.data.should.have.property('fridge');
						res.body.data.fridge.should.be.a('array');
						done();
					});
			});
		});
	});
});