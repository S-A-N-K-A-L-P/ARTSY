import Link from 'next/link';
import { UserX } from 'lucide-react';
import { Button, EmptyState } from '@/components/ui';

/** Rendered when the profile route calls notFound(). Was a bare `<div>Not Found</div>`. */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <EmptyState
          icon={<UserX size={34} />}
          title="No such creator"
          description="This profile does not exist, or the handle has changed."
          action={
            <Link href="/home">
              <Button>Discover creators</Button>
            </Link>
          }
        />
      </div>
    </div>
  );
}
