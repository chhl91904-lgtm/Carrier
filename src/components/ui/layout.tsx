import type { CSSProperties, ComponentPropsWithoutRef } from "react";

import { classNames } from "@/lib/ui/class-names";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "narrow" | "default" | "wide";
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={classNames("ui-container", className)}
      data-size={size}
    />
  );
}

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "default" | "surface" | "dark";
};

export function Section({
  className,
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={classNames("ui-section", className)}
      data-tone={tone}
    />
  );
}

type StackProps = ComponentPropsWithoutRef<"div"> & {
  gap?: string;
};

export function Stack({ className, gap, style, ...props }: StackProps) {
  return (
    <div
      {...props}
      className={classNames("ui-stack", className)}
      style={{ ...style, "--stack-gap": gap } as CSSProperties}
    />
  );
}

type ClusterProps = ComponentPropsWithoutRef<"div"> & {
  gap?: string;
};

export function Cluster({ className, gap, style, ...props }: ClusterProps) {
  return (
    <div
      {...props}
      className={classNames("ui-cluster", className)}
      style={{ ...style, "--cluster-gap": gap } as CSSProperties}
    />
  );
}

type GridProps = ComponentPropsWithoutRef<"div"> & {
  columns?: 1 | 2 | 3;
  gap?: string;
};

export function Grid({
  className,
  columns = 1,
  gap,
  style,
  ...props
}: GridProps) {
  return (
    <div
      {...props}
      className={classNames("ui-grid", className)}
      data-columns={columns}
      style={{ ...style, "--grid-gap": gap } as CSSProperties}
    />
  );
}
