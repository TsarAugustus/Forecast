import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CustomInspectionSchema = new Schema({
	unit: String,
	company: String,
	inspection: String,
	year: Number,
	month: Number,
	unitID: String,
	shop: {type: String, default: 'Surrey'}
	// uniqueName: { type: String, unique: true}
});

const CustomInspection = model('CustomInspection', CustomInspectionSchema);
module.exports = CustomInspection;
