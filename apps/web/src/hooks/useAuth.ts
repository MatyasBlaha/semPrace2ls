'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthControllerMe } from '../../hooks/api/generated';
import {useLocale} from "@/hooks/useLocale";

export function useAuth(protectedRoute = false) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const locale = useLocale();
    const { data, isSuccess, isError, isLoading: queryLoading } = useAuthControllerMe();
    console.log(data)
    console.log(queryLoading)
    console.log(isError)
    useEffect(() => {
        if (queryLoading) return; // počkej na dokončení načítání

        if (isSuccess && data) {
            setAuthenticated(true);
            setLoading(false);
        } else if (isError) {
            setAuthenticated(false);
            setLoading(false);
            if (protectedRoute) router.replace(`/${locale}/login`);
        }
    }, [queryLoading, isSuccess, isError, protectedRoute, router]);

    return { data, authenticated, loading };
}