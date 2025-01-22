'use client';

import Link from 'next/link';

import { CreditCard, EllipsisVertical, Info, Trash2 } from 'lucide-react';

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
}

export default function Menu({ id }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <Info />
          <span>Update Status</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash2 />
          <span>Delete Invoice</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href={`/invoice/${id}/payment`}>
          <DropdownMenuItem>
            <CreditCard />
            <span>Payment</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
