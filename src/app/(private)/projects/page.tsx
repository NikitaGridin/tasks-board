import { ListProjects } from '@/features/projects/list-projects'
import { Container } from '@/shared/ui/container'
import { Header } from '@/widgets/header/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Проекты',
}

function WorkSpace() {
	return (
		<>
			<Header
				type={'menu'}
				centerContent={<div className='text-2xl font-bold'>Проекты</div>}
			/>
			<Container>
				<ListProjects />
			</Container>
		</>
	)
}

export default WorkSpace
