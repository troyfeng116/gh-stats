'use client'

import React from 'react'

import { AuthWrapper } from './AuthWrapper/AuthWrapper'

import { AuthProvider } from '@/components/Auth'

interface ClientWrapperProps {
    children: React.ReactNode
}

export const ClientWrapper: React.FC<ClientWrapperProps> = (props: ClientWrapperProps) => {
    const { children } = props

    return (
        <AuthProvider>
            <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
    )
}
