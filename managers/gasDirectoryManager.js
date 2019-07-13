/* global AdminDirectory:false */
// eslint-disable-next-line no-unused-vars
function gasDirectoryManager(par) {
    "use strict";
    var objectName = "gasDirectoryManager";
    var logManager = par.logManager || console;
    var customer = par.customer;

    var getExternalIds = function (externalIds) {
        if (externalIds === undefined || externalIds.lenght == 0) {
            return "";
        }

        if (externalIds.length > 1) {
            logManager.warn("multiple external id's found");
        }

        if (externalIds[0].type === "organization") {
            return externalIds[0].value;
        }

        return externalIds;
    };

    var getGoogleAccounts = function (options) {
        var apiParameters = {};
        var pageToken;
        var response;
        var users = [];

        // check if domain is passed in the parameters
        apiParameters.customer = customer;

        if (options.query) {
            apiParameters.query = options.query;
        }
        do {

            apiParameters.pageToken = pageToken;
            response = AdminDirectory.Users.list(apiParameters);

            if (response.users) {
                users = users.concat(response.users);
            }

            pageToken = response.nextPageToken;
            if (pageToken) {
                logManager.info("Fetched " + users.length + " accounts");
            }
        } while (pageToken);

        return users;
    };

    var createUser = function (user) {
        AdminDirectory.Users.insert(user);
    };

    var supendUser = function (user, email) {
        user.suspended = true;
        AdminDirectory.Users.update(user, email);
    };

    var updateUser = function (user, email) {
        AdminDirectory.Users.update(user, email);
    };

    logManager.log("created " + objectName);

    return Object.freeze({
        getObjectName: objectName,
        getExternalIds: getExternalIds,
        getGoogleAccounts: getGoogleAccounts,
        createUser: createUser,
        updateUser: updateUser,
        supendUser: supendUser
    });
}