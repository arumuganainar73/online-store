/*global angular, cordova, app */

app.factory('onlineStoreData', function ($log, $location, CONFIG) {

    if (CONFIG.debuggerMode === false) {
        console.log("%cOnline Store App", "color:orange;font-size: 24pt");
        console.log("%cThis place is only for Developers", "color:red;font-size: 16pt");
        $log.log = function () {

        };
        $log.info = function () {

        };
        $log.error = function () {

        };
        $log.debug = function () {

        };
        $log.warn = function () {

        };

    }
    ;
    if (CONFIG.pouchdbDebuggerMode === true) {      

        PouchDB.debug.enable('*')
    }


    function getData(key) {
        return localStorage.getItem(key);

    }

    function updateData(key, value) {
        localStorage.setItem(key, value);
    }

    function deleteData(key) {
        localStorage.removeItem(key);
    }

    function getLocation() {

        return ($location.path().substr(1));
    }

    return {
        getData: getData,
        updateData: updateData,
        deleteData: deleteData,
        getLocation: getLocation

    };
});