"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

export type ConfirmDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  media?: React.ReactNode;
  /** Confirm button label */
  confirmLabel?: React.ReactNode;
  /** Cancel button label */
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  /** Destructive confirm styling */
  destructive?: boolean;
  size?: "default" | "sm";
  loading?: boolean;
};

/**
 * Confirm / alert dialog with a simple prop API.
 *
 * HOW TO USE:
 *   <ConfirmDialog
 *     trigger={<Button variant="destructive">Delete</Button>}
 *     title="Delete user?"
 *     description="This cannot be undone."
 *     destructive
 *     onConfirm={handleDelete}
 *   />
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  media,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
  size = "default",
  loading = false,
}: ConfirmDialogProps) {
  const [busy, setBusy] = React.useState(false);
  const isBusy = loading || busy;

  const handleConfirm = async () => {
    if (!onConfirm) {
      onOpenChange?.(false);
      return;
    }
    const result = onConfirm();
    if (result instanceof Promise) {
      setBusy(true);
      try {
        await result;
        onOpenChange?.(false);
      } finally {
        setBusy(false);
      }
    } else {
      onOpenChange?.(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <AlertDialogTrigger render={trigger as React.ReactElement} />
      ) : null}
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {media ? <AlertDialogMedia>{media}</AlertDialogMedia> : null}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isBusy}
            onClick={() => onCancel?.()}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={destructive ? "destructive" : "default"}
            loading={isBusy}
            onClick={(e) => {
              e.preventDefault();
              void handleConfirm();
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
