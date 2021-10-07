
Package.describe({
	name: 'unparallel:accounts-user-token',
	summary: "Login service for user token",
	version: "1.0.1",
  // Brief, one-line summary of the package.
  summary: 'Package which allows to authenticate a meteor user using a login token',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/unparallel-innovation/accounts-user-token',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(api => {
	api.versionsFrom('1.10');
	api.use(['ecmascript@0.14.3','accounts-base@1.6.0 || 2.1.0','sha@1.0.9','ddp@1.4.0','ejson@1.1.1'], ['client', 'server']);
	// Export Accounts (etc) to packages using this one.
	api.imply('accounts-base@1.6.0 || 2.1.0', ['client', 'server']);
	api.use('check@1.3.1', 'server');
	api.addFiles("userTokenClient.js","client");
	api.addFiles("userTokenServer.js","server");
})
