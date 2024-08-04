import { login } from '@/entity/user/_actions/login'
import { useInvalidateSession } from '@/entity/user/session'
import { routes } from '@/shared/config/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
	phone: z.string().min(1, {
		message: 'Обязательное поле',
	}),
	password: z.string().min(1, {
		message: 'Обязательное поле',
	}),
})

const useLogin = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: login,
	})

	return { login: mutateAsync, isPending }
}

export const useFormLogin = () => {
	const invalidateSession = useInvalidateSession()
	const router = useRouter()
	const { login, isPending } = useLogin()
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			phone: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		try {
			const res = await login({
				phone: values.phone,
				password: values.password,
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
		login: form.handleSubmit(onSubmit),
		form,
		isPending,
	}
}
