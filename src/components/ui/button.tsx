import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { classNames } from "@/lib/ui/class-names";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingLabel?: string;
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  loadingLabel = "처리 중",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={classNames("ui-button", className)}
      data-loading={isLoading}
      data-variant={variant}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? <span className="ui-spinner" aria-hidden="true" /> : null}
      <span>{isLoading ? loadingLabel : children}</span>
    </button>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Exclude<ButtonVariant, "danger">;
  children: ReactNode;
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={classNames("ui-button", className)}
      data-variant={variant}
    >
      {children}
    </Link>
  );
}
