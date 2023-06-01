import React from 'react'

import Repos from '@/client/components/Pages/Auth/Repos'
import { VERSION_NUMBER } from '@/config/constants'

export default function ReposPage() {
    return (
        <main>
            <Repos />
            <p>{VERSION_NUMBER}</p>
        </main>
    )
}
