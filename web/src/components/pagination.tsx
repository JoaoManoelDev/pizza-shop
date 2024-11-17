import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export const Pagination = ({
  pageIndex,
  totalCount,
  perPage,
  onPageChange
}: PaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} items(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            <Icons.chevronsLeft className="w-4 h-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <Icons.chevronLeft className="w-4 h-4" />
            <span className="sr-only">Página anterior</span>
          </Button> 

          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
          >
            <Icons.chevronRight className="w-4 h-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
          >
            <Icons.chevronsRight className="w-4 h-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}