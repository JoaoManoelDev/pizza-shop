import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
} from "recharts"

import colors from "tailwindcss/colors"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

const data = [
  { date: "10/02", revenue: 1200 },
  { date: "11/02", revenue: 5000 },
  { date: "12/02", revenue: 3000 },
  { date: "13/02", revenue: 1000 },
  { date: "14/02", revenue: 10000 },
  { date: "15/02", revenue: 11450 },
  { date: "16/02", revenue: 500 },
  { date: "17/02", revenue: 9000 },
]

export const RevenueChart = () => {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              stroke="#888"
              axisLine={false}
              tickLine={false}
              dy={16}
            />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL"
                })
              }
            />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet["500"]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
