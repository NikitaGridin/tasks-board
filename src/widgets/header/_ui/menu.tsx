'use client'

import { routes } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/ui/sheet'
import { FolderKanban, MenuIcon, User2 } from 'lucide-react'
import Link from 'next/link'
import { useMenu } from '../_model/use-menu'
import { LogoutBtn } from './logout-btn'

export const Menu = () => {
	const { closeSheet, session, setOpen, open } = useMenu()
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant={'ghost'} size={'icon'}>
					<MenuIcon size={32} />
				</Button>
			</SheetTrigger>
			<SheetContent side={'left'}>
				<SheetHeader>
					<SheetTitle></SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className='grid grid-cols-1 gap-4'>
					<Link
						href={`${routes.PROFILE}/${session.data?.data?.id}`}
						className='flex gap-2 items-center font-semibold'
						onClick={() => closeSheet()}
					>
						<User2 />
						<div>Мой профиль</div>
					</Link>
					<Link
						href={`${routes.PROJECTS}`}
						className='flex gap-2 items-center font-semibold'
						onClick={() => closeSheet()}
					>
						<FolderKanban />
						<div>Проекты</div>
					</Link>
					<LogoutBtn />
				</div>
			</SheetContent>
		</Sheet>
	)
}
