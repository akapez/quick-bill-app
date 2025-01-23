import Link from 'next/link';

import { Button } from '../../ui/Button';
import { FacebookIcon, InstagramIcon, XIcon } from './icons';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 hidden w-full items-center justify-between border-t bg-background py-4 md:flex md:px-10 xl:px-40">
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
    </footer>
  );
}
