import {ReactNode} from "react";
import {OwnerProvider} from "@/context/OwnerContext";
import {useAuth} from "@/hooks/useAuth";
import Sidebar from "@/components/owner/dashboard/Sidebar";

export default function OwnerLayout({children}: { children: ReactNode }) {
    return (
        <OwnerProvider>
        <Sidebar>
            {children}
        </Sidebar>
    </OwnerProvider>
)
}