import mongoose from 'mongoose';
import Beer from './Beer';
import User from './User';

const { Schema } = mongoose;

const beerFridgeSchema = new Schema({
	beers: [{
		type: Schema.Types.ObjectId, ref: Beer
	}],
	owner: {
		name: {type: Schema.Types.ObjectId, ref: User}
	}
});

const BeerFridge = mongoose.model('BeerFridge', beerFridgeSchema);

export default BeerFridge;