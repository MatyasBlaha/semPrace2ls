
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ClientProviders from "@/providers/ClientProviders";

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = params;

    if (!routing.locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
        <body>
        <NextIntlClientProvider messages={messages}>
            <ClientProviders>
                {children}
            </ClientProviders>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
