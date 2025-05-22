'use client'

import {Box, Flex, Link} from "@chakra-ui/react";
import {useLocale} from "@/hooks/useLocale";
import Table from "@/components/branch/Table";

export default function BranchTable({ownerId}: {ownerId: string}){
const locale = useLocale()

    return(
        <Box>
            <Flex direction='column'>
                <Flex justify="flex-end">
                    <Link href={`/${locale}/owner/${ownerId}/branches/new`}>
                        New branch
                    </Link>
                </Flex>
                <Table ownerId={ownerId}/>
            </Flex>
        </Box>
    )
}