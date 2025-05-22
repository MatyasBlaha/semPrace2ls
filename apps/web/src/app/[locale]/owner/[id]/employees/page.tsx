import {Box} from "@chakra-ui/react";
import EmployeeTable from "@/components/employee/Table";

export default function Page({params}: {params: {id: string}}){
    const ownerId = params.id;
    return (
        <Box>
            <EmployeeTable ownerId={ownerId}/>
        </Box>
    )
}