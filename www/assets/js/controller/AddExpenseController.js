/*Angular App,Cordova */
app.controller('AddExpenseController', function ($rootScope, $ionicPopup, $scope, $log, $filter, onlineStoreData,
        onlineStorePouchdb, onlineStorePopup) {

    var currentDate = new Date();
    $scope.currentDate = $filter('date')(currentDate, 'yyyy-MM-dd');

    $scope.data = {};

     $scope.expenseslist = [];
    function getAllExpenses() {
        onlineStorePouchdb.pouchdb.getUserData().then(
                function (response) {
                    $log.info("SUCCESS ->", response.rows);

                    angular.forEach(response.rows, function (event, index) {
                        if (event.doc.expenseslist) {
                            var expense = event.doc.expenseslist;
                            $scope.expenseslist.push(expense);
                            $log.info("expenseslist", $scope.expenseslist);
                        }

                    })
                },
                function (error) {
                    $log.info("ERROR -> ", error);
                    // onlineStorePouchdb.pouchdb.deleteDataBase();
                });
    }
    ;
    getAllExpenses();

    /**
     *  from scope, updtes profile
     *  data sent as FormData
     *  
     *  @returns {Boolean}
     */
   
    $scope.addExpenses = function () {

        if (!$scope.data.expenseId) {

            onlineStorePopup.showAlert("Error", "expenseId is empty");
            return false;
        }

        if (!$scope.data.expenseType) {
            onlineStorePopup.showAlert("Error", "type is empty");
            return false;
        }



        var expenseObj = {
            'expenseId': $scope.data.expenseId,
            'expenseType': $scope.data.expenseType

        }
        var data = {
            _id: new Date().toISOString(),
            expenseslist: expenseObj

        };
        onlineStorePouchdb.pouchdb.setUserData(data).then(
                function (response) {
                    $log.info("SUCCESS ->", response);
                    onlineStorePouchdb.pouchdb.getUserData().then(
                            function (response) {
                                $log.info("SUCCESS ->", response.rows);
                                $scope.data={};

                                angular.forEach(response.rows, function (event, index) {
                                    if (event.doc.expenseslist) {
                                        var expense = event.doc.expenseslist;
                                        $scope.expenseslist.push(expense);
                                        $log.info("expenseslist", $scope.expenseslist);
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
                    if (error.name === "conflict") {

                    }
                    // onlineStorePouchdb.pouchdb.deleteDataBase();
                });


    };
    $scope.resetExpenses = function () {
        $scope.data = {};
    };

        $scope.removeExpense = function (index) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remove',
            template: 'Are You Sure Want to Delete Expense?',
            okText: 'Yes',
            cancelText: 'No'
        });

        confirmPopup.then(function (res) {
           $log.info("ExpenseId", index);
        $scope.expenses.splice(index, 1);
        });
        
    };


});