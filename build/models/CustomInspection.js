"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CustomInspectionSchema = new Schema({
    unit: String,
    company: String,
    inspection: String,
    year: Number,
    month: Number,
    unitID: String
    // uniqueName: { type: String, unique: true}
});
const CustomInspection = model('CustomInspection', CustomInspectionSchema);
module.exports = CustomInspection;
