'use client'

import { Skeleton } from '@/shared/ui/skeleton'
import { ChevronRight } from 'lucide-react'
import { useTasks } from '../_model/use-tasks'

export const Tasks = ({ columnId }: { columnId: number }) => {
	const { data, isLoading, isError } = useTasks({ columnId })

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
		<div className='grid gap-2'>
			{data.data.map((task) => {
				return (
					<div
						key={task.id}
						className='bg-white p-2 rounded-lg flex justify-between'
					>
						<div className='font-semibold'>{task.title}</div>
						<ChevronRight />
					</div>
				)
			})}
		</div>
	)
}
