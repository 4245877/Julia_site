import { cn } from "@/shared/lib/cn";
import styles from "./QuietPool.module.css";

/*
 * «Тихая заводь» (静江 — "quiet inlet"): still water with rings spreading
 * from a warm ember. The rings are layers of the cognitive system, the
 * points on them are its modules, and slow pulses travel along the threads.
 * Purely decorative — the same information is in the hero text.
 */

type PoolNode = {
  label: string;
  radius: number;
  angle: number;
  side: "start" | "end";
  delay: number;
};

const nodes: readonly PoolNode[] = [
  { label: "внимание", radius: 84, angle: -118, side: "end", delay: 0 },
  { label: "память", radius: 146, angle: 196, side: "end", delay: 1.4 },
  { label: "восприятие", radius: 206, angle: -38, side: "start", delay: 2.9 },
  { label: "мотивация", radius: 146, angle: 30, side: "start", delay: 4.1 },
  { label: "планирование", radius: 206, angle: 142, side: "end", delay: 5.6 },
  { label: "внутреннее состояние", radius: 262, angle: 76, side: "start", delay: 7 },
];

function polar(radius: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.round(radius * Math.cos(rad) * 10) / 10, y: Math.round(radius * Math.sin(rad) * 10) / 10 };
}

type QuietPoolProps = {
  className?: string;
  /** Hide module labels (e.g. for a smaller, purely atmospheric use). */
  labels?: boolean;
  idPrefix?: string;
};

export function QuietPool({ className, labels = true, idPrefix = "pool" }: QuietPoolProps) {
  const surfaceId = `${idPrefix}-surface`;
  const emberId = `${idPrefix}-ember`;

  return (
    <div className={cn(styles.pool, className)} aria-hidden="true">
      <svg className={styles.svg} viewBox="-320 -300 640 600" focusable="false">
        <defs>
          <radialGradient id={surfaceId}>
            <stop offset="0" className={styles.surfaceStopInner} />
            <stop offset="0.72" className={styles.surfaceStopMid} />
            <stop offset="1" className={styles.surfaceStopOuter} />
          </radialGradient>
          <radialGradient id={emberId}>
            <stop offset="0" className={styles.emberStopInner} />
            <stop offset="1" className={styles.emberStopOuter} />
          </radialGradient>
        </defs>

        <circle r="276" fill={`url(#${surfaceId})`} />

        <g className={styles.rings}>
          <circle r="84" className={styles.ring} />
          <circle r="146" className={cn(styles.ring, styles.dashed, styles.drift)} />
          <circle r="206" className={cn(styles.ring, styles.faint)} />
          <circle r="262" className={cn(styles.ring, styles.dashed, styles.faint, styles.driftBack)} />
        </g>

        <g>
          {nodes.map((node) => {
            const { x, y } = polar(node.radius, node.angle);
            return (
              <g key={node.label}>
                <line x1="0" y1="0" x2={x} y2={y} className={styles.thread} />
                <line
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  pathLength={100}
                  className={styles.pulse}
                  style={{ animationDelay: `${node.delay}s` }}
                />
              </g>
            );
          })}
        </g>

        <g>
          {nodes.map((node, index) => {
            const { x, y } = polar(node.radius, node.angle);
            const offset = node.side === "start" ? 14 : -14;
            return (
              <g key={node.label}>
                <circle
                  cx={x}
                  cy={y}
                  r={index === 0 ? 6.5 : 5.5}
                  className={cn(styles.node, index === 0 && styles.nodeFilled)}
                  style={{ animationDelay: `${node.delay * 0.7}s` }}
                />
                {labels && (
                  <text
                    x={x + offset}
                    y={y}
                    dy="0.35em"
                    textAnchor={node.side}
                    className={styles.label}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        <circle r="62" fill={`url(#${emberId})`} className={styles.glow} />
        <circle r="6.5" className={styles.ember} />
      </svg>
    </div>
  );
}
