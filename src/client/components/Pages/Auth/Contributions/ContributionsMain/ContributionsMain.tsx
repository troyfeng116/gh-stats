import React from 'react'

import AllContributionsGraph from './AllContributionsGraph'
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

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <CalendarGrid calendarGrid={calendarGrid} />
            <Card className={`${StdMargin.T30}`}>
                <SummaryCard contributionsClientInfo={contributionsClientInfo} />
            </Card>

            <div className={`${StdMargin.T60} ${StdLayout.FlexRow}`}>
                <Card
                    className={`${StdMargin.R30}`}
                    padding={[StdPadding.T24, StdPadding.R6, StdPadding.B6, StdPadding.L6]}
                    type={CardType.Secondary}
                >
                    <DailyBarChart dailyContributionInfo={dailyInfo} />
                </Card>

                <Card padding={[StdPadding.T24, StdPadding.R6, StdPadding.B6, StdPadding.L6]} type={CardType.Secondary}>
                    <MonthlyBarChart contributionsByMonth={contributionsByMonth} />
                </Card>
            </div>

            <MonthAndYearHistogram contributionsByMonthAndYear={contributionsByMonthAndYear} />

            <div>
                <h3>Commit contributions graph</h3>
                <AllContributionsGraph contributionsByRepo={commitContributionsByRepository} />
            </div>
            <div>
                <h3>Commit contributions by repository</h3>
                <ByRepo contributionsByRepo={commitContributionsByRepository} />
            </div>
        </div>
    )
}
