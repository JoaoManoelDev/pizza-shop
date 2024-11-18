import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  TableCell,
  TableRow
} from "@/components/ui/table"
import { OrderDetails } from "./order-details"
import { OrderStatus } from "@/components/order-status"
import { cancelOrder } from "@/api/cancel-order"
import { GetOrdersResponse } from "@/api/get-orders"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { ConfirmOrderCancel } from "./confirm-order-cancel"

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered',
    customerName: string
    total: number
  }
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [cancelModalAlertIsOpen, setCancelModalAlertIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn, isPending } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: async (_, { orderId }) => {
      const orderListCached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders']
      })

      orderListCached.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) return

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map(order => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled' }
            }

            return order
          })
        })
      })

      toast.success("Pedido cancelado com sucesso.")
      setCancelModalAlertIsOpen(false)
    }
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Icons.search className="w-3 h-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">
        {order.customerName}
      </TableCell>

      <TableCell className="font-medium">
        {order.total.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <Icons.arrowRight className="w-3 h-3 mr-1" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <AlertDialog
          open={cancelModalAlertIsOpen}
          onOpenChange={setCancelModalAlertIsOpen}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="xs"
              disabled={!['pending', 'processing'].includes(order.status)}
              >
              <Icons.x className="w-3 h-3 mr-1" />
              Cancelar
            </Button>
          </AlertDialogTrigger>

          <ConfirmOrderCancel
            isPending={isPending}
            onConfirmAction={() => cancelOrderFn({ orderId: order.orderId })}
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
