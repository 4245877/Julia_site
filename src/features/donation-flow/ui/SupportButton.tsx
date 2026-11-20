"use client";

import { useEffect, useRef, useState } from "react";

const paymentDetails = [
  {
    label: "Visa UAH",
    value: "4441111042472401",
  },
  {
    label: "Visa USD",
    value: "4441111082147673",
  },
  {
    label: "Bitcoin",
    value: "bc1pj4udvfs3tdkjeakkfl2clklztusqllgtgz5c8up0u0lcq7ymnjssexnazw",
  },
];

export function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyResult, setCopyResult] = useState<{
    value: string;
    success: boolean;
  } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copying = useRef(false);
  const dialogSession = useRef(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!isOpen || !dialog) return;

    dialog.showModal();

    return () => {
      dialog.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!copyResult?.success) return;

    const timer = window.setTimeout(() => setCopyResult(null), 1800);
    return () => window.clearTimeout(timer);
  }, [copyResult]);

  function closeDialog() {
    dialogSession.current += 1;
    setCopyResult(null);
    setIsOpen(false);
  }

  async function copyToClipboard(value: string) {
    if (copying.current) return;

    copying.current = true;
    const session = dialogSession.current;
    let success: boolean;
    try {
      await navigator.clipboard.writeText(value);
      success = true;
    } catch {
      success = false;
    }
    copying.current = false;

    if (session === dialogSession.current) {
      setCopyResult({ value, success });
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        Поддержать
      </button>

      {isOpen && (
        <dialog
          ref={dialogRef}
          aria-labelledby="support-modal-title"
          onCancel={(event) => {
            event.preventDefault();
            closeDialog();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div>
            <div>
              <h2 id="support-modal-title">
                Сумма не важна. Буду рад любой поддержке.
              </h2>

              <button
                type="button"
                onClick={closeDialog}
                aria-label="Закрыть окно поддержки"
              >
                ×
              </button>
            </div>

            <div>
              {paymentDetails.map((detail) => {
                const isCopied =
                  copyResult?.success && copyResult.value === detail.value;

                return (
                  <div key={detail.label}>
                    <p>{detail.label}</p>

                    <p>{detail.value}</p>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(detail.value)}
                      aria-label={
                        isCopied
                          ? `Реквизиты ${detail.label} скопированы`
                          : `Скопировать ${detail.label}`
                      }
                    >
                      {isCopied ? "Скопировано" : "Скопировать"}
                    </button>
                  </div>
                );
              })}
            </div>

            <p role="status">
              {copyResult?.success === false
                ? "Не удалось скопировать. Выделите реквизиты и скопируйте их вручную."
                : "Реквизиты можно выделить и скопировать вручную."}
            </p>
          </div>
        </dialog>
      )}
    </>
  );
}
