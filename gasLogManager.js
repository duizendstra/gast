/* global SpreadsheetApp:false */
// eslint-disable-next-line no-unused-vars
function gasLogManager(par) {
  "use strict";
  var objectName = "gasLogManager";
  var logSpreadsheetId = par.logSpreadsheetId;
  var logSheetName = par.logSheetName;
  var logSheet;
  var logLevel = 2;
  var levelSet = {
    log: 1,
    info: 2,
    warning: 3,
    error: 4
  };

  var log = function(message) {
    // eslint-disable-next-line no-console
    if (logLevel > 1) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(message);
    try {
      if (logSheet) {
        logSheet.appendRow([new Date(), "DEBUG", message]);
      }
    } catch (ignore) {
      // don't break on logging
    }
  };

  var info = function(message) {
    if (logLevel > 2) {
      return;
    }
    // eslint-disable-next-line no-console
    console.info(message);
    try {
      if (logSheet) {
        logSheet.appendRow([new Date(), "INFO", message]);
      }
    } catch (ignore) {
      // don't break on logging
    }
  };

  var warn = function(message) {
    if (logLevel > 3) {
      return;
    }
    // eslint-disable-next-line no-console
    console.warn(message);
    try {
      if (logSheet) {
        logSheet.appendRow([new Date(), "WARN", message]);
      }
    } catch (ignore) {
      // don't break on logging
    }
  };

  var error = function(message) {
    if (logLevel > 4) {
      return;
    }
    // eslint-disable-next-line no-console
    console.error(message);
    try {
      if (logSheet) {
        logSheet.appendRow([new Date(), "ERROR", message]);
      }
    } catch (ignore) {
      // don't break on logging
    }
  };

  if (par.logLevel) {
    logLevel = levelSet[par.logLevel];
  }

  if (logSpreadsheetId !== undefined) {
    logSheet = SpreadsheetApp.openById(logSpreadsheetId).getSheetByName(logSheetName);
    logSheet.getDataRange().clearContent();
    SpreadsheetApp.openById(logSpreadsheetId)
      .getSheetByName(logSheetName)
      .appendRow(["Time", "Level", "Message"]);
  }

  return Object.freeze({
    getObjectName: objectName,
    info: info,
    log: log,
    warn: warn,
    error: error
  });
}
