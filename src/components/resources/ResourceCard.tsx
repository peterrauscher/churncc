import { Bezel } from "@/components/shared/Bezel";

interface ResourceCardProps {
  icon: React.ComponentType<{ className?: string; weight?: "light" }>;
  title: string;
  description: string;
}

export function ResourceCard({
  icon: Icon,
  title,
  description,
}: ResourceCardProps) {
  return (
    <Bezel className="h-full">
      <div className="flex h-full flex-col p-7">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5">
          <Icon weight="light" className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
    </Bezel>
  );
}
