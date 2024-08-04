import { Loader2, LucideProps } from 'lucide-react'

export function Spinner(props: LucideProps) {
	return <Loader2 {...props} className='animate-spin' />
}
