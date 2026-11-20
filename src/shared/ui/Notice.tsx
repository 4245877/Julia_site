import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Icon, type IconName } from "./Icon";
import styles from "./Notice.module.css";

type Tone = "info" | "warning" | "success" | "error";

const toneIcons: Record<Tone, IconName> = {
  info: "info",
  warning: "alert",
  success: "check",
  error: "alert",
};

type NoticeProps = {
  tone?: Tone;
  title?: ReactNode;
  children?: ReactNode;
  role?: "status" | "alert" | "note";
  className?: string;
};

export function Notice({ tone = "info", title, children, role, className }: NoticeProps) {
  return (
    <div className={cn(styles.notice, styles[tone], className)} role={role}>
      <span className={styles.icon}>
        <Icon name={toneIcons[tone]} size={18} />
      </span>
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.text}>{children}</div>}
      </div>
    </div>
  );
}
