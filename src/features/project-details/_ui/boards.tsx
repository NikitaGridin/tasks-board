'use client'

import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import { useBoards } from '../_model/use-boards'
import { useProjectDetailsStore } from '../_model/use-project-details-store'

export const Boards = ({ projectId }: { projectId: number }) => {
	const { selectedBoard, setSelectedBoard } = useProjectDetailsStore()

	const { data, isLoading, isError } = useBoards({ projectId })

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
		<div className='flex items-center gap-2 overflow-auto'>
			{data.data.map((board) => {
				return (
					<Button
						variant={selectedBoard === board.id ? 'default' : 'outline'}
						className='font-semibold'
						key={board.id}
						onClick={() => setSelectedBoard(board.id)}
					>
						{board.name}
					</Button>
				)
			})}
		</div>
	)
}
