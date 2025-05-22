import BranchTable from "@/components/branch/BranchTable";
import {Box} from "@chakra-ui/react";

export default function Page({params}: {params: {id: string}}){
const ownerId = params.id
    console.log(ownerId)
    return (
        <Box>
            <BranchTable ownerId={params.id}/>
        </Box>
    )
}