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
import { useFormLogin } from './_model/use-form-login'

export function FormLogin() {
	const { login, form, isPending } = useFormLogin()

	return (
		<Form {...form}>
			{form.formState.errors.root && (
				<Alert variant='destructive'>
					<AlertTitle className='font-semibold text-xl'>Ошибка</AlertTitle>
					<AlertDescription className='text-xl'>
						{form.formState.errors.root.message}{' '}
					</AlertDescription>
				</Alert>
			)}
			<form onSubmit={login} className='grid gap-4'>
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
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='password'
									placeholder='Пароль'
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
					Войти
				</Button>
			</form>
		</Form>
	)
}
