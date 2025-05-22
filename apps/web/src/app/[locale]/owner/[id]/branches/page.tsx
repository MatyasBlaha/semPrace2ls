import BranchTable from "@/components/employee/BranchTable";
import {Box} from "@chakra-ui/react";
import Table from "@/components/branch/Table";

export default function Page({params}: {params: {id: string}}){
const ownerId = params.id
    console.log(ownerId)
    return (
        <Box>
            <BranchTable ownerId={params.id}/>
        </Box>
    )
}