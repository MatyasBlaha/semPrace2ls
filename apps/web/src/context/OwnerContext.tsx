'use client'

import { createContext, ReactNode, useContext } from "react";
import { useParams } from "next/navigation";

type OwnerContextType = {
    ownerId: string
};

const OwnerContext = createContext<OwnerContextType | null>(null);

export const OwnerProvider = ({ children }: { children: ReactNode }) => {
    const params = useParams();
    const ownerId = params?.id as string;

    if (!ownerId) {
        throw new Error("OwnerProvider must be used on a route with [id] param");
    }

    return (
        <OwnerContext.Provider value={{ ownerId }}>
            {children}
        </OwnerContext.Provider>
    );
};

export const useOwner = () => {
    const context = useContext(OwnerContext);
    if (!context) throw new Error('useOwner must be used within OwnerProvider');
    return context;
};