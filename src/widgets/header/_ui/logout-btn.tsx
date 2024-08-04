'use client'

import { useLogout } from '@/entity/user/session'
import { Button } from '@/shared/ui/button'

export const LogoutBtn = () => {
	const { logout, isPending } = useLogout()
	return (
		<Button onClick={() => logout()} loading={isPending}>
			Выйти
		</Button>
	)
}
