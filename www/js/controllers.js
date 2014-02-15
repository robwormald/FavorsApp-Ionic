angular.module('favorsApp.controllers', ['favorsApp.services','ionic'])


favorsApp.controller('LoginController',function($scope,$state,UserAuth){

   $scope.userObject = {}


  $scope.login = function(){

    UserAuth.login($scope.userObject).then(function(user){

      $state.transitionTo('app.favors')

    },function(err){

     if(err.code == 'INVALID_EMAIL'){

     }

     if(err.code == 'INVALID_USER'){
      $scope.userObject.unregistered = true
    }

  })
  }


  $scope.register = function(){
    UserAuth.register($scope.userObject).then(function(user){

      $state.transitionTo('app.favors')
    })

  }

})



favorsApp.controller('FavorListController',function($scope,FavorStore){

  FavorStore.then(function(store){
    $scope.favors = store;

  })


  
 


})


favorsApp.controller('FavorNewController',function($scope,$state,FavorStore){

   FavorStore.then(function(store){
    $scope.favors = store;
    console.log($scope.favors)
  })

   $scope.newFavor = {}

   $scope.saveNewFavor = function(){

    $scope.newFavor.date = new Date()

    $scope.favors.$add($scope.newFavor)

    $state.transitionTo('app.favors')

   }

})


favorsApp.controller('FavorDetailController',function($scope){
  
})
