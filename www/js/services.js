angular.module('favorsApp.services',['firebase'])


.value('fireBaseUrl',"https://torid-fire-4559.firebaseio.com/")



//our wrapper around the main firebase reference. this is probably overkill, but it helps understand how services interoperate..
.factory('FireBase',function($firebase,fireBaseUrl){

  //private ref to firebase
  var fireBase = new Firebase(fireBaseUrl);


  //return it 
  return fireBase;


})


//our User Authentication service, which encapsulates auth state and provides our public API for login/etc.

.factory('UserAuth',function($q,$state,$rootScope,FireBase,$firebaseSimpleLogin,$ionicModal){


  //private storage of our firebase auth object
  var firebaseAuth = $firebaseSimpleLogin(FireBase);

  //this should return a promise
  function logIntoFireBase(userData){

      //create our own promise
    var deferred = $q.defer()

    //handle succesful login
    function onLoginSuccess(user){

      //do some other stuff if you want
      console.log('logged in!')

      
      deferred.resolve(user)

    }

    //handle error 
    function onLoginError(err){
       console.log(err)
      deferred.reject(err)
    }

  
    //login against firebase
    firebaseAuth.$login('password',{email : userData.email, password : userData.password}).then(onLoginSuccess,onLoginError)


    //immediately return the promise;
    return deferred.promise;

  }








  //should also return a promise
  function registerNewUser(userObject){

    //simple, no need to create our own promise

    return firebaseAuth.$createUser(userObject.email, userObject.password, true)

  }


  return {

    user : firebaseAuth.user,
    login : logIntoFireBase,
    register : registerNewUser,
    getLoggedInUser : firebaseAuth.$getCurrentUser

  }

})



.factory('FavorStore',function($q,$firebase,FireBase,UserAuth,fireBaseUrl){


    var deferredStore = $q.defer()

    var user = UserAuth.getLoggedInUser()

  
    user.then(function(user){

      var userPath = 'users/' + user.id + '/favors'

      var userStore = new Firebase(fireBaseUrl + userPath)

      deferredStore.resolve($firebase(userStore))
    })
    

    return deferredStore.promise;





})