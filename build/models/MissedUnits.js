"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
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
