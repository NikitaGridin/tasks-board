'use client'
import { Header } from '@/widgets/header/header'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header type={'public'} />
			{children}
		</>
	)
}
