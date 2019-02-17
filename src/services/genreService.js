import http from './httpService.js'

export function getGenres() {
	return http.get('/genres')
}