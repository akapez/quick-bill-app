import Link from 'next/link';

import { Button } from '@components/ui/Button';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/Avatar';
import Menu from './Menu';

export interface HeaderProps {
  id: string | null;
  imageUrl?: string;
  name: string;
}

export default function Header({ id, imageUrl, name }: HeaderProps) {
  const fallbackLetter = name?.charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full border-b bg-background/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-10 xl:px-40">
      <Link href="/" className="flex items-center">
        <span className="font-bold sm:inline-block">QuickBill</span>
      </Link>
      <div className="flex flex-1 items-center justify-end space-x-2">
        {!id ? (
          <Link href="/sign-in">
            <Button size="sm">Sign In</Button>
          </Link>
        ) : (
          <Menu name={name}>
            <Avatar className="cursor-pointer" id="avatar">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{`${fallbackLetter}`}</AvatarFallback>
            </Avatar>
          </Menu>
        )}
      </div>
    </header>
  );
}
