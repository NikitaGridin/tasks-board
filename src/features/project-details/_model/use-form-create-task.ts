import { useInvalidateTasks } from '@/entity/project/_queries'
import { createTask } from '@/entity/task/task.server'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
	title: z.string().min(1, {
		message: 'Обязательное поле',
	}),
	content: z.string(),
})

export const useFormCreateTask = ({ columnId }: { columnId: number }) => {
	const invalidateTasks = useInvalidateTasks()
	const { mutate, isPending } = useMutation({
		mutationFn: createTask,
		onSuccess: async (data) => {
			if (data.error) {
				return form.setError('root', {
					message: data.error.message ?? 'Произошла ошибка',
				})
			}
			await invalidateTasks({ columnId })
		},
		onError: (error) => {
			form.setError('root', { message: error.message ?? 'Произошла ошибка' })
		},
	})
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			title: '',
			content: '',
		},
	})

	function onSubmit(values: z.infer<typeof loginFormSchema>) {
		mutate({
			title: values.title,
			content: values.content,
			columnId,
		})
	}

	return {
		createTask: form.handleSubmit(onSubmit),
		form,
		isPending,
	}
}
