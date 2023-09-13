import React, { useState } from 'react'

import Button from '@/client/components/Reuse/Button'
import { validateRangeQueryDates } from '@/client/utils/validateRangeQueryDates'

interface DateRangeInputProps {
    initialFrom: string | undefined
    initialTo: string | undefined
    disabled?: boolean

    handleRangeSelected: (fromDate: string | undefined, toDate: string | undefined) => void
}

export const DateRangeInput: React.FC<DateRangeInputProps> = (props) => {
    const { initialFrom, initialTo, disabled = false, handleRangeSelected } = props

    const [queryDateRange, setQueryDateRange] = useState<{ from?: string; to?: string }>({
        from: initialFrom,
        to: initialTo,
    })
    const [prevQueriedDateRange, setPrevQueriedDateRange] = useState<{ from?: string; to?: string }>({
        from: initialFrom,
        to: initialTo,
    })
    const [queryDateRangeError, setQueryDateRangeError] = useState<string>()

    const handleFromOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setQueryDateRange((prevRange) => {
            return { ...prevRange, from: e.target.value }
        })
    }

    const handleToOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setQueryDateRange((prevRange) => {
            return { ...prevRange, to: e.target.value }
        })
    }

    const handleOnFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        setQueryDateRangeError(undefined)
    }

    const isButtonDisabled =
        disabled ||
        queryDateRangeError !== undefined ||
        (prevQueriedDateRange.from === queryDateRange.from && prevQueriedDateRange.to === queryDateRange.to)

    const onClick = () => {
        const { from: curFrom, to: curTo } = queryDateRange
        const { from: prevFrom, to: prevTo } = prevQueriedDateRange
        if (curFrom === prevFrom && curTo === prevTo) {
            setQueryDateRangeError('Please specify a new date range to query!')
            return
        }

        const dateRangeValidationError = validateRangeQueryDates(curFrom, curTo)
        if (dateRangeValidationError !== null) {
            setQueryDateRangeError(dateRangeValidationError)
            return
        }

        setPrevQueriedDateRange({ from: curFrom, to: curTo })
        handleRangeSelected(curFrom, curTo)
    }

    return (
        <div>
            <label htmlFor="from" />
            <input type="date" id="from" onChange={handleFromOnChange} onFocus={handleOnFocus} />

            <label htmlFor="to" />
            <input type="date" id="to" onChange={handleToOnChange} onFocus={handleOnFocus} />

            <Button onClick={onClick} disabled={isButtonDisabled}>
                Query
            </Button>

            {queryDateRangeError !== undefined && <p>{queryDateRangeError}</p>}
        </div>
    )
}
