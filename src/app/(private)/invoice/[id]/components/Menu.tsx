'use client';

import { Fragment } from 'react';
import Link from 'next/link';

import { CreditCard, EllipsisVertical, FileText } from 'lucide-react';

import { Button } from '@components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/DropDown';

interface MenuProps {
  id: string;
  senderId: string;
  userId: string | undefined;
}

export default function Menu({ id, senderId, userId }: MenuProps) {
  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {senderId === userId && (
            <Fragment>
              <DropdownMenuItem className="cursor-pointer">
                <FileText />
                <span>Download PDF</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </Fragment>
          )}
          <Link href={`/invoice/${id}/payment`}>
            <DropdownMenuItem className="cursor-pointer">
              <CreditCard />
              <span>Payment</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}
