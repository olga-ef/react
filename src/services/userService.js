import http from './httpService.js';

const apiEndpoint = '/users';

export function register (user) {
	return http.post(apiEndpoint, {
		email: user.username,
		password: user.password,
		name: user.name
	});
}