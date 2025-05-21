'use client'

import { useAuthControllerRegister } from '../../../../hooks/api/generated'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const registerMutation = useAuthControllerRegister()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (data: RegisterFormValues) => {
        registerMutation.mutate({
            data: {
                email: data.email,
                password: data.password
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    {...register('email')}
                    placeholder="Email"
                    type="email"
                />
                {errors.email && (
                    <p className="error">{errors.email.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register('password')}
                    placeholder="Password"
                    type="password"
                />
                {errors.password && (
                    <p className="error">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={registerMutation.isPending}
            >
                {registerMutation.isPending ? 'Registering...' : 'Register'}
            </button>

            {registerMutation.error && (
                <p className="error">
                    {registerMutation.error.message || 'Registration failed'}
                </p>
            )}
        </form>
    )
}