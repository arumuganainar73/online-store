/**
 * angular.module is a global place for creating, registering and retrieving Angular modules
 * 'almaxmais-ecom' is the name of this angular module example (also set in a <body> attribute in index.html)
 * the 2nd parameter is an array of 'requires'
 * 
 * @type angular.module.angular-1_3_6_L1749.moduleInstance
 */

var app = angular.module('online-store', ['ionic', "xeditable"]);

app.constant('CONFIG', { 
// The url of your domain,
    siteUrl: "",

    /**
     * toggle for developer mode
     */
    debuggerMode: true ,
    
    pouchdbDebuggerMode: true
});