

const failedLoginMessage = "Invalid token provided"

const userTokenValidator = Match.OneOf(
	Match.Where(str => Match.test(str, String) && str.length <=  256), {
		digest: Match.Where(str => Match.test(str, String) && str.length === 44),
		algorithm: Match.OneOf('sha-256')
	},
	{
		digest: Match.Where(str => Match.test(str, String) && str.length === 44),
		algorithm: Match.OneOf('sha-256'),
		encoding: Match.OneOf('base64')
	}
);

const getUserTokenString = userToken => {
	if (typeof userToken === "string") {
		userToken =  Accounts._hashLoginToken(userToken);
	} else { // 'password' is an object
		if (userToken.algorithm !== "sha-256") {
			throw new Error("Invalid password hash algorithm. " +
				"Only 'sha-256' is allowed.");
		}
		userToken = userToken.digest;
	}
	return userToken;
}


Accounts.registerLoginHandler("userToken", options=>{
	if(!options.userToken){
		return undefined;
	}
	check(options,
		{userToken: userTokenValidator}
	)
	const tokenString = getUserTokenString( options.userToken)
	const user = Meteor.users.findOne({"services.userToken.hashedToken":tokenString},{fields:{"_id":1}})
	if(user){
		return {
			userId: user._id
		}
	}
	throw new Meteor.Error(
		403,
		failedLoginMessage
	);

})


Accounts.setUserToken = (userId, token = undefined) => {
	check(userId, String)
	check(token,Match.OneOf(String,undefined))

	if(typeof token === "undefined"){
		const obj = Accounts._generateStampedLoginToken()
		token = obj.token
	}

	const user = Meteor.users.findOne({_id: userId},{fields:{_id:1}})
	if (!user) {
		throw new Meteor.Error(403, "User not found");
	}



	const update = {

		$set:{
			"services.resume.loginTokens":[],
			"services.userToken":{
				hashedToken: getUserTokenString(token),
				when: new Date()
			}
		}
	}
	Meteor.users.update({_id: user._id}, update);
	return token

}

Accounts.revokeUserToken = (userId)=>{
	check(userId, String)
	const update = {
		$set:{"services.resume.loginTokens":[]},
		$unset:{"services.userToken":null}
	}
	Meteor.users.update({_id:userId},update)
}
