import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/Avatar';
import Menu from './Menu';

export interface HeaderProps {
  role: string | undefined;
  imageUrl?: string;
  firstName: string;
  lastName: string;
}

export default function Header({
  role,
  imageUrl,
  firstName,
  lastName,
}: HeaderProps) {
  const firstLetter = firstName.charAt(0).toUpperCase();
  const secondLetter = lastName.charAt(0).toLocaleUpperCase();

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center border-b bg-background/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16">
        <Link href="/" className="flex items-center">
          <span className="font-bold sm:inline-block">QuickBill</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Menu role={role} firstName={firstName} lastName={lastName}>
            <Avatar className="cursor-pointer" id="avatar">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{`${firstLetter}${secondLetter}`}</AvatarFallback>
            </Avatar>
          </Menu>
        </div>
      </div>
    </header>
  );
}
