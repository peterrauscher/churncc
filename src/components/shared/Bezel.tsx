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
        "group relative rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)] dark:bg-slate-900",
        className,
      )}
    >
      <div
        className={cn("h-full w-full rounded-[calc(1rem-1px)]", innerClassName)}
      >
        {children}
      </div>
    </div>
  );
}

export default Bezel;
