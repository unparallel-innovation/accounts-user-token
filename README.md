# Accounts user token

This packages provides Meteor methods allowing:
* Register a token to a user
* Login using a user token
* Revoke user token

## Register user token

To register a new or a existing a token to a user the following server side method is provided

```js
// If a token is not specified a new one will be generated
const newToken = Accounts.setUserToken(userId)

// Is possible to define a known token to a user

Accounts.setUserToken(userId, userToken)

```

## Login using a user token

To login using a token the following client side method is provided

```js
Meteor.loginWithUserToken(userToken,(err,res)=>{
    if(err){
	    // If the login failed
        console.error(err)
    }else{
	    // If the login was successfully
        console.log(res)
    }
})

```

## Revoke user token

This method removes the user token, logging out all the users, this methods must be executed on server side

**note:** If a user was logged in using another method (ex username/ password) it will be also logged out

```js

Accounts.revokeUserToken(userId)

```
