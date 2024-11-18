import { api } from "@/lib/axios"

interface DeliverOrderParams {
  orderId: string
}

export const deliverOrder = async ({ orderId }: DeliverOrderParams) => {
  await api.patch(`/orders/${orderId}/deliver`)
}
