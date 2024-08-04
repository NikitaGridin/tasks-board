'use server'

import { CustomError, ERROR_CODES } from '@/shared/lib/errors'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'
import { Board } from '../_domain/types'

export const getBoards = serverAction(
	async ({ projectId }: { projectId: number }): Promise<Board[]> => {
		const boards = await prisma.board.findMany({
			where: {
				projectId,
			},
		})
		if (!boards) {
			throw new CustomError({
				message: 'Колонки не найдены',
				code: ERROR_CODES.NOT_FOUND,
			})
		}
		return boards
	}
)
