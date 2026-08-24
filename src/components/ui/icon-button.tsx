import type { ComponentPropsWithRef } from "react";

import { classNames } from "@/lib/ui/class-names";

type IconButtonProps = Omit<ComponentPropsWithRef<"button">, "aria-label"> & {
  label: string;
};

export function IconButton({
  children,
  className,
  label,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={classNames("ui-icon-button", className)}
      aria-label={label}
    >
      {children}
    </button>
  );
}
