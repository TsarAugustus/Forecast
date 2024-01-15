"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const UnitSchema = new Schema({
    name: String,
    company: String,
    inspections: Object,
    spec: String,
    uniqueName: { type: String, unique: true }
});
const Unit = model('Unit', UnitSchema);
module.exports = Unit;
