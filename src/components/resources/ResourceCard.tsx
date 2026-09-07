interface ResourceCardProps {
  icon: React.ComponentType<{
    className?: string;
    weight?: "bold" | "fill" | "regular" | "light";
  }>;
  title: string;
  description: string;
}

export function ResourceCard({
  icon: Icon,
  title,
  description,
}: ResourceCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)] dark:bg-slate-900">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
        <Icon weight="bold" className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default ResourceCard;
