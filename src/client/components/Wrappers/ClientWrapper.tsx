'use client'

import React from 'react'

import { AuthWrapper } from './AuthWrapper/AuthWrapper'
import Main from './MainWrapper'

import { AuthProvider } from '@/client/components/Wrappers/AuthProvider'
import Nav from '@/client/components/Wrappers/Nav'

interface ClientWrapperProps {
    children: React.ReactNode
}

export const ClientWrapper: React.FC<ClientWrapperProps> = (props: ClientWrapperProps) => {
    const { children } = props

    return (
        <AuthProvider>
            <Nav />
            <Main>
                <AuthWrapper>{children}</AuthWrapper>
            </Main>
        </AuthProvider>
    )
}
