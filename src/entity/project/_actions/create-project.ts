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
		// Проверка наличия автора проекта
		const author = await prisma.user.findUnique({
			where: { id: authorId },
		})

		if (!author) {
			throw new CustomError({
				message: 'Автор проекта не найден',
				code: ERROR_CODES.NOT_FOUND,
			})
		}

		// Создание проекта
		const project = await prisma.project.create({
			data: {
				name,
				author: {
					connect: { id: authorId },
				},
			},
		})

		// Создание доски для проекта
		const board = await prisma.board.create({
			data: {
				project: {
					connect: {
						id: project.id,
					},
				},
				name: 'Главная',
			},
		})

		// Создание трех колонок: Ожидание, В работе, Готово
		const columns = await prisma.column.createMany({
			data: [
				{
					boardId: board.id,
					name: 'Ожидание',
				},
				{
					boardId: board.id,
					name: 'В работе',
				},
				{
					boardId: board.id,
					name: 'Готово',
				},
			],
		})

		return {
			id: project.id,
			name: project.name,
			authorId: project.authorId,
		}
	}
)
