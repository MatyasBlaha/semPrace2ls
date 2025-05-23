// types/employee/employee.ts
import { z } from 'zod'
import { branchSchema } from '@/types/branch/branch'
import { userSchema } from '@/types/user/user'
import { ownerSchema } from '@/types/owner/owner'

// 1) the “new” form, for your create DTO
export const newEmployeeSchema = z.object({
    name:        z.string().min(1, 'Name is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    email:       z.string().email('Invalid email address'),
    userId:      z.string().uuid('Invalid user ID'),
    branchId:    z.string().uuid('Invalid branch ID'),
    ownerId:     z.string().uuid('Invalid owner ID'),
})

export type NewEmployeeValues = z.infer<typeof newEmployeeSchema>

// 2) the full “read” shape
export const employeeSchema = z.object({
    id:          z.string().uuid(),
    name:        z.string(),
    phoneNumber: z.string(),
    email:       z.string().email(),
    userId:      z.string().uuid(),
    branchId:    z.string().uuid(),
    ownerId:     z.string().uuid(),
    branch:      branchSchema,
    user:        userSchema,
    owner:       ownerSchema,
})

export type EmployeeValues = z.infer<typeof employeeSchema>

export const RoleEnum = {
    SUPERADMIN: 'SUPERADMIN',
    ACCOUNTANT: 'ACCOUNTANT',
    MANAGER: 'MANAGER',
    USER: 'USER',
    HR: 'HR',
} as const;

export const roleOptions = Object.values(RoleEnum);