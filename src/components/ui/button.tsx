"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-forest)] px-5 py-3 text-white shadow-card hover:bg-[var(--color-forest-mid)]",
        secondary:
          "bg-white/10 px-5 py-3 text-[var(--text-primary)] backdrop-blur hover:bg-white/20 dark:bg-white/5",
        ghost:
          "px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]",
        outline:
          "border border-[var(--border-raw)] px-5 py-3 text-[var(--text-primary)] hover:bg-[var(--bg-muted)]",
        amber:
          "bg-[var(--color-amber)] px-5 py-3 text-white shadow-card hover:bg-[#b96306]",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
