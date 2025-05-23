'use client'

import {useBranchControllerGetBranchByOwnerId, useEmployeeControllerCreate} from "../../../hooks/api/generated";
import {useRouter} from "next/navigation";
import {useLocale} from "@/hooks/useLocale";
import {useAuth} from "@/hooks/useAuth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newEmployeeSchema, NewEmployeeValues, roleOptions} from "@/types/employee/employee";
import {Box, Button, Input} from "@chakra-ui/react";
import {Select} from "@chakra-ui/select";
import {BranchTypeEnum} from "@/types/branch/branch";
import {useEffect} from "react";

export default function NewEmployeeForm({ownerId}: {ownerId: string}){
    const createEmployeeMutation = useEmployeeControllerCreate()
    const {data: branches = [], loading: branchesLoading} = useBranchControllerGetBranchByOwnerId(ownerId)
    const router = useRouter()
    const locale = useLocale();
    const {data: authData, loading} = useAuth(true)

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(newEmployeeSchema),
        defaultValues: {
            name: '',
            phoneNumber: '',
            email: '',
            userId: authData?.id ?? '',
            branchId: '',
            ownerId: ownerId ?? ''
        }
    })

    console.log(authData)

    useEffect(() => {
        if (branches.length && authData?.id) {
            reset({
                name: "",
                phoneNumber: "",
                email: "",
                userId: authData.id,
                ownerId,
                branchId: branches[0].id,
            })
        }
    }, [branches, authData, ownerId, reset])

    const onSubmit = (formData: NewEmployeeValues) => {
        if (!authData?.id || !ownerId) return;

        createEmployeeMutation.mutate(
            {
                data: {
                    ...formData,
                }
            },
            {
                onSuccess: (responseData) => {
                    router.push(`/${locale}/owner/${ownerId}/employees/${responseData.id}`);
                },
                onError: (error) => {
                    if (error instanceof Error) {
                        console.error(error);
                    }
                }
            }
        )
    }

    return(
        <Box maxWidth='400px'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Input
                        {...register('name')}
                        placeholder='name'
                        type='tel'
                    />
                </Box>
                <Box>
                    <Input
                        {...register('phoneNumber')}
                        placeholder='phoneNumber'
                        type='number'
                    />
                </Box>
                <Box>
                    <Input
                        {...register('email')}
                        placeholder='email'
                        type='email'
                    />
                </Box>
                <Box>
                    <Select
                        {...register("branchId")}
                        defaultValue={branches[0]?.id}
                    >
                        {branches.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </Select>
                    <Select {...register('role')}>
                        {roleOptions.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Button type='submit' disabled={createEmployeeMutation.isPending}>
                    create Employee
                </Button>
            </form>
        </Box>
    )
}