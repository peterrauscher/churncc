import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ResourceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ResourceCard({
  icon: Icon,
  title,
  description,
}: ResourceCardProps) {
  return (
    <Card className="h-full border-border/70 bg-card/90 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/80">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
