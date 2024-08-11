import { getServerSession } from '@/entity/user/session.server'
import { FormUpdateUser } from '@/features/update-user/form-update-user'
import { routes } from '@/shared/config/routes'
import { Container } from '@/shared/ui/container'
import { Header } from '@/widgets/header/header'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Мой профиль',
}

async function ProfilePage({ params }: { params: { id: string } }) {
	const session = await getServerSession()

	if (!session.data) redirect(routes.LOGIN)
	const isMyProfile = session.data.id === +params.id
	if (!isMyProfile) redirect(`${routes.PROFILE}/${session.data.id}`)

	return (
		<>
			<Header
				type={'back'}
				centerContent={<div className='text-2xl font-bold'>Профиль</div>}
			/>
			<Container>
				<FormUpdateUser
					id={session.data.id}
					phone={session.data.phone}
					avatar={session.data.avatar}
					name={session.data.name}
				/>
			</Container>
		</>
	)
}

export default ProfilePage
