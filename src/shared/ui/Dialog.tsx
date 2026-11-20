"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";
import styles from "./Dialog.module.css";

const subscribeNoop = () => () => {};

type DialogProps = {
  open: boolean;
  /** User asked to close: Esc, backdrop click or a close button. */
  onClose: () => void;
  /** Runs after the closing animation, once focus has been returned. */
  onAfterClose?: () => void;
  labelledBy?: string;
  label?: string;
  /** "modal" — centred card; "sheet" — a curtain lowered from the top. */
  variant?: "modal" | "sheet";
  className?: string;
  children: ReactNode;
};

/**
 * Native modal <dialog> (focus containment, inert page, Esc) with soft enter
 * and exit animations. Rendered into <body>, so it always follows the page
 * theme even when opened from an evening-toned section.
 */
export function Dialog({
  open,
  onClose,
  onAfterClose,
  labelledBy,
  label,
  variant = "modal",
  className,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);
  const closingByUs = useRef(false);
  const pressStartedOnBackdrop = useRef(false);
  const onAfterCloseRef = useRef(onAfterClose);
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);

  useEffect(() => {
    onAfterCloseRef.current = onAfterClose;
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        returnFocusTo.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dialog.showModal();
        // Initial focus: an element marked data-autofocus, else the browser default.
        dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      }
      dialog.dataset.state = "open";
      return;
    }

    if (!dialog.open) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      closingByUs.current = true;
      dialog.close();
      delete dialog.dataset.state;
      returnFocusTo.current?.focus({ preventScroll: true });
      returnFocusTo.current = null;
      onAfterCloseRef.current?.();
    };
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target === dialog && !event.pseudoElement) finish();
    };

    dialog.dataset.state = "closing";
    dialog.addEventListener("animationend", onAnimationEnd);
    const fallback = window.setTimeout(finish, 600);

    return () => {
      dialog.removeEventListener("animationend", onAnimationEnd);
      window.clearTimeout(fallback);
    };
  }, [open, isClient]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => dialog?.close();
  }, [isClient]);

  if (!isClient) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={cn(styles.dialog, styles[variant], className)}
      aria-labelledby={labelledBy}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={() => {
        // The browser may close a dialog on its own (e.g. repeated Esc).
        if (!closingByUs.current) onClose();
        closingByUs.current = false;
      }}
      onPointerDown={(event) => {
        pressStartedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && pressStartedOnBackdrop.current) onClose();
      }}
    >
      <div className={styles.panel}>{children}</div>
    </dialog>,
    document.body,
  );
}
