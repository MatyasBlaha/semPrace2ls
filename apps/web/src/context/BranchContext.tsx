'use client'

import {createContext, ReactNode, useContext} from "react";
import {useParams} from "next/navigation";

type BranchContextType = {
    branchId: string
}

const BranchContext = createContext<BranchContextType | null>(null)

export const BranchProvider = ({children}: {children: ReactNode}) => {
    const params = useParams();
    const branchId = params?.branchId as string

    if (!branchId) {
        throw new Error("BranchProvider must be used on a route with [id] param");
    }

    return (
        <BranchContext.Provider value={{ branchId }}>
            {children}
        </BranchContext.Provider>
    )
}

export const useBranch = () => {
    const context = useContext(BranchContext)
    if (!context) throw new Error('useOwner must be used within OwnerProvider');
    return context;
}