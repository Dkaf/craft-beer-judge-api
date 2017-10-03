import mongoose from 'mongoose';

const { Schema } = mongoose;

const beerSchema = new Schema({
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
	_owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Beer = mongoose.model('Beer', beerSchema);

export default Beer;