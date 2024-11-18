import { api } from "@/lib/axios"

interface CancelOrderParams {
  orderId: string
}

export const cancelOrder = async ({ orderId }: CancelOrderParams) => {
  await api.patch(`/orders/${orderId}/cancel`)
}
