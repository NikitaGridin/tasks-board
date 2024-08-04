import { CustomError, ERROR_CODES } from './errors'

export function serverAction<T extends any[], U>(
	fn: (...args: T) => Promise<U>
): (
	...args: T
) => Promise<{ error?: { message: string; code: string }; data?: U }> {
	return async (...args: T) => {
		try {
			return { data: await fn(...args) }
		} catch (error: unknown) {
			if (error instanceof CustomError) {
				return new CustomError({
					message: error.error.message,
					code: error.error.code,
				}).toJson()
			}
			return new CustomError({
				message: 'Произошла ошибка',
				code: ERROR_CODES.UNKNOW_ERROR,
			}).toJson()
		}
	}
}
