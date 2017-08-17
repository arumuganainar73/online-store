/*Angular App,Cordova */
app.controller('AccountsController', function ($rootScope, $ionicPopup, $filter, $scope, $log, onlineStoreData,
    onlineStorePouchdb, onlineStorePopup) {

    var currentDate = new Date();
    $scope.currentDate = $filter('date')(currentDate, 'yyyy-MM-dd');
    $scope.data={};

    function getAllAccounts(){
        onlineStorePouchdb.pouchdb.getUserData().then(
            function (response) {
                $log.info("SUCCESS ->", response.rows);

                angular.forEach(response.rows,function(event, index){
                    if(event.doc.accounts){
                    var account =event.doc.accounts;
                    $scope.accounts.push(account);
                    $log.info("accounts", $scope.accounts);
                    }
                
                    })
                    },
            function (error) {
                $log.info("ERROR -> ", error);
                // onlineStorePouchdb.pouchdb.deleteDataBase();
        });
    };
    getAllAccounts();

    /**
     *  from scope, updtes profile
     *  data sent as FormData
     *  
     *  @returns {Boolean}
     */
    $scope.accounts =[];
    $scope.addAccounts = function () {

       
        if (!$scope.data.expenseType) {

            onlineStorePopup.showAlert("Error", "type is empty");
            return false;
        }

        if (!$scope.data.amount) {

            onlineStorePopup.showAlert("Error", "amount is empty");
            return false;
        }

        if (!$scope.data.comment) {

            onlineStorePopup.showAlert("Error", "comment is empty");
            return false;
        }
      
        var accountsArray = {
                'expenseType': $scope.data.expenseType,
                'amount': $scope.data.amount,
                'comment': $scope.data.comment, 
         }
        var data = { 
            _id:new Date().toISOString(),          
            accounts: accountsArray

        };
        onlineStorePouchdb.pouchdb.setUserData(data).then(
                function (response) {
                    $log.info("SUCCESS ->", response);
                    onlineStorePouchdb.pouchdb.getUserData().then(
                        function (response) {
                            $log.info("SUCCESS ->", response.rows);
                            $scope.data={};

                            angular.forEach(response.rows,function(event, index){
                                if(event.doc.accounts){
                                var account =event.doc.accounts;
                                $scope.accounts.push(account);
                                $log.info("accounts", $scope.accounts);
                                }
                            
                                })
                                },
                        function (error) {
                            $log.info("ERROR -> ", error);
                            // onlineStorePouchdb.pouchdb.deleteDataBase();
                        });
                },
                function (error) {
                    $log.info("ERROR -> ", error);
                    if(error.name === "conflict"){

                    }
                    // onlineStorePouchdb.pouchdb.deleteDataBase();
                });


    };
    $scope.resetAccounts = function(){
        $scope.data = {};
    };
    $scope.removeAccounts = function(index){
    var confirmPopup = $ionicPopup.confirm({
            title: 'Remove',
            template: 'Are You Sure Want to Delete Accounts?',
            okText: 'Yes',
            cancelText: 'No'
        });

        confirmPopup.then(function (res) {
           $log.info("AccountId", index);
        $scope.accounts.splice(index, 1);
        });
        
    }


});