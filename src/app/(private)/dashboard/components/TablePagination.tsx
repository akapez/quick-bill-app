'use client';

import Link from 'next/link';

import { Button } from '@components/ui/Button';

interface TablePaginationProps {
  page: number;
  totalPages: number;
  total: number;
}

export default function TablePagination({
  page,
  totalPages,
  total,
}: TablePaginationProps) {
  if (total === 0) {
    return null;
  }
  return (
    <div className="my-5 flex items-center justify-between">
      <Button disabled={page === 1} size="sm">
        <Link
          href={{
            pathname: '/dashboard',
            query: {
              page: page - 1,
            },
          }}
        >
          Previous
        </Link>
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button disabled={page === totalPages} size="sm">
        <Link
          href={{
            pathname: '/dashboard',
            query: {
              page: page + 1,
            },
          }}
        >
          Next
        </Link>
      </Button>
    </div>
  );
}
