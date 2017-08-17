 /*global angular, cordova, app, PouchDB */
app.factory('onlineStorePouchdb', function($q, $log, $rootScope){

    var _pouchdb = {
        databaseInfo: function() {
            return database.info().then(function(info) {
                $log.info("DATABASE DETAILS", + info);
            })
        },
        getUserData: function(path) {
           var deferred = $q.defer();
           database.allDocs({include_docs: true}).then(
                function (success) {
                $log.info("Document", success.rows);
                deferred.resolve(success);
                },function (err) {
                $log.error(err);
                 deferred.reject(err);
            });
             return deferred.promise;

        },
        setUserData: function(data) {
            var deferred = $q.defer();
            // database.bulkDocs(data).then(function (success) {
            //      deferred.resolve(success);
            //     },function (err) {
            //     console.log(err);
            //      deferred.reject(error);
            // });
            if(!data._id){
            database.post(data).then(function(response) {
                deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });
            }else{
                database.put(data).then(function(response) {
                deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });
            }

            return deferred.promise;
        },
        removeUserData: function(path) {
            return database.remove(path);
        },
         deleteDataBase: function() {
            return database.destroy();
        },
    }

    return {
        pouchdb: _pouchdb,

    };


});

