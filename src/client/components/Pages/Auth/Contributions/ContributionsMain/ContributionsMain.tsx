import React from 'react'

import AllContributionsHistogram from './AllContributionsHistogram'
import ByRepo from './ByRepo'
import CalendarGrid from './CalendarGrid'
import DailyBarChart from './DailyBarChart'
import MonthAndYearHistogram from './MonthAndYearHistogram'
import MonthlyBarChart from './MonthlyBarChart'
import SummaryCard from './SummaryCard'

import Card, { CardType } from '@/client/components/Reuse/Card'
import { StdLayout, StdMargin, StdPadding } from '@/client/styles'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'

interface ContributionsMainProps {
    contributionsClientInfo: SHARED_Model__ContributionsClientInfo
}

export const ContributionsMain: React.FC<ContributionsMainProps> = (props) => {
    const { contributionsClientInfo } = props

    const { contributions, calendarGrid, dailyInfo, monthlyInfo } = contributionsClientInfo
    const { commitContributionsByRepository } = contributions
    const { contributionsByMonth, contributionsByMonthAndYear } = monthlyInfo

    const chartCardPadding: StdPadding[] = [StdPadding.T24, StdPadding.R18, StdPadding.B12, StdPadding.L18]

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <CalendarGrid calendarGrid={calendarGrid} />
            <Card className={`${StdMargin.T30}`}>
                <SummaryCard contributionsClientInfo={contributionsClientInfo} />
            </Card>

            <div className={`${StdMargin.T60} ${StdLayout.FlexRow}`}>
                <Card className={`${StdMargin.R30}`} padding={chartCardPadding} type={CardType.Secondary}>
                    <DailyBarChart dailyContributionInfo={dailyInfo} width={530} height={390} />
                </Card>

                <Card padding={chartCardPadding} type={CardType.Secondary}>
                    <MonthlyBarChart contributionsByMonth={contributionsByMonth} width={530} height={390} />
                </Card>
            </div>

            <Card className={`${StdMargin.T60}`} padding={chartCardPadding} type={CardType.Secondary}>
                <MonthAndYearHistogram
                    contributionsByMonthAndYear={contributionsByMonthAndYear}
                    width={690}
                    height={390}
                />
            </Card>

            <Card className={`${StdMargin.T60}`} padding={chartCardPadding} type={CardType.Secondary}>
                <AllContributionsHistogram
                    contributionsByRepo={commitContributionsByRepository}
                    width={690}
                    height={390}
                />
            </Card>

            <Card
                className={`${StdMargin.T60}`}
                padding={[StdPadding.T24, StdPadding.R24, StdPadding.B6, StdPadding.L24]}
                type={CardType.Secondary}
            >
                <h3>Commit contributions by repository</h3>
                <ByRepo contributionsByRepo={commitContributionsByRepository} />
            </Card>
        </div>
    )
}
