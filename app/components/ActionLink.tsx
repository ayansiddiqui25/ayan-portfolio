import type { ComponentPropsWithoutRef } from "react";

type ActionLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
  compact?: boolean;
};

/** Navigation CTA. Use a native button with the same classes for state-changing actions. */
export function ActionLink({ variant = "primary", compact = false, className = "", children, ...props }: ActionLinkProps) {
  return <a {...props} className={`action action--${variant}${compact ? " action--compact" : ""} ${className}`.trim()}>
    <span>{children}</span><span className="action__icon" aria-hidden="true">↗</span>
  </a>;
}
