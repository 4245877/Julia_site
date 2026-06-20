import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

// Map to the "Thorn Princess" design-system button classes (globals.css)
// so buttons match the crimson/gold theme instead of the default blue.
const variantClasses: Record<Variant, string> = {
  primary: "btn btn--primary",
  secondary: "btn btn--secondary",
  ghost: "btn btn--ghost",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  href,
  ...props
}: ButtonLinkProps) {
  const classes = cn(variantClasses[variant], className);

  // Use next/link for internal route navigation so basePath/assetPrefix
  // (GitHub Pages deploy) is applied. Hash anchors and external links stay <a>.
  const isInternalRoute =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}