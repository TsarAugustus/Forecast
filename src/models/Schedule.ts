import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ScheduleSchema = new Schema({
	unit: String,
	company: String,
	inspection: String,
	unitID: String,
	schedule: [{
		day: Number,
		month: Number,
		year: Number,
		cell: Number,
		unitID: String,
		missed: Boolean
	}]
});

const CustomSchedule = model('CustomSchedule', ScheduleSchema);
module.exports = CustomSchedule;
