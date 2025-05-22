'use client'
import { useAuth } from '@/hooks/useAuth';
import Navbar from "@/components/navbar/Navbar";
import NavbarSkeleton from "@/components/skeletons/navbar/NavbarSkeleton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth(true);

    return (
        <>
            {loading
                ? <NavbarSkeleton />
                : <Navbar />
            }
            {children}
        </>
    );
}