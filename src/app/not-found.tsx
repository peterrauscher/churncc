"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { WarningCircle } from "@phosphor-icons/react";
import { IslandLink } from "@/components/shared/IslandLink";
import { Bezel } from "@/components/shared/Bezel";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      `404 Error: User attempted to access non-existent route: ${pathname}`,
    );
  }, [pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Bezel className="w-full max-w-xl">
        <div className="px-8 py-14 text-center md:px-12">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/5">
            <WarningCircle weight="light" className="h-6 w-6 text-gold" />
          </div>
          <p className="mb-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Missing page
          </p>
          <h1 className="font-serif text-6xl tracking-tight">404</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
            This page got lost, but the next bonus is still on the table.
          </p>
          <div className="mt-8 flex justify-center">
            <IslandLink href="/">Back to offers</IslandLink>
          </div>
        </div>
      </Bezel>
    </div>
  );
};

export default NotFound;
