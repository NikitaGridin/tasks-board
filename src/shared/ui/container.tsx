export const Container = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return <div className='px-4 max-w-[1440px] w-full mx-auto'>{children}</div>
}
