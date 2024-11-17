import { useSearchParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional()
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export const OrderTableFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    values: {
      customerName: customerName ?? '',
      orderId: orderId ?? '',
      status: status ?? 'all'
    }
  })

  const handleFilter = ({ customerName, orderId, status }: OrderFiltersSchema) => {
    setSearchParams(state => {
      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }
      
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  const handlerClearFilters = () => {
    setSearchParams(state => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')

      state.set('page', '1')

      return state
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        placeholder="ID do pedido"
        className="h-8 w-[220px]"
        {...register('orderId')}
      />

      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        { ...register('customerName') }
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em Entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />      
    
      <Button type="submit" variant="secondary" size="xs">
        <Icons.search className="w-4 h-4 mr-2" />
        Filtrar resultados
      </Button>

      {Boolean(
        searchParams.has('orderId') ||
        searchParams.has('customerName') ||
        searchParams.has('status')
      ) && (
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={() => handlerClearFilters()}
          >
          <Icons.x className="w-4 h-4 mr-2" />
          Remover Filtros
        </Button>
      )}
    </form>
  )
}
