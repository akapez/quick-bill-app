import Link from 'next/link';

import { Button } from '../../ui/Button';
import { GithubIcon } from './icons';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 hidden w-full items-center justify-between border-t bg-background py-4 md:flex md:px-10 xl:px-40">
      <div className="flex flex-row items-center gap-2 px-8 md:px-0">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">QuickBill</span>
        </Link>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" size="icon" aria-label="Github" asChild>
          <Link href="https://github.com/akapez">
            <GithubIcon />
          </Link>
        </Button>
      </div>
    </footer>
  );
}
