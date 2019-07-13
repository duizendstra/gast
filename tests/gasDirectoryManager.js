/* global gasLogManager:false,gasDirectoryManager:false, MAIN_SPREADSHEET_ID:false,CUSTOMER:false */
// eslint-disable-next-line no-unused-vars
function testDirectoryManager() {
    var mainSpreadsheetId = MAIN_SPREADSHEET_ID;
    var customer = CUSTOMER;

    // create the logmanager
    var logManager = gasLogManager({
        logSpreadsheetId: mainSpreadsheetId,
        logSheetName: "Log"
    });

    // create the directory manager
    var directoryManager = gasDirectoryManager({
        logManager: logManager,
        customer: customer
    });

    var users = directoryManager.getGoogleAccounts({});
    logManager.log(users);
}
