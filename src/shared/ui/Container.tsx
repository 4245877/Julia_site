import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Container.module.css";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn(styles.container, styles[size], className)} {...props} />;
}
