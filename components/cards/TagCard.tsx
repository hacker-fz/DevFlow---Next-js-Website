import Link from "next/link";
import React from "react";
import ROUTES from "@/constants/routes";
import { Badge } from "../ui/badge";
import { cn, getDeviconClassName } from "@/lib/utils";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const iconClass = getDeviconClassName(name);
  const content = (
    <>
      <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase flex flex-row gap-2">
        <span className="flex-center space-x-2">
          <i className={cn(iconClass, "text-sm")} />
          <span>{name}</span>
        </span>
        {remove && (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close"
            className="invert-0 dark:invert object-contain cursor-pointer"
            onClick={handleRemove}
          />
        )}
      </Badge>
      {showCount && (
        <span className="small-medium text-dark500_light700 ">{questions}</span>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button className="flex justify-between gap-2">{content}</button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  }
};

export default TagCard;
