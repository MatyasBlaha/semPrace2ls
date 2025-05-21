'use client';

import { usePathname } from 'next/navigation';

export function useLocale(): string {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const locale = segments[1];

    return locale;
}