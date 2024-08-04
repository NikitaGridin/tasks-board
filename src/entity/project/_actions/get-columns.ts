'use server'

import { CustomError, ERROR_CODES } from '@/shared/lib/errors'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'
import { Column } from '../_domain/types'

export const getColumns = serverAction(
	async ({ boardId }: { boardId: number }): Promise<Column[]> => {
		const columns = await prisma.column.findMany({
			where: {
				boardId,
			},
		})
		if (!columns) {
			throw new CustomError({
				message: 'Колонки не найдены',
				code: ERROR_CODES.NOT_FOUND,
			})
		}
		return columns
	}
)
