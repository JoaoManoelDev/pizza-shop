import { api } from "@/lib/axios"

interface GetDailyRevenueInPeriodQuery {
  from?: Date,
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export const getDailyRevenueInPeriod = async ({
  from,
  to
}: GetDailyRevenueInPeriodQuery) => {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period', {
      params: {
        from,
        to
      }
    }
  )

  return response.data
}
