import z from 'zod'

export const newOwnerSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    deletedAt: z.date().optional(),
    userOwnerId: z.array(z.string())
})

export type NewOwnerValues = z.infer<typeof newOwnerSchema>

export const ownerSchema = newOwnerSchema.extend({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
    createdAt: z.string().datetime(),
    deletedAt: z.string().datetime().optional(),
})