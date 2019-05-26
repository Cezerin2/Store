// config used by store server side only
module.exports = {
	// store UI language
	language: process.env.LANGUAGE || 'en',
	// used by Store (server side)
	ajaxBaseUrl: process.env.AJAX_BASE_URL || 'http://localhost:3001/ajax',
	// used by Store (server side)
	apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api/v1',

	storeListenPort: process.env.STORE_PORT || 3000,

	// key to sign tokens
	jwtSecretKey: process.env.JWT_SECRET_KEY || '-',

	// key to sign store cookies
	cookieSecretKey: process.env.COOKIE_SECRET_KEY || '-'
};
