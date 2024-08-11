import { login } from '@/entity/user/_actions/login'
import { useInvalidateSession } from '@/entity/user/session'
import { routes } from '@/shared/config/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
	phone: z.string().min(1, { message: 'Обязательное поле' }),
	password: z.string().min(1, { message: 'Обязательное поле' }),
})

export const useFormLogin = () => {
	const router = useRouter()
	const invalidateSession = useInvalidateSession()

	const form = useForm({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			phone: '',
			password: '',
		},
	})

	const { mutate, isPending } = useMutation({
		mutationFn: login,
		onSuccess: async (data) => {
			if (data.error) {
				return form.setError('root', {
					message: data.error.message ?? 'Произошла ошибка',
				})
			}
			await invalidateSession()
			router.replace(routes.PROJECTS)
		},
		onError: (error) => {
			form.setError('root', { message: error.message ?? 'Произошла ошибка' })
		},
	})

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		mutate({
			phone: values.phone,
			password: values.password,
		})
	}

	return {
		login: form.handleSubmit(onSubmit),
		form,
		isPending,
	}
}
