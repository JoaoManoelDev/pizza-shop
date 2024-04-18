import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  TableCell,
  TableRow
} from "@/components/ui/table"

export const OrderTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Icons.search className="w-3 h-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        gdwe54754456
      </TableCell>

      <TableCell className="text-muted-foreground">
        15 minutos
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">
            Pendente
          </span>
        </div>
      </TableCell>

      <TableCell className="font-medium">
        João Manoel
      </TableCell>

      <TableCell className="font-medium">
        R$ 159,90
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <Icons.arrowRight className="w-3 h-3 mr-1" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button variant="ghost" size="xs">
          <Icons.x className="w-3 h-3 mr-1" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
