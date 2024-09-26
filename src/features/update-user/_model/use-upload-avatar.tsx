import { uploadAvatar } from '@/entity/user/user'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export const useUploadAvatar = (initialAvatar: string | null) => {
	const [avatar, setAvatar] = useState<string | null>(initialAvatar)
	const { mutateAsync, isPending } = useMutation({
		mutationFn: uploadAvatar,
		onSuccess: (data) => {
			if (data.error) return
			const newAvatarUrl = `${data.data?.avatar}`
			setAvatar(newAvatarUrl)
		},
	})

	const handleFileSelect = async ({
		id,
		file,
	}: {
		id: number
		file: File | undefined
	}) => {
		if (!file) return
		const formData = new FormData()

		formData.set('avatar', file)

		await mutateAsync({ id, formData })
	}

	return {
		avatar,
		isPending,
		handleFileSelect,
	}
}
