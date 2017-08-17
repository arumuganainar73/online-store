// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var database = new PouchDB("onlinestore");
app.run(function ($ionicPlatform, $ionicLoading, $rootScope, $timeout) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('loading:show', function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-assertive"></ion-spinner>',
      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,
      // The delay in showing the indicator
      showDelay: 1,
    });
  });
  $rootScope.$on('loading:hide', function () {
    $timeout(function () {
      $ionicLoading.hide();
    });
  });

})
app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('login');
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'assets/templates/login.html',
      controller: 'LoginController'
    })
     .state('forgetpassword', {
      url: '/forgetpassword',   
      templateUrl: 'assets/templates/forgetpassword.html',
      controller: 'ForgetPasswordController'
        
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'assets/templates/menu.html',
      controller: 'AppController'
    })
    .state('app.home', {
      url: '/home',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('app.accounts', {
      url: '/accounts',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/accounts.html',
          controller: 'AccountsController'
        }
      }
    })
    .state('app.additem', {
      url: '/additem',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/additem.html',
          controller: 'AdditemController'
        }
      }
    })
    .state('app.customer', {
      url: '/customer',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/customer.html',
          controller: 'CustomerController'
        }
      }
    })
    .state('app.supplier', {
      url: '/supplier',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/supplier.html',
          controller: 'SupplierController'
        }
      }
    })
    .state('app.reports', {
      url: '/reports',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/reports.html',
          controller: 'ReportController'
        }
      }
    })
    .state('app.salesreport', {
      url: '/salesreport',
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/salesreport.html',
          controller: 'SalesReportController'
        }
      }
    })
    .state('app.bill', {
      url: '/bill',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/bill.html',
          controller: 'BillController'
        }
      }
    })
    .state('app.setting', {
      url: '/setting',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/setting.html',
          controller: 'SettingController'
        }
      }
    })
    .state('app.addexpense', {
      url: '/addexpense',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/addexpense.html',
          controller: 'AddExpenseController'
        }
      }
    })
    .state('app.itemlist', {
      url: '/itemlist',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/itemlist.html',
          controller: 'ItemlistController'
        }
      }
    })
        .state('app.transaction', {
      url: '/transaction',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/transaction.html',
          controller: 'TransactionController'
        }
      }
    })
       .state('app.purchase', {
      url: '/purchase',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/purchase.html',
          controller: 'PurchaseController'
        }
      }
    })
     .state('app.purchasereturn', {
      url: '/purchasereturn',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/purchasereturn.html',
          controller: 'PurchasereturnController'
        }
      }
    })
    .state('app.sales', {
      url: '/sales',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/sales.html',
          controller: 'SalesController'
        }
      }
    })
    
       .state('app.salesreturn', {
      url: '/salesreturn',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/salesreturn.html',
          controller: 'SalesreturnController'
        }
      }
    })
        .state('app.cashin', {
      url: '/cashin',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/cashin.html',
          controller: 'CashinController'
        }
      }
    })
        .state('app.cashout', {
      url: '/cashout',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/cashout.html',
          controller: 'CashoutController'
        }
      }
    })
    .state('app.expense', {
      url: '/expense',
      catch:false,
      views: {
        'menuContent': {
          templateUrl: 'assets/templates/expense.html',
          controller: 'ExpenseController'
        }
      }
    })
    

})