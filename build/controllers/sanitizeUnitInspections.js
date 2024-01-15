"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sanitizeUnitInspections(arr) {
    arr.forEach(unit => {
        if (unit.spec === '406') {
            if (unit.inspection.includes('I') && (!unit.inspection.includes('P') || !unit.inspection.includes('UC'))) {
                unit.inspection = 'VK';
            }
        }
        if (unit.spec === '331') {
            if (unit.inspection.includes('I') && (!unit.inspection.includes('P') || !unit.inspection.includes('UC'))) {
                unit.inspection = 'VK';
            }
        }
    });
    return arr;
}
module.exports = sanitizeUnitInspections;
