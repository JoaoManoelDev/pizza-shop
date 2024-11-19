import { Skeleton } from "./ui/skeleton"

export const MetricCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-7 w-32 mt-1" />
      <Skeleton className="h-4 w-52" />
    </div>
  )
}