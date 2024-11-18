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
import { approveOrder } from "@/api/approve-order"
import { dispatchOrder } from "@/api/dispatch-order"
import { deliverOrder } from "@/api/deliver-order"

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: OrderStatus
    customerName: string
    total: number
  }
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [cancelModalAlertIsOpen, setCancelModalAlertIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const updateOrderStatusOnCache = (props: { orderId: string, status: OrderStatus }) => {
    const orderListCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders']
    })

    orderListCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map(order => {
          if (order.orderId === props.orderId) {
            return { ...order, status: props.status }
          }

          return order
        })
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: async (_, { orderId }) => {
      updateOrderStatusOnCache({
        orderId,
        status: 'canceled'
      })

      toast.success("Pedido cancelado com sucesso.")
      setCancelModalAlertIsOpen(false)
    }
  })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    onSuccess: async (_, { orderId }) => {
      updateOrderStatusOnCache({
        orderId,
        status: 'processing'
      })
    }
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess: async (_, { orderId }) => {
      updateOrderStatusOnCache({
        orderId,
        status: 'delivering'
      })
    }
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess: async (_, { orderId }) => {
      updateOrderStatusOnCache({
        orderId,
        status: 'delivered'
      })
    }
  })

  return (
    <TableRow className="">
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
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
          >
            <Icons.arrowRight className="w-3 h-3 mr-1" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
          >
            <Icons.arrowRight className="w-3 h-3 mr-1" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
          >
            <Icons.arrowRight className="w-3 h-3 mr-1" />
            Entregue
          </Button> 
        )}
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
            isPending={isCancelingOrder}
            onConfirmAction={() => cancelOrderFn({ orderId: order.orderId })}
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
