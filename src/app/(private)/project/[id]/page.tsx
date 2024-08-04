import { getProject } from '@/entity/project/project.server'
import { ProjectDetails } from '@/features/project-details/project'
import { Container } from '@/shared/ui/container'
import { Header } from '@/widgets/header/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Проект',
}

async function ProjectPage({ params }: { params: { id: string } }) {
	const project = await getProject({ projectId: +params.id })

	if (project.error) {
		return <div>{project.error.message}</div>
	}
	if (!project.data) {
		return <div>Проект не найден</div>
	}

	return (
		<>
			<Header
				type={'back'}
				centerContent={
					<div className='text-2xl font-bold'>{project.data.name}</div>
				}
			/>
			<Container>
				<ProjectDetails projectId={+params.id} />
			</Container>
		</>
	)
}

export default ProjectPage
