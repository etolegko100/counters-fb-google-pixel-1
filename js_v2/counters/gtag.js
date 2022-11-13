import { getScript } from '../utils/getScript.js'

export const gtag = ({ params, gua }) => {
	try {
		getScript(`https://www.googletagmanager.com/gtag/js?id=${gua}`, () => {
			window.dataLayer = window.dataLayer || []
			function gtag() {
				dataLayer.push(arguments)
			}

			for (let i = 0; i < params.length; i++) {
				gtag(params[i].title, params[i].setting)
				console.log(`GTAG - ${params[i].title}-${params[i].setting} initiated.`)
			}
		})
	} catch (e) {
		console.log('GTAG Err.')
	}
}
