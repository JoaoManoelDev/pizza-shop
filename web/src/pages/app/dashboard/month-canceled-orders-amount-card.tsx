import { useQuery } from "@tanstack/react-query"

import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const MonthCanceledOrdersAmountCard = () => {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount
  })

  return (
    <Card>
      <CardHeader
        className="flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <Icons.ban className="w-4 h-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
      {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span
                className={cn(
                  "text-rose-500",
                  monthCanceledOrdersAmount.diffFromLastMonth < 0 && 'text-emerald-500'
                )}
              >
                {monthCanceledOrdersAmount.diffFromLastMonth > 0 && '+'} {monthCanceledOrdersAmount.diffFromLastMonth}%
              </span>

              <span>em relação a ontem</span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
