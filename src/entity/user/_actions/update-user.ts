'use server'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'

export const updateUser = serverAction(
	async ({
		id,
		phone,
		name,
	}: {
		id: number
		phone: string
		name: string
	}): Promise<{
		id: number
		phone: string
		password: string
	}> => {
		const updatedUser = await prisma.user.update({
			data: {
				phone,
				name,
			},
			where: {
				id,
			},
		})
		return updatedUser
	}
)
