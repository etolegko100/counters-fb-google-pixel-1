import { gtag } from './counters/gtag.js';
import { pixel } from './counters/pixel.js';
import { tiktok } from './counters/tiktok.js';
import { yaMetrica } from './counters/yaMetrica.js';
import { getCookie } from './utils/getCookie.js';
import { sendCountersInfoInterval } from './utils/sendCountersInfo.js';
(async () => {
	const pixid = await getCookie('sub5')
	const gua = await getCookie('sub4')
	const tpixid = await getCookie('sub2')
	const subId = (await getCookie('sub1')) || (await getCookie('_subid'))

	const fbPixelParams = [
		{ title: 'track', setting: 'Lead' },
	] 

	const _fbPixelParams = [{ title: 'init', setting: pixid }, ...fbPixelParams]

	const gtagParams = [
		{ title: 'event', setting: 'Lead' },
	]

	const _gtagParams = [
		{ title: 'js', setting: new Date() },
		{ title: 'config', setting: gua },
		...gtagParams,
	]

	await (() => {
		if (pixid) {
			pixel({
				params: _fbPixelParams,
			})
		}
		if (gua) {
			gtag({
				params: _gtagParams,
				gua: gua,
			})
		}
		if (tpixid) {
			tiktok({ tpixid: tpixid })
		}
	})()

	await sendCountersInfoInterval({
		subId: subId,
	})
})()
;(async () => {
	const cookieInfo = [
		{ name: 'sub1', value: '{subid}' },
		{ name: 'sub2', value: '{tpixid}' },
		{ name: 'sub3', value: '{ymc}' },
		{ name: 'sub4', value: '{gua}' },
		{ name: 'sub5', value: '{pixid}' },
	]
	await setupCookie({ cookieInfo })

	const ymc = await getCookie('sub3')

	const yaMetricaParams = {
		clickmap: true,
		trackLinks: true,
		accurateTrackBounce: true,
		webvisor: true,
	}

	if (ymc) {
		await yaMetrica({
			params: yaMetricaParams,
			ymc: ymc,
			type: 'init',
		})
	}
})()


