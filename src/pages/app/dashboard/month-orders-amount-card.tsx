import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const MonthOrdersAmountCard = () => {
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
        <span className="text-2xl font-bold tracking-tight">
          250
        </span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500">+6%</span> em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
