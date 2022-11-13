import { setCookie } from './setCookie.js'

export const setupCookie = ({ cookieInfo }) => {
	const cookieLiveTime = 3600 * 24

	for (let i = 0; i < cookieInfo.length; i++) {
		if (!cookieInfo[i].value.includes('{') === true) {
			setCookie(cookieInfo[i].name, cookieInfo[i].value, {
				secure: true,
				'max-age': cookieLiveTime,
			})
			console.log(
				`${cookieInfo[i].name} (${cookieInfo[i].value}) has ben saved.`
			)
		}
	}
}
