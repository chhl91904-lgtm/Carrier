import type { ComponentPropsWithoutRef } from "react";

import { classNames } from "@/lib/ui/class-names";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <article
      {...props}
      className={classNames("ui-card", className)}
      data-interactive={interactive}
    />
  );
}
