'use client'

import { useAuthControllerRegister } from '../../../../hooks/api/generated'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Box,
    Input,
    Button,
    Heading,
    VStack,
    Text,
    Center,
    Flex
} from '@chakra-ui/react'

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
                    Register
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
                            isLoading={registerMutation.isPending}
                            w="full"
                        >
                            Register
                        </Button>

                        {registerMutation.error && (
                            <Text color="red.500" fontSize="sm" textAlign="center">
                                {registerMutation.error.message || 'Registration failed'}
                            </Text>
                        )}
                    </VStack>
                </form>
            </Box>
        </Center>
    )
}