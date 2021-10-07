
Package.describe({
	summary: "Login service for user token",
	version: "1.0.0",
  // Brief, one-line summary of the package.
  summary: 'Package which allows to authenticate a meteor user using a login token',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(api => {
	api.use(['ecmascript']);
	api.use(['accounts-base','sha','ddp','ejson'], ['client', 'server']);
	// Export Accounts (etc) to packages using this one.
	api.imply('accounts-base', ['client', 'server']);
	api.use('check', 'server');
	api.addFiles("userTokenClient.js","client");
	api.addFiles("userTokenServer.js","server");
})
