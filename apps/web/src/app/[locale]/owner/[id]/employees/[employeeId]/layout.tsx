import {EmployeeProvider} from "@/context/EmployeeContext";
import {ReactNode} from "react";

export default function Layout({children}: {children: ReactNode}){

    return (
        <EmployeeProvider>
            {children}
        </EmployeeProvider>
    )
}