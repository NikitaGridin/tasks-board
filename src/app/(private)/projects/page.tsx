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
			<Header type={'menu'} />
			<Container>
				<ListProjects />
			</Container>
		</>
	)
}

export default WorkSpace
