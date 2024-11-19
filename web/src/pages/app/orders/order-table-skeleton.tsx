import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

export const OrderTableSkeleton = () => (
  <>
    {Array.from({ length: 10 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <Button disabled variant="outline" size="xs">
            <Icons.search className="w-3 h-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[148px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[110px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>

        <TableCell className="font-medium">
          <Skeleton className="h-4 w-[64px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

