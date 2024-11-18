import { cn } from "@/lib/utils"

export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo'
}

interface OrderStatusProps {
  status: OrderStatus
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      
      <span className={cn(
        "w-2 h-2 rounded-full",
        status === 'pending' && 'bg-slate-400',
        status === 'canceled' && 'bg-rose-500',
        status === 'delivered' && 'bg-emerald-500',
        ['processing', 'delivering'].includes(status) && 'bg-amber-500'
      )} />

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
