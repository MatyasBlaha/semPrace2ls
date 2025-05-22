// types/user/user.ts
import { z } from 'zod'

export const userSchema = z.object({
    id:        z.string().uuid(),
    email:     z.string().email(),
    name:      z.string().nullable(),
    createdAt: z.string().transform((s) => new Date(s)),
    deletedAt: z.string().nullable().transform((s) => (s ? new Date(s) : null)),
})

export type UserValues = z.infer<typeof userSchema>