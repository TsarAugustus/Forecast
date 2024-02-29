"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const HiddenUnitSchema = new Schema({
    year: Number,
    month: Number,
    shop: String,
    id: String,
    company: String,
    unit: String
    // uniqueName: { type: String, unique: true}
});
const HiddenUnit = model('HiddenUnit', HiddenUnitSchema);
module.exports = HiddenUnit;
