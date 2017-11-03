module.exports = {
	name: 'Holospace-API',
	version: '1.0.0',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://admin:password@ds119585.mlab.com:19585/tapp',
	}
};
