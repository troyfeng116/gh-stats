'use client'

import React from 'react'

import { AuthWrapper } from './AuthWrapper/AuthWrapper'

import { AuthProvider } from '@/components/Auth'
import Nav from '@/components/Nav'

interface ClientWrapperProps {
    children: React.ReactNode
}

export const ClientWrapper: React.FC<ClientWrapperProps> = (props: ClientWrapperProps) => {
    const { children } = props

    return (
        <AuthProvider>
            <Nav />
            <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
    )
}
