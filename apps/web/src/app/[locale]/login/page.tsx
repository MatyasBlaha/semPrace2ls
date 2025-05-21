'use client'

import {useAuthControllerLogin} from "../../../../hooks/api/generated";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Toast} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import {useLocale} from "@/hooks/useLocale";

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const loginMutation = useAuthControllerLogin()
    const router = useRouter()
    const locale = useLocale()

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (data: LoginFormValues) => {
        loginMutation.mutate(
            { data },
            {
                onSuccess: (responseData) => {
                    router.push(`/${locale}/owner`);
                },
                onError: (error) => {
                    if (error instanceof Error) {
                        Toast.error(error.message || 'Login failed');
                    }
                }
            }
        );
    };

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
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? 'Registering...' : 'Register'}
            </button>

            {loginMutation.error && (
                <p className="error">
                    {loginMutation.error.message || 'Registration failed'}
                </p>
            )}
        </form>
    )

}