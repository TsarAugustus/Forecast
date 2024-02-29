"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const ScheduleSchema = new Schema({
    unit: String,
    company: String,
    inspection: String,
    unitID: String,
    shop: { type: String, default: 'Surrey' },
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
