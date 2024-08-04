'use server'

import { CustomError, ERROR_CODES } from '@/shared/lib/errors'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'

export const createProject = serverAction(
	async ({
		name,
		authorId,
	}: {
		name: string
		authorId: number
	}): Promise<{
		id: number
		name: string
		authorId: number
	}> => {
		const author = await prisma.user.findUnique({
			where: { id: authorId },
		})

		if (!author) {
			throw new CustomError({
				message: 'Автор проекта не найден',
				code: ERROR_CODES.NOT_FOUND,
			})
		}

		const project = await prisma.project.create({
			data: {
				name,
				author: {
					connect: { id: authorId },
				},
			},
		})

		return {
			id: project.id,
			name: project.name,
			authorId: project.authorId,
		}
	}
)
