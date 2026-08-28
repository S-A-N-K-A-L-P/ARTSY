import { Skeleton } from '@/components/ui';

/**
 * Next renders this during the profile's server fetch. It was
 * `<div>Loading...</div>` — unstyled text on whatever background happened to
 * be there. A skeleton in the profile's shape avoids the layout jump when the
 * real content arrives.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-bg px-5 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-40 w-full rounded-[var(--radius-lg)]" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-16 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="aspect-[4/3] rounded-[var(--radius-lg)]" />
          <Skeleton className="aspect-[4/3] rounded-[var(--radius-lg)]" />
        </div>
      </div>
    </div>
  );
}
