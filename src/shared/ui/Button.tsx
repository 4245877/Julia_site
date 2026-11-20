import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type ButtonStyleProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  icon?: IconName;
  iconPosition?: "start" | "end";
  block?: boolean;
};

function buttonClassName(
  { variant = "primary", size = "md", block }: ButtonStyleProps,
  className?: string,
) {
  return cn(styles.button, styles[variant], styles[size], block && styles.block, className);
}

function ButtonContent({
  children,
  icon,
  iconPosition = "end",
}: Pick<ButtonStyleProps, "icon" | "iconPosition"> & { children: ReactNode }) {
  const iconNode = icon ? <Icon name={icon} className={styles.icon} data-icon={icon} /> : null;

  return (
    <>
      {iconPosition === "start" && iconNode}
      <span className={styles.label}>{children}</span>
      {iconPosition === "end" && iconNode}
    </>
  );
}

export function ButtonLink({
  children,
  href,
  variant,
  size,
  icon,
  iconPosition,
  block,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyleProps) {
  const classes = buttonClassName({ variant, size, block }, className);
  const content = (
    <ButtonContent icon={icon} iconPosition={iconPosition}>
      {children}
    </ButtonContent>
  );

  // Use next/link for internal route navigation so basePath/assetPrefix
  // (GitHub Pages deploy) is applied. Hash anchors and external links stay <a>.
  const isInternalRoute =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}

export function Button({
  children,
  type = "button",
  variant,
  size,
  icon,
  iconPosition,
  block,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps) {
  return (
    <button type={type} className={buttonClassName({ variant, size, block }, className)} {...props}>
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </button>
  );
}
