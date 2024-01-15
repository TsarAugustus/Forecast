import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UnitSchema = new Schema({
	name: String,
	company: String,
	inspections: Object,
	spec: String,
	uniqueName: { type: String, unique: true}
});

const Unit = model('Unit', UnitSchema);
module.exports = Unit;
