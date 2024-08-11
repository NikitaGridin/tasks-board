import { useInvalidateUserProjects } from '@/entity/project/_queries'
import { createProject } from '@/entity/project/project.server'
import { useSession } from '@/entity/user/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Обязательное поле',
	}),
})

export const useFormCreateProject = () => {
	const session = useSession()
	const invalidateUserProjects = useInvalidateUserProjects()
	const { mutate, isPending } = useMutation({
		mutationFn: createProject,
		onSuccess: async (data) => {
			if (data.error) {
				return form.setError('root', {
					message: data.error.message ?? 'Произошла ошибка',
				})
			}
			await invalidateUserProjects() // Обновляем проекты пользователя после создания
		},
		onError: (error) => {
			form.setError('root', { message: error.message ?? 'Произошла ошибка' })
		},
	})

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			name: '',
		},
	})

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		if (!session.data?.data) return null
		mutate({
			name: values.name,
			authorId: session.data.data.id,
		})
	}

	return {
		createProject: form.handleSubmit(onSubmit),
		form,
		isPending,
	}
}
