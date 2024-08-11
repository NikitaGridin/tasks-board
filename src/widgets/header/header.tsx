'use client'
import { routes } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { Container } from '@/shared/ui/container'
import { ArrowLeft, User2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Menu } from './_ui/menu'

export const Header = ({
	centerContent,
	rightContent,
	type,
}: {
	centerContent?: ReactNode
	rightContent?: ReactNode
	type: 'menu' | 'back' | 'public'
}) => {
	const router = useRouter()

	return (
		<header className='shadow-md mb-4'>
			<Container>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center justify-center gap-4'>
						<div>
							{type === 'public' && (
								<Link href={routes.MAIN} className='text-2xl font-extrabold'>
									WT BOARD
								</Link>
							)}

							{type === 'menu' && <Menu />}
							{type === 'back' && (
								<Button
									onClick={() => router.back()}
									variant={'ghost'}
									size={'icon'}
								>
									<ArrowLeft size={32} />
								</Button>
							)}
						</div>
						<div className='flex-grow'>{centerContent}</div>
					</div>
					<div className='flex justify-end'>
						{rightContent}
						{type === 'public' && (
							<Link href={routes.LOGIN}>
								<User2 />
							</Link>
						)}
					</div>
				</div>
			</Container>
		</header>
	)
}
