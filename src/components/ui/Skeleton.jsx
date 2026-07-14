export default function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`skeleton rounded-lg ${className}`} />
}

export function PostSkeleton() {
  return (
    <div className="bg-card border border-line rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 p-3.5">
        <Skeleton className="size-11 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </div>
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-3.5 space-y-2.5">
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-3 w-64" />
      </div>
    </div>
  )
}
