/*Angular App,Cordova */
app.controller('SalesreturnController', function($rootScope, $scope, $ionicActionSheet, $log, onlineStoreData, onlineStorePopup,
                            onlineStorePouchdb){

  $scope.data = {};
    var imageEncoded;
     $scope.picture = "assets/img/ionic.png";
    var oldImage = $scope.picture;

   
    /**
     *  from scope, updtes profile
     *  data sent as FormData
     *  
     *  @returns {Boolean}
     */
    $scope.addSalesReturn = function () {

        if ($scope.picture !== oldImage) {
            $scope.data.file = $scope.picture;
        }
        if (!$scope.data.name) {
            onlineStorePopup.showAlert("Error", "Name is empty");
            return false;
        }

        if (!$scope.data.date) {

            onlineStorePopup.showAlert("Error", "Date  is empty");
            return false;
        }

        if (!$scope.data.totalamount) {

            onlineStorePopup.showAlert("Error", "Total amount is empty");
            return false;
        }

        if (!$scope.data.receivedamount) {

            onlineStorePopup.showAlert("Error", "Received amount is empty");
            return false;
        }       

        var salesreturnObj = {
                'name': $scope.data.name,
                'date': $scope.data.date,
                'totalamount': $scope.data.totalamount,
                'receivedamount': $scope.data.receivedamount,
                'description': $scope.data.description,
               
                          
        }
        $log.info(salesreturnObj);
        var data = {
           _id: new Date().toISOString(),
            salesreturn: salesreturnObj

        };
        onlineStorePouchdb.pouchdb.setUserData(data).then(
                function (response) {
                    $log.info("SUCCESS ->", response);
                    $scope.data={};
                },
                function (error) {
                    $log.info("ERROR -> ", error);
                    // onlineStorePouchdb.pouchdb.deleteDataBase();
                });


    };

    $scope.showActionsheet = function () {

        $ionicActionSheet.show({
            titleText: 'Open',
            buttons: [
                { text: '<i class="icon ion-camera"></i> Camera' },
                { text: '<i class="icon ion-folder"></i> Gallery' }
            ],
            cancelText: 'cancel',
            cancel: function () {
                $log.log('CANCELLED');
            },
            buttonClicked: function (index) {
                if (index === 0) {
                    takePicture();
                    return true;
                }
                if (index === 1) {
                    getPicture();
                    return true;
                }
            }

        });
    };
    var takePicture = function () {

        var options = {
            quality: 100,
            targetWidth: 1920,
            targetHeight: 1080,
            sourceType: 1,
            correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL
        };
        navigator.camera.getPicture(onSuccess, onFail, options);
        $rootScope.$broadcast('loading:show');
        function onSuccess(imageData) {

            var picture;
            var testImage = new Image();

            $timeout(function () {
                picture = "data:image/jpeg;base64," + imageData;
                testImage.src = picture;

            });



            testImage.onload = function () {
                $log.log(testImage.width + ", " + testImage.height);
                $log.log("natural", testImage.naturalWidth + ", " + testImage.naturalHeight);
                $rootScope.$broadcast('loading:hide');
                if (testImage.width >= 580 && testImage.height >= 580) {

                    imageEncoded = imageData;
                    $scope.picture = testImage.src;

                } else {

                    toastr.error("image not upload", "Error");
                }
            };


        }

        function onFail(message) {
            $rootScope.$broadcast('loading:hide');
            toastr.error("upload cancel", 'Error');
        }
    };


    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

    var getPicture = function () {

        var options = {
            quality: 100,
            targetWidth: 1920,
            targetHeight: 1080,
            sourceType: 0,
            correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL
        };
        $rootScope.$broadcast('loading:show');
        navigator.camera.getPicture(onSuccess, onFail, options);
        function onSuccess(imageData) {

            var picture;
            var testImage = new Image();

            $timeout(function () {
                picture = "data:image/jpeg;base64," + imageData;
                testImage.src = picture;

            });



            testImage.onload = function () {

                $rootScope.$broadcast('loading:hide');
                $log.log(testImage.width + ", " + testImage.height);
                $log.log("natural", testImage.naturalWidth + ", " + testImage.naturalHeight);

                if (testImage.width >= 580 && testImage.height >= 580) {

                    imageEncoded = imageData;
                    $scope.picture = testImage.src;

                } else {

                    toastr.error("upload cancel", "Error");
                }
            };


        }

        function onFail(message) {
            toastr.error("upload cancel", 'Error');
            $rootScope.$broadcast('loading:hide');
        }

    };
    $scope.resetSalesReturn = function(){
        $scope.data = '';
    }



});