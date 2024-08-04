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
import { useFormCreateProject } from './_model/use-form-create-project'

export function FormCreateProject() {
	const { createProject, form, isPending } = useFormCreateProject()

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
			<form onSubmit={createProject} className='grid gap-4'>
				<FormField
					disabled={isPending}
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Название проекта'
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
					Создать
				</Button>
			</form>
		</Form>
	)
}
