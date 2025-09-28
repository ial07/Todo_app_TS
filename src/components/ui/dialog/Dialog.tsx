// src/components/ui/dialog/index.tsx
import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

type DialogProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  );
};

export const DialogTrigger = RadixDialog.Trigger;

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};
export const DialogContent: React.FC<DialogContentProps> = ({
  children,
  className,
}) => {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fadeIn" />
      <RadixDialog.Content
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black border border-[#DEDCDC] dark:border-neutral-900 rounded-lg shadow-lg p-6 w-[100%] max-w-md ${
          className ?? ""
        }`}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="mb-4">{children}</div>;

export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="mt-4 flex justify-end gap-2">{children}</div>;

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <RadixDialog.Title className="text-lg font-bold">
    {children}
  </RadixDialog.Title>
);

export const DialogDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <RadixDialog.Description className="text-sm text-neutral-600 dark:text-neutral-400">
    {children}
  </RadixDialog.Description>
);

export const DialogClose = RadixDialog.Close;
