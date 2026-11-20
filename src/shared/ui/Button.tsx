import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

export function ButtonLink({
  children,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  // Use next/link for internal route navigation so basePath/assetPrefix
  // (GitHub Pages deploy) is applied. Hash anchors and external links stay <a>.
  const isInternalRoute =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export function Button({
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
