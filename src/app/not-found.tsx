import { routes } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex items-center justify-center h-[100dvh]'>
			<div className='text-center p-8 bg-white rounded-lg shadow-lg border'>
				<h1 className='text-6xl font-bold mb-4'>404</h1>
				<div className='text-xl text-gray-700 mb-6'>Страница не найдена</div>
				<Button asChild className='text-2xl h-14 font-semibold'>
					<Link href={routes.MAIN}>На главную</Link>
				</Button>
			</div>
		</div>
	)
}
