import { cn } from "@/shared/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-20", className)}>
      {children}
    </section>
  );
}