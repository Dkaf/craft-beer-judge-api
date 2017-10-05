import mongoose from 'mongoose';

import Beer from './Beer';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
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
	fridge: [{type: Schema.Types.ObjectId, ref: 'Beer'}]
});

const User = mongoose.model('User', userSchema);

export default User;