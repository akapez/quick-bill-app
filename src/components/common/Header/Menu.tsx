'use client';

import Link from 'next/link';

import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/DropDown';

interface MenuProps {
  children: React.ReactNode;
  name: string;
}

export default function Menu({ children, name }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`${name}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/manage">
          <DropdownMenuItem className="cursor-pointer">
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: '/sign-in',
            })
          }
        >
          <LogOut />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
