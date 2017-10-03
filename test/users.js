process.env.NODE_ENV = 'development';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';

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
					res.body.data.should.equal(user.username);
					res.body.should.have.property('token');
					res.body.token.should.be.a('string');
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

	describe('login', () => {
		it('should verify the user and return a token', (done) => {
			let testUser = new User({
				username: 'Daniel',
				password: bcrypt.hashSync('testPassword')
			});
			testUser.save((err,user) => {
				chai.request(server)
					.post('/api/login')
					.send({"name": testUser.username, "password": "testPassword"})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.success.should.equal(true);
						res.body.should.have.property('token');
						res.body.token.should.be.a('string');
						done();
					});
			});
		});
	});

	describe('addBeer', () => {
		it('should update a users fridge', (done) => {
			let token = jwt.sign({username: 'Daniel'}, server.get('secret'),{ expiresIn:'1m' });			
			let beer = new Beer({name:'pseduo sue', owner: 'Dan'});
			beer.save();
			let beer2 = new Beer({name:'pbr', owner: 'Dan'});
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
				.send({"beers": newFridge, "token": token})
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
			let token = jwt.sign({username: 'Daniel'}, server.get('secret'),{ expiresIn:'1m' });						
			let testUser = new User({username: 'Daniel', password:'test'});
			testUser.save((err, user) => {
				chai.request(server)
					.delete('/api/deleteuser/' + testUser.username)
					.set('x-access-token', token)					
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