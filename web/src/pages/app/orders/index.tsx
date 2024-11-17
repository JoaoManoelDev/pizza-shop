import { Helmet } from "react-helmet-async"
import { useQuery } from "@tanstack/react-query" 

import { OrderTableRow } from "./order-table-row"
import { OrderTableFilters } from "./order-table-filters"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Pagination } from "@/components/pagination"
import { Heading } from "@/components/heading"
import { getOrders } from "@/api/get-orders"

export const Orders = () => {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  })

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <Heading title="Pedidos" />

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">ID</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {result && result.orders.map(order => (
                  <OrderTableRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
