/*Angular App,Cordova */
app.controller('SalesReportController', function($rootScope, $scope, $log, onlineStoreData, onlineStorePopup){

$scope.showReportList = false;
$scope.showReport = true;

$scope.searchReport = function(){
    $scope.showReportList = true;
$scope.showReport = false;
}
});