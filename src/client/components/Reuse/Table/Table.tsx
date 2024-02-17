import React from 'react'

import { StdPadding } from '@/client/styles'

interface TableCell {
    rowSpan?: number
    colSpan?: number
    shouldCenter?: boolean
    data: React.ReactNode
}

interface TableProps {
    columnHeaders?: TableCell[]
    rowData: TableCell[][]
    footerData?: TableCell[]
    width?: number
}

export const Table: React.FC<TableProps> = (props) => {
    const { columnHeaders, rowData, footerData, width } = props

    return (
        <table style={{ border: '1px solid white', width: width }}>
            {columnHeaders !== undefined && (
                <thead>
                    <tr>
                        {columnHeaders.map(({ rowSpan, colSpan, data, shouldCenter }, idx) => {
                            return (
                                <th
                                    key={idx}
                                    scope="col"
                                    rowSpan={rowSpan}
                                    colSpan={colSpan}
                                    className={`${StdPadding.X24} ${StdPadding.Y6}`}
                                    style={{
                                        border: '1px solid white',
                                        textAlign: shouldCenter ? 'left' : 'center',
                                    }}
                                >
                                    {data}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
            )}
            <tbody>
                {rowData.map((row, rowIdx) => {
                    return (
                        <tr key={rowIdx}>
                            {row.map(({ rowSpan, colSpan, shouldCenter, data }, idx) => {
                                return (
                                    <td
                                        key={idx}
                                        scope="col"
                                        rowSpan={rowSpan}
                                        colSpan={colSpan}
                                        className={`${StdPadding.X18} ${StdPadding.Y6}`}
                                        style={{
                                            border: '1px solid white',
                                            textAlign: shouldCenter == true ? 'center' : undefined,
                                        }}
                                    >
                                        {data}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
            {footerData !== undefined && (
                <tfoot>
                    <tr>
                        {footerData.map(({ rowSpan, colSpan, data, shouldCenter }, idx) => {
                            return (
                                <td
                                    key={idx}
                                    scope="col"
                                    rowSpan={rowSpan}
                                    colSpan={colSpan}
                                    className={`${StdPadding.X18} ${StdPadding.Y6}`}
                                    style={{
                                        border: '1px solid white',
                                        textAlign: shouldCenter == true ? 'center' : undefined,
                                    }}
                                >
                                    {data}
                                </td>
                            )
                        })}
                    </tr>
                </tfoot>
            )}
        </table>
    )
}
