"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";
import { Icon } from "@/shared/ui/Icon";
import { Notice } from "@/shared/ui/Notice";
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
  },
];

/** Card numbers read easier in groups of four; the copied value stays raw. */
function formatForReading(value: string) {
  return /^\d{16}$/.test(value) ? value.replace(/(\d{4})(?=\d)/g, "$1 ") : value;
}

type SupportButtonProps = {
  className?: string;
};

export function SupportButton({ className }: SupportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyResult, setCopyResult] = useState<{
    value: string;
    success: boolean;
  } | null>(null);
  const copying = useRef(false);
  const dialogSession = useRef(0);

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
      <Button
        aria-haspopup="dialog"
        className={className}
        block
        onClick={() => setIsOpen(true)}
      >
        Поддержать
      </Button>

      <Dialog open={isOpen} onClose={closeDialog} labelledBy="support-modal-title">
        <div className={styles.header}>
          <h2 id="support-modal-title" className={styles.title}>
            Сумма не важна. <em>Буду рад любой поддержке.</em>
          </h2>

          <button
            type="button"
            className={styles.close}
            onClick={closeDialog}
            aria-label="Закрыть окно поддержки"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <ul className={styles.details}>
          {paymentDetails.map((detail) => {
            const isCopied = copyResult?.success && copyResult.value === detail.value;

            return (
              <li key={detail.label} className={cn(styles.detail, isCopied && styles.copied)}>
                <div className={styles.detailText}>
                  <p className={styles.detailLabel}>{detail.label}</p>
                  <p className={styles.detailValue} translate="no">
                    {formatForReading(detail.value)}
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  icon={isCopied ? "check" : "copy"}
                  iconPosition="start"
                  className={styles.copyButton}
                  onClick={() => copyToClipboard(detail.value)}
                  aria-label={
                    isCopied
                      ? `Реквизиты ${detail.label} скопированы`
                      : `Скопировать ${detail.label}`
                  }
                >
                  {isCopied ? "Скопировано" : "Скопировать"}
                </Button>
              </li>
            );
          })}
        </ul>

        <div role="status" className={styles.status}>
          {copyResult?.success === false ? (
            <Notice tone="error" title="Не удалось скопировать.">
              Выделите реквизиты и скопируйте их вручную.
            </Notice>
          ) : (
            <p className={styles.hint}>Реквизиты можно выделить и скопировать вручную.</p>
          )}
        </div>
      </Dialog>
    </>
  );
}
