'use client'

import { useUserProjects } from '@/entity/project/project'
import { routes } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import Link from 'next/link'

export const ListProjects = () => {
	const { data, isLoading, isError } = useUserProjects()

	if (isLoading) {
		return (
			<div className='grid gap-4'>
				{Array.from({ length: 10 }).map((_, i) => {
					return <Skeleton className='w-full h-14' key={i} />
				})}
			</div>
		)
	}

	if (isError) {
		return <div>Произошла ошибка</div>
	}

	if (!data) {
		return <div>Ошибка при получении данных</div>
	}
	if (data.error) {
		return <div>{data.error.message}</div>
	}
	if (!data.data) {
		return <div>Данные не получены</div>
	}

	return (
		<div className='space-y-4'>
			<h1 className='text-4xl font-bold'>Проекты ({data.data.length})</h1>
			<div className='grid gap-4'>
				{data.data.map((project) => {
					return (
						<Button
							key={project.id}
							className='text-2xl h-14 font-bold'
							variant={'outline'}
							asChild
						>
							<Link href={`${routes.PROJECT}/${project.id}`}>
								{project.name}
							</Link>
						</Button>
					)
				})}
			</div>
		</div>
	)
}
