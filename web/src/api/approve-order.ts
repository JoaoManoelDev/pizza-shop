import { api } from "@/lib/axios"

interface ApproveOrderParams {
  orderId: string
}

export const approveOrder = async ({ orderId }: ApproveOrderParams) => {
  await api.patch(`/orders/${orderId}/approve`)
}
