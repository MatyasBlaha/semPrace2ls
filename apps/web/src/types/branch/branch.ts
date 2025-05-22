import z from 'zod'
import {ownerSchema} from "@/types/owner/owner";

export const newBranchSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    location: z.string().min(1, 'Location is required'),
    type: z.enum(['OFFICE', 'MARKET', 'WAREHOUSE']),
    ownerId: z.string().uuid('Invalid owner ID'),
});

export type NewBranchValues = z.infer<typeof newBranchSchema>

export const BranchTypeEnum = {
    OFFICE: 'OFFICE',
    MARKET: 'MARKET',
    WAREHOUSE: 'WAREHOUSE',
} as const;

export type BranchType = keyof typeof BranchTypeEnum;

export const branchSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    location: z.string(),
    type: z.enum(['OFFICE', 'MARKET', 'WAREHOUSE']),
    ownerId: z.string().uuid(),
    owner: ownerSchema,
});

export type BranchValues = z.infer<typeof branchSchema>