import { z } from 'zod'

const privateConfigSchema = z.object({
	JWT_SECRET_KEY: z.string(),
})

export const privateConfig = privateConfigSchema.parse(process.env)
