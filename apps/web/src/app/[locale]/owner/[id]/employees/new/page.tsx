import {Box} from "@chakra-ui/react";
import NewEmployeeForm from "@/components/employee/NewEmployeeForm";

export default function Page({params}: {params: {id: string}}){
    const ownerId = params.id
    return (
        <Box>
            <NewEmployeeForm ownerId={ownerId}/>
        </Box>
    )

}