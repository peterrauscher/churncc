import { cn } from "@/lib/utils";

interface BezelProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function Bezel({ children, className, innerClassName }: BezelProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-foreground/[0.04] p-1.5 ring-1 ring-foreground/5",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[calc(2rem-0.375rem)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
