// config used by store client side only
module.exports = {
	// store UI language
	language: 'en',

	// used by Store (server side)
	apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api/v1',

	// used by Store (server and client side)
	ajaxBaseUrl: process.env.AJAX_BASE_URL || 'http://localhost:3001/ajax',

	storeListenPort: process.env.STORE_PORT || 3000,

	// key to sign tokens
	jwtSecretKey: 'SP69kXFR3znRi7kL8Max2GTB24wOtEQj',

	// key to sign store cookies
	cookieSecretKey: '123'
};
