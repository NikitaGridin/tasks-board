'use client'

import { useProjectDetailsStore } from './_model/use-project-details-store'
import { Boards } from './_ui/boards'
import { Columns } from './_ui/columns'

export const ProjectDetails = ({ projectId }: { projectId: number }) => {
	const { selectedBoard } = useProjectDetailsStore()

	return (
		<div className='space-y-2'>
			<Boards projectId={projectId} />
			{selectedBoard && <Columns boardId={selectedBoard} />}
		</div>
	)
}
