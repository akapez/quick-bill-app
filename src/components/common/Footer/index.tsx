import Link from 'next/link';

import { Button } from '../../ui/Button';
import { FacebookIcon, InstagramIcon, XIcon } from './icons';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 hidden w-full items-center justify-center border-t bg-background md:flex md:px-5">
      <div className="container flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-row items-center gap-2 px-8 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">QuickBill</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 QuickBill Inc. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" aria-label="Facebook">
            <FacebookIcon />
          </Button>
          <Button variant="ghost" size="icon" aria-label="X">
            <XIcon />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Instagram">
            <InstagramIcon />
          </Button>
        </div>
      </div>
    </footer>
  );
}
