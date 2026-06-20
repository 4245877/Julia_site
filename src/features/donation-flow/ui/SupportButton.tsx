"use client";

import { useEffect, useState } from "react";
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
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      window.setTimeout(() => setCopiedValue(null), 1800);
    } catch {
      setCopiedValue(null);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={() => setIsOpen(true)}
      >
        Поддержать
      </button>

      {isOpen && (
        <div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="support-modal-title"
          onClick={() => setIsOpen(false)}
        >
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
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
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть окно поддержки"
              >
                ×
              </button>
            </div>

            <div className={styles.cardsGrid}>
              {paymentDetails.map((detail) => {
                const isCopied = copiedValue === detail.value;

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

            <p className={styles.footerNote}>
              Google Pay можно подключить следующим шагом отдельным клиентским
              компонентом, чтобы не загружать платёжный SDK на первом экране.
            </p>
          </div>
        </div>
      )}
    </>
  );
}