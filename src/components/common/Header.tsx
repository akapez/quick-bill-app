import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Button } from '../ui/Button';
import Menu from './Menu';

interface HeaderProps {
  isLoggedIn: boolean;
  role: string | undefined;
  imageUrl?: string;
  firstName: string;
  lastName: string;
}

export default function Header({
  isLoggedIn = false,
  role,
  imageUrl,
  firstName,
  lastName,
}: HeaderProps) {
  const firstLetter = firstName.charAt(0).toUpperCase();
  const secondLetter = lastName.charAt(0).toLocaleUpperCase();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-center border-b px-5 backdrop-blur">
      <div className="container flex h-16">
        <Link href="/" className="flex items-center">
          <span className="font-bold sm:inline-block">QuickBill</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {!isLoggedIn ? (
            <Link href="/sign-in">
              <Button size="sm">Sign In</Button>
            </Link>
          ) : (
            <Menu role={role} firstName={firstName} lastName={lastName}>
              <Avatar className="cursor-pointer" id="avatar">
                <AvatarImage src={imageUrl} />
                <AvatarFallback>{`${firstLetter}${secondLetter}`}</AvatarFallback>
              </Avatar>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
}
