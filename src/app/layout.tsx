import './globals.css'
import '@/client/styles/spacing.css'
import '@/client/styles/std.css'

import React from 'react'

import ClientWrapper from '@/client/components/Wrappers'

export const metadata = {
    title: 'GitHub Stats',
    description: 'View your lifetime GitHub contribution stats',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ClientWrapper>{children}</ClientWrapper>
            </body>
        </html>
    )
}
