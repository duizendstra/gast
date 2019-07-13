/* global gasLogManager:false, LOG_SPREADSHEET_ID:false*/
// eslint-disable-next-line no-unused-vars
function testGasLogManager() {
    var logSpreadsheetId = LOG_SPREADSHEET_ID;

    // create the log manager
    var logManager = gasLogManager({
        logSpreadsheetId: logSpreadsheetId,
        logSheetName: "Log",
        logLevel: "log"
    });

    logManager.info("Log test info");
}
