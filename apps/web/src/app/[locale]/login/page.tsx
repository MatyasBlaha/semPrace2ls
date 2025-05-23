'use client'

import { useAuthControllerLogin } from '../../../../hooks/api/generated'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Input,
    Button,
    Heading,
    VStack,
    Text,
    Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/hooks/useLocale'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const loginMutation = useAuthControllerLogin()
    const router = useRouter()
    const locale = useLocale()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: LoginFormValues) => {
        loginMutation.mutate(
            { data },
            {
                onSuccess: () => {
                    router.push(`/${locale}/owner`)
                },
                onError: (error) => {
                    toast({
                        title: 'Login failed',
                        description: error instanceof Error ? error.message : 'Please try again.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                },
            }
        )
    }

    return (
        <Center minH="100vh" bg="gray.50">
            <Box
                bg="white"
                p={8}
                rounded="xl"
                shadow="md"
                w="full"
                maxW="sm"
            >
                <Heading size="lg" textAlign="center" mb={6}>
                    Login
                </Heading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Input
                                {...register('email')}
                                placeholder="Email"
                                type="email"
                            />
                            {errors.email && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </Box>

                        <Box>
                            <Input
                                {...register('password')}
                                placeholder="Password"
                                type="password"
                            />
                            {errors.password && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                    {errors.password.message}
                                </Text>
                            )}
                        </Box>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={loginMutation.isPending}
                            w="full"
                        >
                            Login
                        </Button>

                        {loginMutation.error && (
                            <Text color="red.500" fontSize="sm" textAlign="center">
                                {loginMutation.error.message || 'Login failed'}
                            </Text>
                        )}
                    </VStack>
                </form>
            </Box>
        </Center>
    )
}