import { useInvalidateSession } from '@/entity/user/session'
import { updateUser } from '@/entity/user/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const useFormUpdateUser = ({
	id,
	phone,
	name,
}: {
	id: number
	phone: string
	name: string | null
}) => {
	const updateFormSchema = z.object({
		phone: z.string().min(11, {
			message: 'Обязательное поле',
		}),
		name: z.string().min(1, {
			message: 'Обязательное поле',
		}),
	})

	const { mutateAsync, isPending } = useMutation({
		mutationFn: updateUser,
	})

	const invalidateSession = useInvalidateSession()
	const form = useForm<z.infer<typeof updateFormSchema>>({
		resolver: zodResolver(updateFormSchema),
		defaultValues: {
			phone,
			name: name ?? '',
		},
	})

	async function onSubmit(values: z.infer<typeof updateFormSchema>) {
		try {
			const res = await mutateAsync({
				id,
				name: values.name,
				phone: values.phone,
			})
			if (res.error) {
				form.setError('root', { message: res.error.message })
			}
			await invalidateSession()
		} catch (error: any) {
			form.setError('root', { message: error.message ?? 'Произошла ошибка' })
		}
	}

	return {
		update: form.handleSubmit(onSubmit),
		form,
		isPending,
	}
}
