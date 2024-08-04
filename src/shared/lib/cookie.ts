import { cookies } from 'next/headers'

export const cookie = {
	set: function ({ key, value }: { key: string; value: string }) {
		const cookie = cookies()
		return cookie.set(key, value)
	},
	get: function ({ key }: { key: string }) {
		const cookie = cookies()
		return cookie.get(key)
	},
	remove: function ({ key }: { key: string }) {
		const cookie = cookies()
		return cookie.delete(key)
	},
}
