/*Angular App,Cordova */
app.controller('ReportController', function($rootScope, $scope, $log, onlineStoreData, onlineStorePopup){


$scope.showButton = true;
$scope.showAccountsReport = function(){
    $scope.showButton = false;
    $scope.accountsReport = true;  
}
$scope.backAccountsReport = function(){
    $scope.showButton = true;
    $scope.accountsReport = false;  
}
});