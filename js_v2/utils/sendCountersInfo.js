import { getCookie } from './getCookie.js'

const send = ({ subId, tag, value }) => {
	const url = `/?_update_tokens=1&sub_id=${subId}&${tag}=${value}`
	fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	})
		.then(() => {
			console.log(`${tag} sended - ${value}.`)
		})
		.catch(e => console.log(e))
}

export const sendCountersInfoInterval = ({ subId }) => {
	let fbp,
		fbc,
		ga = null

	let fbpSended,
		fbcSended,
		gaSended = false

	let interval = setInterval(async () => {
		fbp = await getCookie('_fbp')
		fbc = await getCookie('_fbc')
		ga = await getCookie('_ga')

		if (ga && !gaSended) {
			send({ subId: subId, tag: 'sub_id_15', value: ga })
			gaSended = true
		}

		if (fbc && !fbcSended) {
			send({ subId: subId, tag: 'sub_id_11', value: fbc })
			fbcSended = true
		}

		if (fbp && !fbpSended) {
			send({ subId: subId, tag: 'sub_id_10', value: fbp })
			fbpSended = true
		}

		if (fbpSended === true && fbcSended === true && gaSended === true) {
			clearInterval(interval)
		}
	}, 1000)
}
