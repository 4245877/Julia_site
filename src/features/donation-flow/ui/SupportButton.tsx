"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";

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
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

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
      <Button onClick={() => setIsOpen(true)}>Поддержать</Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold">
                Сумма не важна. Буду рад любой поддержке.
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xl leading-none text-slate-700 hover:bg-slate-200"
                aria-label="Закрыть окно поддержки"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4">
              {paymentDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="mb-3 break-all">
                    <span className="font-bold">{detail.label}:</span>{" "}
                    {detail.value}
                  </p>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(detail.value)}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    {copiedValue === detail.value ? "Скопировано" : "Copy"}
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              Google Pay можно подключить следующим шагом отдельным клиентским
              компонентом, чтобы не загружать платёжный SDK на первом экране.
            </p>
          </div>
        </div>
      )}
    </>
  );
}