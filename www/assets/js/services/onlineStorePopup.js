/*global angular, cordova, app */
app.factory('onlineStorePopup', function ($ionicPopup) {

    /**
     * Binder for basic ionic alert
     * 
     * @param {type} title
     * @param {type} template
     * 
     */
    function showAlert(title, template) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: template
        });
        alertPopup.then(function (res) {

        });
    };
    return {
        showAlert: showAlert
    }
});