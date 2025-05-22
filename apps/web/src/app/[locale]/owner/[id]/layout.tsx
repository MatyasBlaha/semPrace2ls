// app/[locale]/owner/[id]/layout.tsx
'use client'
import { ReactNode, Suspense } from 'react'
import { OwnerProvider } from '@/context/OwnerContext'
import SidebarHolder from '@/components/owner/dashboard/SidebarHolder'
import Loading from './loading'

export default function OwnerLayout({ children }: { children: ReactNode }) {
    return (
        <OwnerProvider>
            <Suspense fallback={<Loading />}>
                {/* now children flow into SidebarHolder */}
                <SidebarHolder>
                    {children}
                </SidebarHolder>
            </Suspense>
        </OwnerProvider>
    )
}