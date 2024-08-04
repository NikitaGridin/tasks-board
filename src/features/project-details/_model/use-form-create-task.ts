import { createTask } from '@/entity/task/task.server'
import { useInvalidateSession } from '@/entity/user/session'
import { routes } from '@/shared/config/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
	title: z.string().min(1, {
		message: 'Обязательное поле',
	}),
	content: z.string(),
})

export const useFormCreateTask = ({ columnId }: { columnId: number }) => {
	const invalidateSession = useInvalidateSession()
	const router = useRouter()
	const { mutateAsync, isPending } = useMutation({
		mutationFn: createTask,
	})
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			title: '',
			content: '',
		},
	})

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		try {
			const res = await mutateAsync({
				title: values.title,
				content: values.content,
				columnId,
			})
			if (res.error) {
				form.setError('root', { message: res.error.message })
			}
			await invalidateSession()
			router.replace(routes.PROJECTS)
		} catch (error: any) {
			form.setError('root', { message: error.message ?? 'Произошла ошибка' })
		}
	}

	return {
		createTask: form.handleSubmit(onSubmit),
		form,
		isPending,
	}
}
