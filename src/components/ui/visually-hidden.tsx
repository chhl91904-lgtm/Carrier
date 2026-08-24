import type { ComponentPropsWithoutRef } from "react";

import { classNames } from "@/lib/ui/class-names";

export function VisuallyHidden({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span {...props} className={classNames("visually-hidden", className)} />
  );
}
