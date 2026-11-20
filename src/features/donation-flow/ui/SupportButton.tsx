"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SupportButton.module.css";

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
    isGold: true,
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

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
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
        className={styles.triggerBtn}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        Поддержать
      </button>

      {isOpen && (
        <dialog
          ref={dialogRef}
          className={styles.backdrop}
          aria-labelledby="support-modal-title"
          onCancel={(event) => {
            event.preventDefault();
            closeDialog();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div className={styles.modal}>
            <div className={styles.header}>
              <h2 id="support-modal-title" className={styles.title}>
                Сумма не важна.{" "}
                <span className={styles.titleAccent}>
                  Буду рад любой поддержке.
                </span>
              </h2>

              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeDialog}
                aria-label="Закрыть окно поддержки"
              >
                ×
              </button>
            </div>

            <div className={styles.cardsGrid}>
              {paymentDetails.map((detail) => {
                const isCopied =
                  copyResult?.success && copyResult.value === detail.value;

                return (
                  <div
                    key={detail.label}
                    className={[
                      styles.payCard,
                      detail.isGold ? styles["payCard--gold"] : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <p
                      className={[
                        styles.cardLabel,
                        detail.isGold ? styles["cardLabel--gold"] : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {detail.label}
                    </p>

                    <p className={styles.cardValue}>{detail.value}</p>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(detail.value)}
                      aria-label={
                        isCopied
                          ? `Реквизиты ${detail.label} скопированы`
                          : `Скопировать ${detail.label}`
                      }
                      className={[
                        styles.copyBtn,
                        isCopied ? styles["copyBtn--copied"] : "",
                        isCopied ? styles["copyBtn--ripple"] : "",
                        detail.isGold ? styles["copyBtn--gold"] : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {isCopied ? "Скопировано" : "Скопировать"}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className={styles.ornamentDivider}>Support</div>

            <p className={styles.footerNote} role="status">
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
