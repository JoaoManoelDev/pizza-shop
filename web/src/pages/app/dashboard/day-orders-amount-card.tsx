import { useQuery } from "@tanstack/react-query"

import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDayOrdersAmount } from "@/api/get-day-orders-amount"
import { cn } from "@/lib/utils"

export const DayOrdersAmountCard = () => {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount
  })

  return (
    <Card>
      <CardHeader
        className="flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle className="text-base font-semibold">
          Pedidos (dia)
        </CardTitle>
        <Icons.utensils className="w-4 h-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span
                className={cn(
                  "text-rose-500",
                  dayOrdersAmount.diffFromYesterday >= 0 && 'text-emerald-500'
                )}
              >
                {dayOrdersAmount.diffFromYesterday >= 0 && '+'}{dayOrdersAmount.diffFromYesterday}%
              </span>

              <span>em relação a ontem</span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
