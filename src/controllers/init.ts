export {};

const Company = require('../models/Company');
const Unit = require('../models/Unit');

const sanitizeCompanyName = require('./sanitizeCompanyName');
const sanitizeUnitName = require('./sanitizeUnitName');

const inspectionList = require('./inspectionList');

const retrieveInformation = require('./retrieveInformation');

const retrieveMVIInformation = require('./retrieveMVIInformation');

const getNewWorkbookItemInspections = require('./getNewWorkbookItemInspections');
const getOldWorkbookItemInspections = require('./getOldWorkbookItemInspections');

const ExcelDateToJSDate = require('./ExcelDateToJsDate')

function sanitizeMVIUnit(name) {
	if(name !== undefined) {
		if(	name[name.length - 1] === 'L' ||
			name[name.length - 1] === 'R' ||
			name[name.length - 1] === 'A' ||
			name[name.length - 1] === 'B') {
				name = name.slice(0, -1)
			}
	}
	return name;
}

function init() {	
	const workbookInformation = retrieveInformation();

	//Create Unit in Database
	workbookInformation.forEach(sheet => {
		sheet.forEach(async workbookInspection => {
			const companyName = sanitizeCompanyName(workbookInspection.CUSTOMER);
			const unitName = sanitizeUnitName(workbookInspection.UNIT);
			const uniqueName = `${companyName}-${unitName}`;
			const unitInDB = await Unit.findOne({uniqueName: uniqueName});

			const unitSpec = getUnitSpec(workbookInspection);

			if(companyName && unitName && !unitInDB && !unitName.includes('PLANT') && !companyName.includes('Westcan')) {
				try {
					await Unit.create({
						name: unitName,
						company: companyName,
						inspections: inspectionList,
						spec: unitSpec,
						uniqueName: uniqueName
					})
				} 
				catch (error) {
					console.error(error)
				}
				
			} 

			const inspectionData = getInspectionData(workbookInspection);

			await Unit.findOneAndUpdate(
				{ name: unitName, company: companyName },
				{ $set: { inspections: inspectionData }}
			)
		})
	});

	const MVIWorkbookInformation = retrieveMVIInformation();

	MVIWorkbookInformation.forEach(async inspection => {
		const MVIOwner = sanitizeCompanyName(inspection.Owner);
		const MVIUnit = sanitizeMVIUnit(inspection['Unit #']);
		const MVIDate = ExcelDateToJSDate(inspection['Inspection Date']);
		const MVIUniqueName = `${MVIOwner}-${MVIUnit}`;

		if(MVIDate instanceof Date && isNaN(MVIDate)) {
			//Invalid MVI
			// console.error('NO VALID DATE', inspection)
		} else {
			//Valid MVI
			const unitInDB = await Unit.find({});

			const filteredDB = unitInDB.find(unit => {
				if(unit.company === MVIOwner && unit.name.includes(MVIUnit)) return unit;
			});

			if(filteredDB) {
				let unitInspections = filteredDB.inspections;
				if(!unitInspections.MVI) {
					// console.log(unitInspections)

					unitInspections.MVI = {
						month: MVIDate.getMonth(),
						year: MVIDate.getFullYear(),
						interval: 1
					}					
				} else if(unitInspections.MVI && unitInspections.MVI.year < MVIDate.getFullYear()) {
					unitInspections.MVI = {
						month: MVIDate.getMonth(),
						year: MVIDate.getFullYear(),
						interval: 1
					}
				}

				if(unitInspections.MVI) unitInspections.MVI.year = 2024; 

				await Unit.findOneAndUpdate(
					{ uniqueName: filteredDB.uniqueName },
					{ $set: { inspections: unitInspections }}
				)

				// console.log(await Unit.findOne({uniqueName: filteredDB.uniqueName}))
			}
		}
	})
	
}

function getUnitSpec(item) {
	let specToReturn: string;

	if(item['TANK SPEC']) {
		let spec = item['TANK SPEC'].toString();
		if(spec.includes('306') || spec.includes('406')) {
			specToReturn = "406"
		} else if(spec.includes('307') || spec.includes('407') || spec.includes('412')) {
			specToReturn = "407"
		} else if(spec.includes('330') || spec.includes('331') || spec.includes('51')) {
			specToReturn = "331"
		} else {
			specToReturn = spec;
			// console.error('UNKNOWN SPEC', spec)
		}
	}

	return specToReturn;
}

function getInspectionData(item) {
	if(item.INSPECTION) {
		return getOldWorkbookItemInspections(item)
	} else {
		return getNewWorkbookItemInspections(item)
	}
}

module.exports = init;
