// config used by store client side only
module.exports = {
	// store UI language
	language: process.env.LANGUAGE || 'en',
	// used by Store (server side)
	ajaxBaseUrl: process.env.AJAX_BASE_URL || 'http://localhost:3001/ajax'
};
