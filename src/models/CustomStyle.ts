import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const StyleSchema = new Schema({
	company: String,
	backgroundColor: String,
	borderColor: String,
	textColor: String
});

const Style = model('Style', StyleSchema);
module.exports = Style;
