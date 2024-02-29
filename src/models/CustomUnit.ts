import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CustomUnitSchema = new Schema({
	unit: String,
	company: String,
	inspection: String,
	year: Number,
	month: Number,
	spec: String,
	shop: { type: String, default: 'Surrey' }
	// uniqueName: { type: String, unique: true}
});

const CustomUnit = model('CustomUnit', CustomUnitSchema);
module.exports = CustomUnit;
