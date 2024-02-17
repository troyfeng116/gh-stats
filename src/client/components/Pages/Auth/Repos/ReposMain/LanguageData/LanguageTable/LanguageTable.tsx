import React from 'react'

import Table from '@/client/components/Reuse/Table'
import { StdLayout } from '@/client/styles'
import { SHARED_Model__Language } from '@/shared/models/models/Language'
import { computeTotalLoc } from '@/shared/utils/computeTotalLoc'
import { bytesToStr } from '@/shared/utils/toBytesStr'

interface LanguageTableProps {
    totalLanguageBytes: number
    languageData: SHARED_Model__Language[]
    width: number
}

export const LanguageTable: React.FC<LanguageTableProps> = (props) => {
    const { totalLanguageBytes, languageData, width } = props

    return (
        <Table
            width={width}
            columnHeaders={['Language', 'Disk Usage', '≈ LOC'].map((header) => {
                return { data: header }
            })}
            rowData={languageData.map(({ name, color, size, approxLoc }) => {
                return [
                    {
                        data: (
                            <div className={`${StdLayout.FlexRowCenter}`}>
                                <div
                                    style={{
                                        backgroundColor: color,
                                        height: 12,
                                        width: 12,
                                        borderRadius: '50%',
                                        marginRight: 9,
                                    }}
                                />
                                {name}
                            </div>
                        ),
                        shouldCenter: true,
                    },
                    { data: bytesToStr(size, 2), shouldCenter: true },
                    { data: approxLoc, shouldCenter: true },
                ]
            })}
            footerData={[
                { data: 'Total', shouldCenter: true },
                { data: bytesToStr(totalLanguageBytes, 2), shouldCenter: true },
                { data: computeTotalLoc(languageData), shouldCenter: true },
            ]}
        />
    )
}
