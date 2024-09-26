import { FullpageSpinner } from '@/shared/ui/full-page-spinner'
import { useRef } from 'react'
import { useUploadAvatar } from '../_model/use-upload-avatar'
import Image from 'next/image'

export function AvatarField({
	id,
	initialAvatar,
}: {
	id: number
	initialAvatar: string | null
}) {
	const { avatar, handleFileSelect, isPending } = useUploadAvatar(initialAvatar)
	console.log('аватар', avatar )

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
				src={`/api/image?key=${avatar}`}
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
