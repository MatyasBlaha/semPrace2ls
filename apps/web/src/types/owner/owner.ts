import z from 'zod'

export const newOwnerSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    deletedAt: z.date().optional(),
    userOwnerId: z.array(z.string())
})

export type NewOwnerValues = z.infer<typeof newOwnerSchema>