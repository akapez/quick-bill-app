import type React from 'react';
import { useEffect, useRef } from 'react';

import { X } from 'lucide-react';

import { Button } from '../../ui/Button';
import { Separator } from '../../ui/Separator';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialogElement.addEventListener('cancel', handleCancel);
    return () => {
      dialogElement.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg p-0 shadow-xl backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="min-w-[300px] max-w-md">
        <div className="flex items-center justify-between rounded-t-lg px-4 py-2">
          <h2 className="text-lg font-semibold" id="dialog-title">
            {title}
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            aria-label="Close dialog"
          >
            <X />
          </Button>
        </div>
        <Separator />
        <div className="p-4">{children}</div>
      </div>
    </dialog>
  );
}
