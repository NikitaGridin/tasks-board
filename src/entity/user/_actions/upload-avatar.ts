'use server'
import { CustomError, ERROR_CODES } from '@/shared/lib/errors'
import { prisma } from '@/shared/lib/prisma'
import { serverAction } from '@/shared/lib/server-action'
import crypto from 'crypto'
import { unlink, writeFile } from 'fs/promises'
import path from 'path'

export const uploadAvatar = serverAction(
	async ({
		id,
		formData,
	}: {
		id: number
		formData: FormData
	}): Promise<{ avatar: string }> => {
		const avatar = formData.get('avatar') as File
		if (!avatar)
			throw new CustomError({
				message: 'Фото не обнаружено',
				code: ERROR_CODES.BAD_REQUEST,
			})

		const maxSize = 5 * 1024 * 1024
		if (avatar.size > maxSize) {
			throw new CustomError({
				message: 'Фотография не может быть больше 5МБ',
				code: ERROR_CODES.BAD_REQUEST,
			})
		}

		const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
		if (!allowedTypes.includes(avatar.type)) {
			throw new CustomError({
				message: 'Разрешённые типы файлов - png, jpg, jpeg',
				code: ERROR_CODES.BAD_REQUEST,
			})
		}

		const extension = path.extname(avatar.name)
		const randomName = `${crypto.randomBytes(16).toString('hex')}${extension}`

		const bytes = await avatar.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const rootDir = process.cwd()
		const avatarsDir = path.join(rootDir, 'public', 'avatars')
		const filePath = path.join(avatarsDir, randomName)

		const user = await prisma.user.findUnique({
			where: { id },
			select: { avatar: true },
		})

		if (user?.avatar) {
			const oldFilePath = path.join(avatarsDir, user.avatar)
			try {
				await unlink(oldFilePath)
			} catch (error) {
				console.error(`Failed to delete old avatar: ${error}`)
			}
		}

		await writeFile(filePath, buffer)

		await prisma.user.update({
			where: { id },
			data: {
				avatar: randomName,
			},
		})
		return { avatar: randomName }
	}
)
