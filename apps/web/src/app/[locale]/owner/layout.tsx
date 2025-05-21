'use client'
import { useAuth } from '@/hooks/useAuth';
import Navbar from "@/components/navbar/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { authenticated, loading } = useAuth(true);

    if (loading) return <div>Loading...</div>;

    return <main>
        <Navbar/>
        {children}
    </main>;
}