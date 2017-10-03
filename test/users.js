process.env.NODE_ENV = 'development';

import mongoose from 'mongoose';
import userController from '../src/controllers/userController';
import User from '../src/models/User';
import Beer from '../src/models/Beer';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index.js';

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
						res.body.data.should.have.property('username').eql('testName');
						res.body.data.should.have.property('fridge');
						res.body.data.fridge.should.be.a('array');
						done();
					});
			});
		});
	});

	describe('addBeer', () => {
		it('should update a users fridge', (done) => {
			let beer = new Beer({name:'pseduo sue', owner: 'Dan'});
			beer.save();
			let beer2 = new Beer({name:'pbr', owner: 'Dan'})
			beer2.save();
			let newFridge = [beer, beer2];
			let testUser = new User({
				username: 'Daniel',
				password:'testPassword',
				fridge: beer
			});
			testUser.save();
			chai.request(server)
				.put('/api/user/addbeer/' + testUser.id)
				.send({"beers": newFridge})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('fridge');
					res.body.data.fridge.should.be.a('array');
					res.body.data.fridge.length.should.equal(2);
					done();
				});
		});
	});

	describe('deleteUser', () => {
		it('should delete a user by username', (done) => {
			let testUser = new User({username: 'Dan', password:'test'});
			testUser.save((err, user) => {
				chai.request(server)
					.delete('/api/deleteuser/' + testUser.username)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.success.should.equal(true);
						res.body.data.should.be.a('object');
						done();
					});
			});
		});
	});
});