'use server'

import { getServerSession } from '@/entity/user/session.server'
import { CustomError, ERROR_CODES } from '@/shared/lib/errors'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'
import { ProjectDetails } from '../_domain/types'

export const getProject = serverAction(
	async ({ projectId }: { projectId: number }): Promise<ProjectDetails> => {
		const session = await getServerSession()
		if (session.error) {
			throw new CustomError({
				message: session.error.message,
				code: session.error.code,
			})
		}
		if (!session.data) {
			throw new CustomError({
				message: 'Нет данных о сесии',
				code: ERROR_CODES.UNOTHORIZED,
			})
		}

		const project = await prisma.project.findFirst({
			where: {
				OR: [
					{ authorId: session.data.id },
					{ members: { some: { id: session.data.id } } },
				],
				id: projectId,
			},
		})
		if (!project) {
			throw new CustomError({
				message: 'Проект не найден',
				code: ERROR_CODES.NOT_FOUND,
			})
		}
		return project
	}
)
