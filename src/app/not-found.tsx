"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      `404 Error: User attempted to access non-existent route: ${pathname}`,
    );
  }, [pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-border/70 bg-card/90 p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
          <AlertTriangle className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-serif text-5xl tracking-tight">404</h1>
        <p className="text-muted-foreground mt-3 text-lg">
          This page got lost, but your next bonus win is still waiting.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Back to Winning Offers</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
