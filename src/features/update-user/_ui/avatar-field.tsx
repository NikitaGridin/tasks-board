import { FullpageSpinner } from '@/shared/ui/full-page-spinner'
import Image from 'next/image'
import { useRef } from 'react'
import { useUploadAvatar } from '../_model/use-upload-avatar'

export function AvatarField({
	id,
	initialAvatar,
}: {
	id: number
	initialAvatar: string | null
}) {
	const { avatar, handleFileSelect, isPending } = useUploadAvatar(initialAvatar)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageClick = () => {
		fileInputRef.current?.click()
	}

	if (isPending) {
		return <FullpageSpinner />
	}
console.log(initialAvatar)
	return (
		<div className='relative'>
			<Image
				src={avatar ?? '/anonim.jpg'}
				alt={''}
				width={400}
				height={400}
				className='w-full h-96 object-cover rounded-lg cursor-pointer'
				onClick={handleImageClick}
			/>
			<input
				type='file'
				name='file'
				ref={fileInputRef}
				className='hidden'
				onChange={(e) => handleFileSelect({ file: e.target.files?.[0], id })}
			/>
		</div>
	)
}
