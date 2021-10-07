import crypto from 'crypto';

// Used in the various functions below to handle errors consistently

const reportError = (error, callback) => {
	if (callback) {
		callback(error);
	} else {
		throw error;
	}
};


const loginWithUserToken = (token, callback)=>{
	if(typeof token !== "string"){
		throw new Error("Token must be a string");
	}
	Accounts.callLoginMethod({
		methodArguments: [{
			userToken: Accounts._hashUserToken(token)
		}],
		userCallback: (error, result) => {
			if (error) {
				reportError(error, callback);
			} else {
				callback && callback(error,result);
			}
		}
	});
};


Accounts.registerClientLoginFunction('userToken', loginWithUserToken);
Meteor.loginWithUserToken =  (...args) => Accounts.applyLoginFunction('userToken', args);


Accounts._hashUserToken = token => {
	const hash = crypto.createHash('sha256');
	hash.update(token);
	return {
		digest: hash.digest('base64'),
		algorithm: "sha-256"
	}
}
