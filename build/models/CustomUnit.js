"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CustomUnitSchema = new Schema({
    unit: String,
    company: String,
    inspection: String,
    year: Number,
    month: Number,
    spec: String,
    shop: { type: String, default: 'Surrey' }
    // uniqueName: { type: String, unique: true}
});
const CustomUnit = model('CustomUnit', CustomUnitSchema);
module.exports = CustomUnit;
