import React from 'react'

import AllContributionsHistogram from './AllContributionsHistogram'
import ByRepo from './ByRepo'
import CalendarGrid from './CalendarGrid'
import ContributionsSummary from './ContributionsSummary'
import DailyBarChart from './DailyBarChart'
import MonthAndYearHistogram from './MonthAndYearHistogram'
import MonthlyBarChart from './MonthlyBarChart'

import Card, { CardType } from '@/client/components/Reuse/Card'
import { StdLayout, StdMargin, StdPadding, StdTextSize } from '@/client/styles'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'

interface ContributionsMainProps {
    contributionsClientInfo: SHARED_Model__ContributionsClientInfo
}

export const ContributionsMain: React.FC<ContributionsMainProps> = (props) => {
    const { contributionsClientInfo } = props

    const { contributions, calendarGridByMonthAndYear, dailyInfo, monthlyInfo } = contributionsClientInfo
    const { commitContributionsByRepository } = contributions
    const { contributionsByMonth, contributionsByMonthAndYear } = monthlyInfo

    const chartCardPadding: StdPadding[] = [StdPadding.T24, StdPadding.R18, StdPadding.B12, StdPadding.L18]

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <Card>
                <ContributionsSummary contributionsClientInfo={contributionsClientInfo} />
            </Card>

            <Card className={`${StdMargin.T60} ${StdLayout.FlexCol}`} type={CardType.Secondary}>
                <p className={`${StdTextSize.Medium} ${StdMargin.B12}`}>Calendar</p>
                <CalendarGrid calendarGridByMonthAndYear={calendarGridByMonthAndYear} />
            </Card>

            <div className={`${StdMargin.T30} ${StdLayout.FlexRow}`}>
                <Card className={`${StdMargin.R30}`} padding={chartCardPadding} type={CardType.Tertiary}>
                    <DailyBarChart dailyContributionInfo={dailyInfo} width={530} height={390} />
                </Card>

                <Card padding={chartCardPadding} type={CardType.Tertiary}>
                    <MonthlyBarChart contributionsByMonth={contributionsByMonth} width={530} height={390} />
                </Card>
            </div>

            <Card className={`${StdMargin.T30}`} padding={chartCardPadding} type={CardType.Tertiary}>
                <MonthAndYearHistogram
                    contributionsByMonthAndYear={contributionsByMonthAndYear}
                    width={690}
                    height={390}
                />
            </Card>

            <Card className={`${StdMargin.T30}`} padding={chartCardPadding} type={CardType.Tertiary}>
                <AllContributionsHistogram
                    contributionsByRepo={commitContributionsByRepository}
                    width={690}
                    height={390}
                />
            </Card>

            <Card
                className={`${StdMargin.T30}`}
                padding={[StdPadding.T24, StdPadding.R48, StdPadding.B24, StdPadding.L48]}
                type={CardType.Secondary}
            >
                <ByRepo contributionsByRepo={commitContributionsByRepository} />
            </Card>
        </div>
    )
}
