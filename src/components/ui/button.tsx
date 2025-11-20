import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wider ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1",
        outline:
          "border-2 border-primary/30 bg-transparent hover:border-primary hover:bg-primary/10 rounded-full shadow-md hover:shadow-lg hover:shadow-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground rounded-full shadow-md hover:shadow-lg hover:-translate-y-1",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground rounded-full",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 normal-case tracking-normal",
        premium: "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 hover:bg-right transition-all duration-500",
        glass: "bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1",
      },
      size: {
        default: "h-11 px-6 py-2.5 min-w-[44px]",
        sm: "h-9 px-4 min-w-[36px] text-xs",
        lg: "h-14 px-10 min-w-[48px] text-base",
        icon: "h-11 w-11 rounded-full",
        touch: "h-14 px-8 py-4 min-w-[48px] text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
