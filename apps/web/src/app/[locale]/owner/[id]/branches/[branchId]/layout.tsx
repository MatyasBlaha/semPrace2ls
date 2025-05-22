import {BranchProvider} from "@/context/BranchContext";
import {ReactNode} from "react";

export default function Layout({children}: {children: ReactNode}){


    return (
        <BranchProvider>
            {children}
        </BranchProvider>
    )
}