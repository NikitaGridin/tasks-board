import clsx from 'clsx'
import { Spinner } from './spinner'

export function FullpageSpinner({ className }: { className?: string }) {
	return (
		<div
			className={clsx(
				'fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-white',
				className
			)}
		>
			<Spinner size={48} />
		</div>
	)
}
