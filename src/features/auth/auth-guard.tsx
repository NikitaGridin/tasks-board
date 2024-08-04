'use client'

import { useSession } from '@/entity/user/_queries'
import { routes } from '@/shared/config/routes'
import { FullpageSpinner } from '@/shared/ui/full-page-spinner'
import { useRouter } from 'next/navigation'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const session = useSession()
	if (session.isLoading) {
		return <FullpageSpinner />
	}
	if (session.isError) {
		router.replace(routes.LOGIN)
		return
	}
	if (!session.data) {
		router.replace(routes.LOGIN)
		return
	}
	if (session.data.error) {
		router.replace(routes.LOGIN)
		return
	}
	if (!session.data.data) {
		router.replace(routes.LOGIN)
		return
	}
	return <>{children}</>
}
