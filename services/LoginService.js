var LoginService = timeManager.factory('LoginService', function(){
	
	let auth = {};

	auth.logIn = function(username, password){
		if(username === 'admin@admin.com' && password === 'admin')
			return true;
	}

	auth.logOut = function(username, password){
		return true;
	}

	return auth;
})