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

	if (type === 'public') {
		return (
			<header className='shadow-md mb-4'>
				<Container>
					<div className='flex justify-between items-center h-16'>
						<Link href={routes.MAIN} className='text-2xl font-extrabold'>
							WT BOARD
						</Link>
						<Link href={routes.PROJECTS}>
							<User2 />
						</Link>
					</div>
				</Container>
			</header>
		)
	}

	return (
		<header className='shadow-md mb-4'>
			<Container>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center justify-center gap-4'>
						<div>
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
					<div className='flex justify-end'>{rightContent}</div>
				</div>
			</Container>
		</header>
	)
}
