// app/[locale]/ClientProviders.tsx
'use client';

import {createBrowserClient} from '@supabase/ssr';
import {SessionContextProvider} from '@supabase/auth-helpers-react';
import {ReactQueryProvider} from "@/providers/QueryClientProvider";
import {Provider} from "@/components/ui/provider";
import {LocaleProvider} from "@/context/LocaleContext";

export default function ClientProviders({children}: { children: React.ReactNode }) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    return (
        <Provider>
            <LocaleProvider>
                <ReactQueryProvider>
                    <SessionContextProvider supabaseClient={supabase}>
                        {children}
                    </SessionContextProvider>
                </ReactQueryProvider>
            </LocaleProvider>
        </Provider>
    );
}