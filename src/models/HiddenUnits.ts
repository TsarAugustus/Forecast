import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const HiddenUnitSchema = new Schema({
	year: Number,
	month: Number,
	shop: String,
	id: String,
	company: String,
	unit: String
	// uniqueName: { type: String, unique: true}
});

const HiddenUnit = model('HiddenUnit', HiddenUnitSchema);
module.exports = HiddenUnit;
