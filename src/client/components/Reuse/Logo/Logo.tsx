import React from 'react'
import { FaGithub } from 'react-icons/fa'

interface LogoProps {
    iconSize?: number
}

export const Logo: React.FC<LogoProps> = (props) => {
    const { iconSize = 27 } = props

    return (
        <div style={{ display: 'flex', alignItems: 'center', fontSize: (iconSize * 2) / 3 }}>
            <FaGithub style={{ marginRight: 3 }} size={iconSize} />
            stats
        </div>
    )
}
