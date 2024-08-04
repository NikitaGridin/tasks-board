import { AuthGuard } from '@/features/auth/auth-guard'

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return <AuthGuard>{children}</AuthGuard>
}
