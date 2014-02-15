// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js



//assign the module to a variable - some would argue for / against this - i prefer it vs. chaining syntax. ymmv.
//
var favorsApp = angular.module('favorsApp', ['ionic', 'favorsApp.controllers','favorsApp.services'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('login',{
    url : "/login",
   controller : 'LoginController',
    templateUrl : 'templates/users/login.html'
  })
 
  .state('app',{
    url : "/home",
   controller : 'LoginController',
    templateUrl : 'templates/main.html'
  })
  
  .state('app.favors',{
    url : '/favors',
    templateUrl : 'templates/favors/favors-list.html',
    controller : 'FavorListController'
  })

  .state('app.newFavor',{
    url : '/newFavor',
    templateUrl : 'templates/favors/new.html',
    controller : 'FavorNewController'
  })

  .state('app.favors.detail',{
    url : '/:favorId',
    templateUrl : 'templates/favors/favor-detail.html',
    controller : 'FavorDetailController'
  })

  // .state('app.overview',{
  //   url : '/overview',
  //   templateUrl : 'templates/favors/favors-list.html'
  // })

  // .state('app.reports',{
  //   url : '/reports',
  //   templateUrl : 'templates/favors/favors-list.html'
  // })

    


})

.run(function($state,UserAuth){

  UserAuth.getLoggedInUser().then(function(user){

    if(user){

        $state.transitionTo('app.favors')
    }
    else{

      $state.transitionTo('login')
    }

  })

})
