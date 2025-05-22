'use client'

import {Box, Button, Input} from "@chakra-ui/react";
import { Select } from '@chakra-ui/select'
import {useBranchControllerCreate} from "../../../hooks/api/generated";
import {useRouter} from "next/navigation";
import {useLocale} from "@/hooks/useLocale";
import {useAuth} from "@/hooks/useAuth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newBranchSchema, NewBranchValues, BranchTypeEnum} from "@/types/branch/branch";
import {useOwner} from "@/context/OwnerContext";
import {CreateBranchDto} from "../../../hooks/api/model";

export default function NewBranchForm() {
    const createBranchMutation = useBranchControllerCreate();
    const router = useRouter();
    const locale = useLocale();
    const {ownerId} = useOwner()
    const {data, loading} = useAuth(true)

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(newBranchSchema),
        defaultValues: {
            name: '',
            location: '',
            type: 'MARKET',
            ownerId: ownerId ?? ''
        }
    })

    const onSubmit = (formData: NewBranchValues) => {
        if(!data?.id || !ownerId) return ;
        createBranchMutation.mutate(
            {
                data: {
                    ...formData,
                    ownerId
                } as CreateBranchDto
            },
            {
                onSuccess: (responseData) => {
                    router.push(`/${locale}/owner/${ownerId}/branches/${responseData.id}`);
                },
                onError: (error) => {
                    if (error instanceof Error) {
                        console.error(error);
                    }
                }
            }
        )
    }


    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Input
                        {...register('name')}
                        placeholder='name'
                        type='text'
                    />
                </Box>
                <Box>
                    <Input
                        {...register('location')}
                        placeholder='location'
                        type='text'
                    />
                </Box>
                <Box>
                    <Select {...register('type')}>
                        {Object.entries(BranchTypeEnum).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Button type='submit' disabled={createBranchMutation.isPending}>
                    create branch
                </Button>
            </form>
        </Box>
    )
}