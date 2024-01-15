"use strict";
function sanitizeCompanyName(name) {
    if (name === undefined || name === 'CUSTOMER')
        return;
    if (name.includes('Superior'))
        name = 'Superior';
    if (name.includes('Enex'))
        name = 'FuelEx';
    if (name.includes('Summit'))
        name = 'Summit';
    if (name.includes('Kodiak'))
        name = 'Kodiak';
    if (name.includes('Otter'))
        name = 'Otter';
    if (name.includes('Paz'))
        name = 'Paz';
    if (name.includes('KJTL')
        || name.includes('KJ'))
        name = 'Ken Johnson';
    if (name.includes('Petro Value'))
        name = 'KMP';
    if (name.includes('Propane Depot')
        || name.includes('Propane depot'))
        name = 'Propane Depot';
    if (name.includes('Burden'))
        name = 'Burden';
    if (name.includes('CT'))
        name = 'CT Gas';
    if (name.includes('United Rental'))
        name = 'United Rentals';
    if (name.includes('Tyee'))
        name = 'Tyee';
    if (name.includes('Source'))
        name = 'Source It Solutions';
    if (name.includes('Oxford'))
        name = 'Oxford';
    if (name.includes('Northside'))
        name = 'Northside';
    if (name.includes('Northwest'))
        name = 'NWTL';
    if (name.includes('Fox Fuel'))
        name = 'Fox Fuel';
    if (name.includes('Federated')
        || name.includes('Fed coop')
        || name.includes('Fed Coop'))
        name = 'Federated Co-Op';
    if (name.includes('Coastal Mountain'))
        name = 'Coastal Mountain';
    if (name.includes('Cangas'))
        name = 'CanGas';
    if (name.includes('Cleartech'))
        name = 'Clear Tech';
    if (name.includes('NAT'))
        name = 'North Arm';
    return name;
}
module.exports = sanitizeCompanyName;
