import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  secondary: "bg-slate-800 text-white hover:bg-slate-700",
  ghost: "bg-white/10 text-white hover:bg-white/15",
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
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold transition",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
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
      className={cn(
        "inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold transition",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}