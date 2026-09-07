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
        "group relative rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800/90 dark:bg-slate-900 dark:hover:border-slate-700",
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
