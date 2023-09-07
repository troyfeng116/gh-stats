import React from 'react'

interface LegendProps {
    legendData: { label: string; color: string }[]
}

export const Legend: React.FC<LegendProps> = (props) => {
    const { legendData } = props

    return (
        <div>
            {legendData.map(({ label, color }, idx) => {
                return (
                    <div key={`legend-${label}-${idx}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                backgroundColor: color,
                                height: 12,
                                width: 12,
                                borderRadius: '50%',
                                marginRight: 9,
                            }}
                        />
                        <p>{label}</p>
                    </div>
                )
            })}
        </div>
    )
}
