/*global angular, cordova, app */
app.factory('onlineStoreApi', function ($http, $log, $q, $rootScope, $state, CONFIG, $timeout, $location, $ionicHistory) {

    var apiBaseUrl = CONFIG.siteUrl;


    /**
     * Basic binder for all api calls
     * 
     * @param {type} endpoint
     * @param {type} args         * 
     * 
     * @returns {$q@call;defer.promise}
     * 
     */
    function apiRequest(endpoint, args) {
        var functionName = "apiRequest";
        $rootScope.$broadcast('loading:show');


        $log.info(functionName + ": started", endpoint);

        var deferred = $q.defer();

        $log.info(functionName + ": about to make request to: " + apiBaseUrl + endpoint);

        var config = {
            method: 'GET',
            url: apiBaseUrl
        }
        if (args) {
            angular.extend(config, args);
            $log.info('Config', config)
        }
        $http(config).then(
            function (success) {
                $log.info(functionName + ": success", endpoint, success);
                deffered.resolve();

            }, function (error) {
                $log.error(functionName + ": failed", endpoint, error);
                deffered.reject();

            }
        )
        return deffered.promise;

    }
    return {
        apiRequest: apiRequest
    }
});