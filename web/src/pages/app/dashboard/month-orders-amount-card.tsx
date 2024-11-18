import { useQuery } from "@tanstack/react-query"

import { getMonthOrdersAmount } from "@/api/get-month-orders-amount"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const MonthOrdersAmountCard = () => {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount
  })

  return (
    <Card>
      <CardHeader
        className="flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle className="text-base font-semibold">
          Pedidos (mês)
        </CardTitle>
        <Icons.utensils className="w-4 h-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
      {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span
                className={cn(
                  "text-rose-500",
                  monthOrdersAmount.diffFromLastMonth >= 0 && 'text-emerald-500'
                )}
              >
                {monthOrdersAmount.diffFromLastMonth >= 0 && '+'} {monthOrdersAmount.diffFromLastMonth}%
              </span>

              <span>em relação ao mês passado</span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
