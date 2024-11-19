import { useQuery } from "@tanstack/react-query"

import { getMonthRevenue } from "@/api/get-month-revenue"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MetricCardSkeleton } from "@/components/metric-card-skeleton"

export const MonthRevenueCard = () => {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue
  })

  return (
    <Card>
      <CardHeader
        className="flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <Icons.dollar className="w-4 h-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span
                className={cn(
                  "text-rose-500",
                  monthRevenue.diffFromLastMonth >= 0 && 'text-emerald-500'
                )}
              >
                {monthRevenue.diffFromLastMonth >= 0 && '+'} {monthRevenue.diffFromLastMonth}%
              </span>

              <span>em relação ao mês passado</span>
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
