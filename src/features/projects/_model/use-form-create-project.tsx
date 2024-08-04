import { createProject } from '@/entity/project/project.server'
import { useInvalidateSession, useSession } from '@/entity/user/session'
import { routes } from '@/shared/config/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Обязательное поле',
	}),
})

const useCreateProject = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: createProject,
	})

	return { createProject: mutateAsync, isPending }
}

export const useFormCreateProject = () => {
	const session = useSession()
	const invalidateSession = useInvalidateSession()
	const router = useRouter()
	const { createProject, isPending } = useCreateProject()
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			name: '',
		},
	})

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		if (!session.data?.data) return
		try {
			const res = await createProject({
				name: values.name,
				authorId: session.data.data.id,
			})
			if (res.error) {
				form.setError('root', { message: res.error.message })
			}
			await invalidateSession()
			router.replace(routes.WORKSPACE)
		} catch (error: any) {
			form.setError('root', { message: error.message ?? 'Произошла ошибка' })
		}
	}

	return {
		createProject: form.handleSubmit(onSubmit),
		form,
		isPending,
	}
}
