import { OrderStatus } from "@/components/order-status"
import { api } from "@/lib/axios"

interface GetOrderDetailsParams {
  orderId: string
}

interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: OrderStatus
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export const getOrderDetails = async ({ orderId }: GetOrderDetailsParams) => {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}