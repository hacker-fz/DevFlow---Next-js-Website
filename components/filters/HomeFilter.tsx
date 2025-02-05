"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

const filters = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Recomended", value: "recomended" },
  { name: "Unanswered", value: "unanswered" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleClick = (filter: string) => {
    let newUrl = "";
    if (filter !== active) {
      setActive(filter);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    } else {
      setActive("");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="sm:flex flex-wrap gap-3 mt-10 hidden">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active !== filter.value
              ? "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500 hover:dark:bg-dark-300 hover:bg-light-800 "
              : "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
          )}
          onClick={() => handleClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
