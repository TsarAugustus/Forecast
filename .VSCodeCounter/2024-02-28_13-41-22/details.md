# Details

Date : 2024-02-28 13:41:22

Directory c:\\Users\\kiwi_\\Documents\\Programming\\Forecast\\src

Total : 43 files,  1979 codes, 338 comments, 569 blanks, all 2886 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [src/app.ts](/src/app.ts) | TypeScript | 44 | 1 | 20 | 65 |
| [src/controllers/ExcelDateToJSDate.ts](/src/controllers/ExcelDateToJSDate.ts) | TypeScript | 5 | 0 | 3 | 8 |
| [src/controllers/getNewWorkbookItemInspections.ts](/src/controllers/getNewWorkbookItemInspections.ts) | TypeScript | 45 | 1 | 11 | 57 |
| [src/controllers/getOldWorkbookItemInspections.ts](/src/controllers/getOldWorkbookItemInspections.ts) | TypeScript | 54 | 1 | 12 | 67 |
| [src/controllers/getRequestedYearUnits.ts](/src/controllers/getRequestedYearUnits.ts) | TypeScript | 61 | 3 | 20 | 84 |
| [src/controllers/init.ts](/src/controllers/init.ts) | TypeScript | 112 | 7 | 31 | 150 |
| [src/controllers/inspectionLimits.ts](/src/controllers/inspectionLimits.ts) | TypeScript | 39 | 3 | 3 | 45 |
| [src/controllers/inspectionList.ts](/src/controllers/inspectionList.ts) | TypeScript | 48 | 0 | 2 | 50 |
| [src/controllers/matrixController.ts](/src/controllers/matrixController.ts) | TypeScript | 198 | 2 | 39 | 239 |
| [src/controllers/retrieveInformation.ts](/src/controllers/retrieveInformation.ts) | TypeScript | 10 | 4 | 6 | 20 |
| [src/controllers/retrieveMVIInformation.ts](/src/controllers/retrieveMVIInformation.ts) | TypeScript | 9 | 0 | 7 | 16 |
| [src/controllers/sanitizeCompanyName.ts](/src/controllers/sanitizeCompanyName.ts) | TypeScript | 32 | 0 | 4 | 36 |
| [src/controllers/sanitizeUnitInspections.ts](/src/controllers/sanitizeUnitInspections.ts) | TypeScript | 17 | 0 | 6 | 23 |
| [src/controllers/sanitizeUnitName.ts](/src/controllers/sanitizeUnitName.ts) | TypeScript | 17 | 23 | 15 | 55 |
| [src/controllers/sortMonthUnitsByCustomer.ts](/src/controllers/sortMonthUnitsByCustomer.ts) | TypeScript | 20 | 0 | 7 | 27 |
| [src/models/CustomInspection.ts](/src/models/CustomInspection.ts) | TypeScript | 13 | 1 | 3 | 17 |
| [src/models/CustomStyle.ts](/src/models/CustomStyle.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [src/models/CustomUnit.ts](/src/models/CustomUnit.ts) | TypeScript | 13 | 1 | 3 | 17 |
| [src/models/MissedUnits.ts](/src/models/MissedUnits.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [src/models/Schedule.ts](/src/models/Schedule.ts) | TypeScript | 19 | 0 | 3 | 22 |
| [src/models/Unit.ts](/src/models/Unit.ts) | TypeScript | 12 | 0 | 3 | 15 |
| [src/public/css/style.css](/src/public/css/style.css) | CSS | 206 | 25 | 59 | 290 |
| [src/public/css/unitStyling.css](/src/public/css/unitStyling.css) | CSS | 61 | 159 | 48 | 268 |
| [src/public/js/clearUnitSchedule.ts](/src/public/js/clearUnitSchedule.ts) | TypeScript | 16 | 0 | 5 | 21 |
| [src/public/js/create.ts](/src/public/js/create.ts) | TypeScript | 11 | 0 | 5 | 16 |
| [src/public/js/deleteUnit.ts](/src/public/js/deleteUnit.ts) | TypeScript | 14 | 0 | 4 | 18 |
| [src/public/js/editUnit.ts](/src/public/js/editUnit.ts) | TypeScript | 85 | 12 | 34 | 131 |
| [src/public/js/getSchedule.ts](/src/public/js/getSchedule.ts) | TypeScript | 52 | 17 | 22 | 91 |
| [src/public/js/init.ts](/src/public/js/init.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/public/js/months.ts](/src/public/js/months.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/public/js/selectorSystem.ts](/src/public/js/selectorSystem.ts) | TypeScript | 123 | 4 | 30 | 157 |
| [src/public/js/shopDropDown.ts](/src/public/js/shopDropDown.ts) | TypeScript | 26 | 19 | 16 | 61 |
| [src/routes/api.ts](/src/routes/api.ts) | TypeScript | 13 | 0 | 11 | 24 |
| [src/routes/confirm.ts](/src/routes/confirm.ts) | TypeScript | 32 | 0 | 11 | 43 |
| [src/routes/file.ts](/src/routes/file.ts) | TypeScript | 30 | 8 | 13 | 51 |
| [src/routes/index.ts](/src/routes/index.ts) | TypeScript | 7 | 0 | 3 | 10 |
| [src/routes/matrix.ts](/src/routes/matrix.ts) | TypeScript | 9 | 0 | 6 | 15 |
| [src/routes/year.ts](/src/routes/year.ts) | TypeScript | 327 | 13 | 85 | 425 |
| [src/views/includes/sidebar.pug](/src/views/includes/sidebar.pug) | Pug | 34 | 0 | 1 | 35 |
| [src/views/index.pug](/src/views/index.pug) | Pug | 22 | 0 | 1 | 23 |
| [src/views/matrix.pug](/src/views/matrix.pug) | Pug | 52 | 33 | 1 | 86 |
| [src/views/month.pug](/src/views/month.pug) | Pug | 54 | 1 | 4 | 59 |
| [src/views/year.pug](/src/views/year.pug) | Pug | 4 | 0 | 2 | 6 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)