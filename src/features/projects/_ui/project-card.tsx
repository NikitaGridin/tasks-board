'use client'

import { Button } from '@/shared/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export const ProjectCard = ({ id, name }: { id: number; name: string }) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const selectedProjectId = searchParams.get('projectId')

	const isSelected = id === Number(selectedProjectId)

	return (
		<Button
			onClick={() => router.replace(`?projectId=${id}`)}
			variant={isSelected ? 'default' : 'outline'}
			className='transition-none'
		>
			{name}
		</Button>
	)
}
