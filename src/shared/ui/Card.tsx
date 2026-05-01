import { cn } from "@/shared/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20",
        className,
      )}
    >
      {children}
    </div>
  );
}