import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
	name: String,
	units: []
});

const Company = model('Company', CompanySchema);
module.exports = Company;
