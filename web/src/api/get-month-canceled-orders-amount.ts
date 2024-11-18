import { api } from "@/lib/axios"

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export const getMonthCanceledOrdersAmount = async () => {
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount'
  )

  return response.data
}
