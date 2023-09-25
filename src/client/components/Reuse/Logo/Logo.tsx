import React from 'react'
import { FaGithub } from 'react-icons/fa'

import { StdFonts, StdLayout } from '@/client/styles'

interface LogoProps {
    iconSize?: number
}

export const Logo: React.FC<LogoProps> = (props) => {
    const { iconSize = 27 } = props

    return (
        <div className={`${StdLayout.FlexRow}`} style={{ fontSize: (iconSize * 2) / 3 }}>
            <FaGithub style={{ marginRight: 3 }} size={iconSize} />
            <p className={`${StdFonts.Logo}`}>stats</p>
        </div>
    )
}
