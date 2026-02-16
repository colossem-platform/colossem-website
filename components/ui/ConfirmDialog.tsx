"use client";

import { useRef, useEffect } from "react";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  variant = "danger",
  pending = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: "danger" | "default";
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const confirmStyles =
    variant === "danger"
      ? "bg-crimson text-white hover:bg-crimson-dark"
      : "bg-surface-light text-foreground hover:bg-border";

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      className="rounded-xl border border-border bg-surface p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="w-[min(400px,90vw)] p-6">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50 ${confirmStyles}`}
          >
            {pending ? "..." : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
