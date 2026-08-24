import type { ComponentPropsWithoutRef } from "react";

import { classNames } from "@/lib/ui/class-names";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "info" | "success" | "warning" | "error";
};

export function Badge({
  children,
  className,
  tone = "info",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={classNames("ui-badge", className)}
      data-tone={tone}
    >
      {children}
    </span>
  );
}
