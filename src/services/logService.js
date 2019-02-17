

function init () {
	// Sentry.init({
	//  	dsn: "https://8f85c2ffaaf046f48e607ffc3b07e1e9@sentry.io/1308953"
	// });
}

function log (error) {
	console.log(error)
	// Sentry.captureException(error);
}

export default {
	init,
	log
}