"use client";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavlinksProps {
  isMobileNav?: boolean;
  userId?: string;
}
const Navlinks = ({ isMobileNav = false, userId }: NavlinksProps) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        // ✅ Ensure computedRoute is always a string
        const computedRoute =
          typeof item.route === "function"
            ? item.route(userId ?? "")
            : item.route;

        const isActive =
          (pathname.includes(computedRoute) && computedRoute.length > 1) ||
          pathname === computedRoute;

        const LinkComponent = (
          <Link
            href={computedRoute} // ✅ Now this is always a string
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.label}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.label}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default Navlinks;
