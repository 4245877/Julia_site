import type { SVGProps } from "react";

/*
 * Line icons drawn on a 24px grid: 1.5px strokes, round caps and joins —
 * soft, calm geometry that matches the typography.
 */
const paths = {
  "arrow-right": <path d="M4.5 12h15m-5.5-5.5L19.5 12 14 17.5" />,
  "arrow-down": <path d="M12 4.5v15m-5.5-5.5L12 19.5l5.5-5.5" />,
  "arrow-left": <path d="M19.5 12h-15M10 6.5 4.5 12l5.5 5.5" />,
  "arrow-up-right": <path d="M7 17 17 7M8.5 7H17v8.5" />,
  check: <path d="m5 12.5 4.3 4.3L19 7.2" />,
  close: <path d="m6.5 6.5 11 11m0-11-11 11" />,
  "chevron-down": <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.75" />
      <path d="M15.5 8.5V7a2.5 2.5 0 0 0-2.5-2.5H7A2.5 2.5 0 0 0 4.5 7v6A2.5 2.5 0 0 0 7 15.5h1.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.2M12 7.9v.1" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.6v5.2M12 15.9v.1" />
    </>
  ),
  /* Architecture */
  core: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <circle cx="12" cy="12" r="6" />
      <path d="M12 2.5v1.8M12 19.7v1.8M2.5 12h1.8M19.7 12h1.8" />
    </>
  ),
  memory: <path d="m12 4 8 4-8 4-8-4 8-4Zm-8 8 8 4 8-4M4 16l8 4 8-4" />,
  chip: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3" />
    </>
  ),
  /* Brain model */
  cortex: <path d="M3.5 13c1.6-3.4 3.4-3.4 5 0s3.4 3.4 5 0 3.4-3.4 5 0M5.5 8.5c1.2-1.7 2.6-1.7 3.8 0M14.7 17.5c1.2 1.7 2.6 1.7 3.8 0" />,
  episode: (
    <>
      <path d="M4 12h16" />
      <circle cx="6.5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="17.5" cy="12" r="2" />
      <path d="M12 6V4.5M17.5 7.5V6" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="4.5" r="1.5" />
      <circle cx="12" cy="19.5" r="1.5" />
      <circle cx="4.5" cy="12" r="1.5" />
      <circle cx="19.5" cy="12" r="1.5" />
      <path d="M12 6v3.4M12 14.6V18M6 12h3.4M14.6 12H18" />
    </>
  ),
  fork: (
    <>
      <path d="M12 20v-6.5m0 0L6.8 7.4M12 13.5l5.2-6.1" />
      <circle cx="6" cy="6.3" r="1.8" />
      <circle cx="18" cy="6.3" r="1.8" />
    </>
  ),
  refine: <path d="M3.5 12c2.2-5 4.4-5 6.6 0 1.6 3.4 3.2 3.4 4.8 0 1.1-2.2 2.3-2.2 3.4 0 .6 1.1 1.2 1.1 1.7 0" />,
  steps: <path d="M4 19.5h4v-4h4v-4h4v-4h4M4 19.5V17" />,
  /* Features & profile */
  perception: (
    <>
      <path d="M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  sprout: <path d="M12 20.5V12m0 0c0-4.1 2.8-6.6 7.5-6.6 0 4.1-2.9 6.6-7.5 6.6Zm0 2.4c0-3.4-2.3-5.4-6.2-5.4 0 3.4 2.4 5.4 6.2 5.4Z" />,
  persona: (
    <>
      <circle cx="12" cy="8.8" r="3.6" />
      <path d="M5 19.6c1.4-3.3 4-5 7-5s5.6 1.7 7 5" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.5 17.5 4.7-4.4 3.3 3 2.6-2.4 4.4 3.8" />
    </>
  ),
  voice: <path d="M4.5 10.5v3M8.25 7.5v9M12 4.5v15M15.75 8.5v7M19.5 10.5v3" />,
  sliders: (
    <>
      <path d="M4 8h9m4 0h3M4 16h3m4 0h9" />
      <circle cx="15" cy="8" r="2" />
      <circle cx="9" cy="16" r="2" />
    </>
  ),
  github: (
    <>
      <path d="M9.5 19.2c-3.6 1.1-3.6-1.9-5-2.3m10 4.6v-3.2c0-.9.1-1.3-.4-1.8 2.3-.3 4.6-1.1 4.6-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0C7.4 5.8 6.5 6.1 6.5 6.1a3.6 3.6 0 0 0-.1 2.7 3.9 3.9 0 0 0-1.1 2.7c0 3.9 2.3 4.7 4.6 5-.5.5-.5 1-.4 1.8v3.2" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number | string;
};

export function Icon({ name, size = "1.25em", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
