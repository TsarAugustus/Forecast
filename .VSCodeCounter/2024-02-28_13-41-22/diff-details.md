# Diff Details

Date : 2024-02-28 13:41:22

Directory c:\\Users\\kiwi_\\Documents\\Programming\\Forecast\\src

Total : 52 files,  -8753 codes, -424 comments, -169 blanks, all -9346 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.cjs](/.eslintrc.cjs) | JavaScript | -55 | 0 | -1 | -56 |
| [README.md](/README.md) | Markdown | -2 | 0 | -1 | -3 |
| [build/app.js](/build/app.js) | JavaScript | -49 | -1 | -1 | -51 |
| [build/controllers/ExcelDateToJSDate.js](/build/controllers/ExcelDateToJSDate.js) | JavaScript | -6 | 0 | -1 | -7 |
| [build/controllers/getNewWorkbookItemInspections.js](/build/controllers/getNewWorkbookItemInspections.js) | JavaScript | -56 | -1 | -1 | -58 |
| [build/controllers/getOldWorkbookItemInspections.js](/build/controllers/getOldWorkbookItemInspections.js) | JavaScript | -71 | -1 | -1 | -73 |
| [build/controllers/getRequestedYearUnits.js](/build/controllers/getRequestedYearUnits.js) | JavaScript | -63 | -3 | -1 | -67 |
| [build/controllers/init.js](/build/controllers/init.js) | JavaScript | -115 | -7 | -1 | -123 |
| [build/controllers/inspectionLimits.js](/build/controllers/inspectionLimits.js) | JavaScript | -40 | -3 | -1 | -44 |
| [build/controllers/inspectionList.js](/build/controllers/inspectionList.js) | JavaScript | -49 | 0 | -1 | -50 |
| [build/controllers/matrix.js](/build/controllers/matrix.js) | JavaScript | -4 | 0 | -1 | -5 |
| [build/controllers/matrixController.js](/build/controllers/matrixController.js) | JavaScript | -229 | -2 | -1 | -232 |
| [build/controllers/retrieveInformation.js](/build/controllers/retrieveInformation.js) | JavaScript | -11 | -4 | -1 | -16 |
| [build/controllers/retrieveMVIInformation.js](/build/controllers/retrieveMVIInformation.js) | JavaScript | -10 | 0 | -1 | -11 |
| [build/controllers/sanitizeCompanyName.js](/build/controllers/sanitizeCompanyName.js) | JavaScript | -57 | 0 | -1 | -58 |
| [build/controllers/sanitizeUnitInspections.js](/build/controllers/sanitizeUnitInspections.js) | JavaScript | -18 | 0 | -1 | -19 |
| [build/controllers/sanitizeUnitName.js](/build/controllers/sanitizeUnitName.js) | JavaScript | -19 | -23 | -1 | -43 |
| [build/controllers/sortMonthUnitsByCustomer.js](/build/controllers/sortMonthUnitsByCustomer.js) | JavaScript | -21 | 0 | -1 | -22 |
| [build/models/Company.js](/build/models/Company.js) | JavaScript | -13 | 0 | -1 | -14 |
| [build/models/CustomInspection.js](/build/models/CustomInspection.js) | JavaScript | -18 | -1 | -1 | -20 |
| [build/models/CustomStyle.js](/build/models/CustomStyle.js) | JavaScript | -15 | 0 | -1 | -16 |
| [build/models/CustomUnit.js](/build/models/CustomUnit.js) | JavaScript | -18 | -1 | -1 | -20 |
| [build/models/MissedUnits.js](/build/models/MissedUnits.js) | JavaScript | -18 | 0 | -1 | -19 |
| [build/models/Schedule.js](/build/models/Schedule.js) | JavaScript | -24 | 0 | -1 | -25 |
| [build/models/Unit.js](/build/models/Unit.js) | JavaScript | -17 | 0 | -1 | -18 |
| [build/public/css/style.css](/build/public/css/style.css) | CSS | -206 | -25 | -59 | -290 |
| [build/public/css/unitStyling.css](/build/public/css/unitStyling.css) | CSS | -61 | -159 | -48 | -268 |
| [build/public/js/clearUnitSchedule.js](/build/public/js/clearUnitSchedule.js) | JavaScript | -17 | 0 | -1 | -18 |
| [build/public/js/create.js](/build/public/js/create.js) | JavaScript | -12 | 0 | -1 | -13 |
| [build/public/js/deleteUnit.js](/build/public/js/deleteUnit.js) | JavaScript | -15 | 0 | -1 | -16 |
| [build/public/js/editUnit.js](/build/public/js/editUnit.js) | JavaScript | -87 | -12 | -1 | -100 |
| [build/public/js/getSchedule.js](/build/public/js/getSchedule.js) | JavaScript | -54 | -17 | -1 | -72 |
| [build/public/js/init.js](/build/public/js/init.js) | JavaScript | -10 | 0 | -1 | -11 |
| [build/public/js/months.js](/build/public/js/months.js) | JavaScript | -2 | 0 | -1 | -3 |
| [build/public/js/selectorSystem.js](/build/public/js/selectorSystem.js) | JavaScript | -127 | -4 | -1 | -132 |
| [build/public/js/shopDropDown.js](/build/public/js/shopDropDown.js) | JavaScript | -27 | -19 | -1 | -47 |
| [build/routes/api.js](/build/routes/api.js) | JavaScript | -14 | 0 | -1 | -15 |
| [build/routes/confirm.js](/build/routes/confirm.js) | JavaScript | -31 | 0 | -1 | -32 |
| [build/routes/file.js](/build/routes/file.js) | JavaScript | -31 | -8 | -1 | -40 |
| [build/routes/index.js](/build/routes/index.js) | JavaScript | -8 | 0 | -1 | -9 |
| [build/routes/matrix.js](/build/routes/matrix.js) | JavaScript | -10 | 0 | -1 | -11 |
| [build/routes/year.js](/build/routes/year.js) | JavaScript | -325 | -12 | -1 | -338 |
| [build/views/includes/sidebar.pug](/build/views/includes/sidebar.pug) | Pug | -34 | 0 | -1 | -35 |
| [build/views/index.pug](/build/views/index.pug) | Pug | -22 | 0 | -1 | -23 |
| [build/views/matrix.pug](/build/views/matrix.pug) | Pug | -52 | -33 | -1 | -86 |
| [build/views/month.pug](/build/views/month.pug) | Pug | -54 | -1 | -4 | -59 |
| [build/views/year.pug](/build/views/year.pug) | Pug | -4 | 0 | -2 | -6 |
| [nodemon.json](/nodemon.json) | JSON | -8 | 0 | -1 | -9 |
| [old-package.json](/old-package.json) | JSON | -19 | 0 | -1 | -20 |
| [package-lock.json](/package-lock.json) | JSON | -6,485 | 0 | -1 | -6,486 |
| [package.json](/package.json) | JSON | -24 | 0 | -1 | -25 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | -16 | -87 | -9 | -112 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details