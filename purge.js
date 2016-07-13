var config = require('./secrets.js').cloudflare;

require('cloudflare-purge').purgeFile({
	zone: config.cloudflare.zoneid,
	file: config.cloudflare.domain,
	email: config.cloudflare.email,
	key: config.cloudflare.token,
});