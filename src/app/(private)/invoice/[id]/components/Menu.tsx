'use client';

import { Fragment } from 'react';
import Link from 'next/link';

import { CreditCard, EllipsisVertical, Trash2 } from 'lucide-react';

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
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setOpenDeleteModal(true)}
              >
                <Trash2 />
                <span>Delete Invoice</span>
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
