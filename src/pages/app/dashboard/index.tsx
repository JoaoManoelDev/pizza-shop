import { Helmet } from "react-helmet-async"

import { MonthRevenueCard } from "./month-revenue-card"
import { MonthOrdersAmountCard } from "./month-orders-amount-card"
import { DayOrdersAmountCard } from "./day-orders-amount-card"
import { MonthCanceledOrdersAmountCard } from "./month-canceled-orders-amount-card"
import { RevenueChart } from "./revenue-chart"
import { Heading } from "@/components/heading"

export const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <Heading title="Dashboard" />

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
        </div>
      </div>
    </>
  )
}
