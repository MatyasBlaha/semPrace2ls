'use client'

import {createContext, ReactNode, useContext} from "react";
import {useParams} from "next/navigation";

type EmployeeContextType = {
    employeeId: string
}

const EmployeeContext = createContext<EmployeeContextType | null>(null)

export const EmployeeProvider = ({children}: {children: ReactNode}) => {
    const params = useParams();
    const employeeId = params?.employeeId as string

    if (!employeeId) {
        throw new Error("EmployeeProvider must be used on a route with [id] param");
    }

    return (
        <EmployeeContext.Provider value={{ employeeId }}>
            {children}
        </EmployeeContext.Provider>
    )
}

export const useBranch = () => {
    const context = useContext(EmployeeContext)
    if (!context) throw new Error('useOwner must be used within OwnerProvider');
    return context;
}