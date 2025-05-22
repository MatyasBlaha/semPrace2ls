'use client'

import {useOwnersControllerCreate} from "../../../../hooks/api/generated";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newOwnerSchema, NewOwnerValues} from '@/types/owner/owner'
import {useLocale} from "@/hooks/useLocale";
import {Box, Button, Toast} from "@chakra-ui/react";
import {useAuth} from "@/hooks/useAuth";

export default function NewOwnerForm() {
    const createOwnerMutation = useOwnersControllerCreate();
    const router = useRouter();
    const locale = useLocale()
    const {data, loading} = useAuth(true)

    console.log(data.id)

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(newOwnerSchema),
        defaultValues: {
            name: '',
            description: '',
            userOwnerId: [data?.id ?? ''],
        }
    })

    const onSubmit = (formData: NewOwnerValues) => {
        if (!data?.id) return;
        createOwnerMutation.mutate(
            {
                data: {
                    ...formData,
                    createdAt: new Date().toISOString(),
                    deletedAt: formData.deletedAt?.toISOString(),
                    userOwnerId: [data.id],
                },
            },
            {
                onSuccess: (responseData) => {
                    router.push(`/${locale}/owner/${responseData.id}`);
                },
                onError: (error) => {
                    if (error instanceof Error) {
                        console.error(error);
                    }
                },
            }
        );
    };


    // TODO: docasne, udelat komponentu
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <input
                        {...register('name')}
                        placeholder="name"
                        type='text'
                    />
                </Box>

                <Box>
                    <input
                        {...register('description')}
                        placeholder='description'
                        type='text'
                    />
                </Box>
                <Button type='submit' disabled={createOwnerMutation.isPending}>
                    create owner
                </Button>
            </form>
        </>
    )
}