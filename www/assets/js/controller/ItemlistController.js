/*Angular App,Cordova */
app.controller('ItemlistController', function($rootScope, $scope, $log, $ionicPopup, onlineStoreData, onlineStorePouchdb, onlineStorePopup){

$scope.items = [];
 function getItemDetails(){
        onlineStorePouchdb.pouchdb.getUserData().then(
        function (response) {
            $log.info("SUCCESS ->", response.rows);

            angular.forEach(response.rows,function(event, index){
                if(event.doc.itemlist){
                    var img = event.doc._attachments;
                    $log.info("img", img);
                var item =event.doc.itemlist;
                $scope.items.push(item);
                 $log.info("itemlist", $scope.items);
                }
               
                
            })
        },
        function (error) {
            $log.info("ERROR -> ", error);
            // onlineStorePouchdb.pouchdb.deleteDataBase();
        });
    }
    getItemDetails();

    $scope.removeItem = function (index) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remove',
            template: 'Are You Sure Want to Delete Item?',
            okText: 'Yes',
            cancelText: 'No'
        });
        
        confirmPopup.then(function (res) {
           $log.info("ExpenseId", index);
        $scope.items.splice(index, 1);
        });
        
    };

});