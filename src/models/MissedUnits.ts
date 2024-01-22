import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MissedUnitsSchema = new Schema({
	year: Number,
	month: Number,
	day: Number,
	cell: Number,
	unit: String,
	company: String,
	unitID: String
});

const MissedUnits = model('MissedUnits', MissedUnitsSchema);
module.exports = MissedUnits;
