'use server'
import { CustomError, ERROR_CODES } from '@/shared/lib/errors'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'
import { checkPassword, hashPassword } from '../_domain/password'
import { setSession } from './session'

export const login = serverAction(
	async ({
		phone,
		password,
	}: {
		phone: string
		password: string
	}): Promise<void> => {
		const exsistUser = await prisma.user.findFirst({
			where: {
				phone,
			},
		})
		if (!exsistUser) {
			const hashedPassword = await hashPassword({ password })
			const newUser = await prisma.user.create({
				data: {
					phone,
					password: hashedPassword,
				},
			})
			setSession({ data: { id: newUser.id, phone: newUser.phone } })
		} else {
			const verifyPassword = await checkPassword({
				password,
				hashedPassword: exsistUser.password,
			})

			if (!verifyPassword) {
				throw new CustomError({
					message: 'Данные неверны',
					code: ERROR_CODES.INCORRECT_AUTH_DATA,
				})
			}

			setSession({ data: { id: exsistUser.id, phone: exsistUser.phone } })
		}
	}
)
