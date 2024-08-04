import { FormLogin } from '@/features/auth/form-login'
import { Container } from '@/shared/ui/container'

function LoginPage() {
	return (
		<Container>
			<div className='flex items-center justify-center flex-col h-[100dvh]'>
				<div className='space-y-2 max-w-[600px] w-full'>
					<h1 className='text-6xl font-bold'>Вход</h1>
					<FormLogin />
				</div>
			</div>
		</Container>
	)
}

export default LoginPage
