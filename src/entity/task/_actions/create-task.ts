'use server'

import { getSessionStrictServer } from '@/entity/user/session.server'
import { CustomError, ERROR_CODES } from '@/shared/lib/errors'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'

export const createTask = serverAction(
	async ({
		title,
		content,
		columnId,
	}: {
		title: string
		content: string
		columnId: number
	}): Promise<{
		id: number
		name: string
		authorId: number
		columnId: number
	}> => {
		const session = await getSessionStrictServer()
		if (session.error) {
			throw new CustomError({
				message: session.error.message,
				code: session.error.code,
			})
		}
		if (!session.data) {
			throw new CustomError({
				message: 'Сессия не установлена',
				code: ERROR_CODES.UNOTHORIZED,
			})
		}
		const author = await prisma.user.findUnique({
			where: { id: session.data.id },
		})

		if (!author) {
			throw new CustomError({
				message: 'Автор задачи не найден',
				code: ERROR_CODES.NOT_FOUND,
			})
		}
		const column = await prisma.column.findUnique({
			where: { id: columnId },
		})

		if (!column) {
			throw new CustomError({
				message: 'Автор задачи не найден',
				code: ERROR_CODES.NOT_FOUND,
			})
		}

		const task = await prisma.task.create({
			data: {
				title,
				content,
				userId: author.id,
				column: {
					connect: { id: column.id },
				},
			},
		})

		return {
			id: task.id,
			name: task.title,
			authorId: task.userId,
			columnId: task.columnId,
		}
	}
)
