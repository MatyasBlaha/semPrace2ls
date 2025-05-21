
"use client";

import { createContext, useContext } from "react";
import { useParams } from "next/navigation";

const LocaleContext = createContext<string | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const { locale } = useParams();

    return (
        <LocaleContext.Provider value={locale || "en"}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    return useContext(LocaleContext) as string;
}
