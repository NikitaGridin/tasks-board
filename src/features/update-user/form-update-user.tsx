'use client'

import { cn } from '@/shared/lib/lib'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { useFormUpdateUser } from './_model/use-form-update-user'
import { AvatarField } from './_ui/avatar-field'

export function FormUpdateUser({
	id,
	phone,
	avatar,
	name,
}: {
	id: number
	phone: string
	avatar: string | null
	name: string | null
}) {
	const { update, form, isPending } = useFormUpdateUser({
		id,
		phone,
		name,
	})

	return (
		<div className='space-y-4'>
			<AvatarField id={id} initialAvatar={avatar} />
			<Form {...form}>
				{form.formState.errors.root && (
					<Alert variant='destructive'>
						<AlertTitle className='font-semibold text-xl'>Ошибка</AlertTitle>
						<AlertDescription className='text-xl'>
							{form.formState.errors.root.message}{' '}
						</AlertDescription>
					</Alert>
				)}
				<form onSubmit={update} className='grid gap-4'>
					<FormField
						disabled={isPending}
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Номер телефона'
										{...field}
										className={cn('text-2xl h-16', {
											'border-red-600 bg-red-50': form.formState.errors.root,
										})}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						disabled={isPending}
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Имя'
										{...field}
										className={cn('text-2xl h-16', {
											'border-red-600 bg-red-50': form.formState.errors.root,
										})}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='text-2xl h-14 font-semibold'
						loading={isPending}
					>
						Изменить
					</Button>
				</form>
			</Form>
		</div>
	)
}
