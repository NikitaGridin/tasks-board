'use client'

import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { Skeleton } from '@/shared/ui/skeleton'
import { Plus } from 'lucide-react'
import { useColumns } from '../_model/use-columns'
import { FormCreateTask } from './form-create-task'
import { Tasks } from './tasks'

export const Columns = ({ boardId }: { boardId: number }) => {
	const { data, isLoading, isError } = useColumns({ boardId })

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
		<div className='overflow-x-auto'>
			<div className='flex gap-4 min-w-full'>
				{data.data.map((column) => {
					return (
						<div
							key={column.id}
							className='flex-shrink-0 w-full sm:w-[calc(50%)] lg:w-[calc(33%)] xl:w-[calc(25%)] bg-gray-100 p-4 rounded-lg h-[80vh] flex flex-col'
						>
							<div className='text-2xl font-semibold mb-2 flex justify-between'>
								<div>{column.name}</div>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											size={'icon'}
											variant={'outline'}
											className='rounded-full'
										>
											<Plus />
										</Button>
									</DialogTrigger>
									<DialogContent className='h-[100dvh] rounded-none border-none outline-none min-w-full'>
										<DialogHeader>
											<DialogTitle>Создание задачи</DialogTitle>
											<DialogDescription></DialogDescription>
										</DialogHeader>
										<FormCreateTask columnId={column.id} />
									</DialogContent>
								</Dialog>
							</div>
							<div className='overflow-y-auto flex-grow space-y-2'>
								<Tasks columnId={column.id} />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
