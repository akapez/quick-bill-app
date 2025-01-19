import Link from 'next/link';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

import { Button } from '../ui/Button';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 flex w-full items-center justify-center border-t bg-background md:px-5">
      <div className="container flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row md:py-0">
        <div className="hidden items-center px-8 md:flex md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">QuickBill</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 QuickBill Inc. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="YouTube">
            <Youtube className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
