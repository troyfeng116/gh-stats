import React, { useState } from 'react'

import Button from '@/client/components/Reuse/Button'
import { StdAlign, StdColors, StdFlex, StdLayout, StdMargin, StdTextSize, StdWidth } from '@/client/styles'
import { validateRangeQueryDates } from '@/client/utils/validateRangeQueryDates'
import { formatDateUTC__YYYYMMDD_dashed } from '@/shared/utils/dateUtils'

interface DateRangeInputProps {
    rangeBounds: {
        min?: string
        max?: string
    }
    initialFrom: string | undefined
    initialTo: string | undefined
    disabled?: boolean

    handleRangeSelected: (fromDate: string | undefined, toDate: string | undefined) => void
}

/**
 * Generic component for selecting `from`/`to` date ranges.
 * Performs validation using `utils.validateRangeQueryDates` before invoking `handleRangeSelected` callback.
 *
 * @param rangeBounds Min and max dates that can be selected.
 * @param initialFrom Starting `from` value.
 * @param initialTo Starting `to` value.
 * @param disabled Set to disable interacting with this range selector.
 * @param handleRangeSelected Callback invoked once "submit" button is clicked and selected date range is validated.
 */
export const DateRangeInput: React.FC<DateRangeInputProps> = (props) => {
    const { rangeBounds, initialFrom, initialTo, disabled = false, handleRangeSelected } = props

    const { min: unformattedMin, max: unformattedMax } = rangeBounds
    const min = unformattedMin !== undefined ? formatDateUTC__YYYYMMDD_dashed(unformattedMin) : undefined
    const max = unformattedMax !== undefined ? formatDateUTC__YYYYMMDD_dashed(unformattedMax) : undefined

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

        const dateRangeValidationError = validateRangeQueryDates(curFrom, curTo, {
            min: min === undefined ? undefined : new Date(min),
            max: max === undefined ? undefined : new Date(max),
        })
        if (dateRangeValidationError !== null) {
            setQueryDateRangeError(dateRangeValidationError)
            return
        }

        setPrevQueriedDateRange({ from: curFrom, to: curTo })
        handleRangeSelected(curFrom, curTo)
    }

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <div className={`${StdLayout.FlexRow}`}>
                <div className={`${StdFlex.Col} ${StdAlign.End} ${StdMargin.R18}`}>
                    <div className={`${StdLayout.FlexRow} ${StdWidth.FitContent} ${StdMargin.B6}`}>
                        <label htmlFor="from" className={`${StdMargin.R12}`}>
                            from
                        </label>
                        <input
                            disabled={disabled}
                            min={min}
                            max={max}
                            type="date"
                            id="from"
                            onChange={handleFromOnChange}
                            onFocus={handleOnFocus}
                        />
                    </div>

                    <div className={`${StdLayout.FlexRow} ${StdWidth.FitContent}`}>
                        <label htmlFor="to" className={`${StdMargin.R12}`}>
                            to
                        </label>
                        <input
                            disabled={disabled}
                            min={min}
                            max={max}
                            type="date"
                            id="to"
                            onChange={handleToOnChange}
                            onFocus={handleOnFocus}
                        />
                    </div>
                </div>

                <Button onClick={onClick} disabled={isButtonDisabled}>
                    Submit
                </Button>
            </div>

            {queryDateRangeError !== undefined && (
                <p className={`${StdTextSize.Label} ${StdColors.ErrorRed} ${StdMargin.T12}`}>{queryDateRangeError}</p>
            )}
        </div>
    )
}
