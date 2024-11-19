import { Helmet } from "react-helmet-async"
import { useQuery } from "@tanstack/react-query" 
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

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
import { OrderTableSkeleton } from "./order-table-skeleton"

export const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform(page => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({
      pageIndex,
      orderId,
      customerName,
      status: status === 'all' ? null : status
    })
  })

  const handlePaginate = (page: number) => {
    setSearchParams(state => {
      state.set('page', (page + 1).toString())

      return state
    })
  }

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
                {isLoadingOrders && <OrderTableSkeleton />}

                {result && result.orders.map(order => (
                  <OrderTableRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
