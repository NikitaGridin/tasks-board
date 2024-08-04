'use client'

import { Button } from '@/shared/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export const ColumnCard = ({
	columnId,
	name,
	projectId,
}: {
	columnId: number
	name: string
	projectId: number
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const selectedColumnId = searchParams.get('columnId')

	const isSelected = columnId === Number(selectedColumnId)

	return (
		<Button
			onClick={() =>
				router.replace(`?projectId=${projectId}&columnId=${columnId}`)
			}
			variant={isSelected ? 'default' : 'outline'}
			className='transition-none'
		>
			{name}
		</Button>
	)
}
