export const setCookie = (name, value, options = {}) => {
	options = {
		path: '/',
		...options,
	}

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString()
	}

	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

	for (let optionKey in options) {
		updatedCookie += '; ' + optionKey
		let optionValue = options[optionKey]
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue
		}
	}

	document.cookie = updatedCookie
}

// Пример использования:
// setCookie('user', 'John', { secure: true, 'max-age': 3600 })
