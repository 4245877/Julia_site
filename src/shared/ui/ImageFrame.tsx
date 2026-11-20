import type { ReactNode } from "react";
import { publicAssetPath } from "@/shared/config/site.config";
import { cn } from "@/shared/lib/cn";
import styles from "./ImageFrame.module.css";

type ImageFrameProps = {
  src: `/${string}`;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  shape?: "soft" | "round";
  className?: string;
};

/** Lazy image in a softly rounded frame; a quiet placeholder breathes until it loads. */
export function ImageFrame({ src, alt, width, height, caption, shape = "soft", className }: ImageFrameProps) {
  return (
    <figure className={cn(styles.figure, className)}>
      <div className={cn(styles.frame, styles[shape])} style={{ aspectRatio: `${width} / ${height}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={publicAssetPath(src)}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
