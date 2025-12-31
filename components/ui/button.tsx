import * as React from "react"

import { cn } from "@/lib/utils"

// Since we are not installing class-variance-authority or radix-ui slot yet, 
// I will implement a simplified version without them for now to minimize dependencies 
// as requested by the constraint of minimal setup, OR I should install them.
// The user authorized `lucide-react`, `clsx`, `tailwind-merge`.
// I'll stick to pure React + Tailwind for simplicity as promised in the plan.
// If I use CVA I need to install it. I'll do a robust manual implementation.

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // Simplified variant/size logic
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    // Since we don't have CSS variables for colors yet (primary, etc), 
    // we need to either define them in globals.css OR use hardcoded Tailwind colors that match the dark theme in App.tsx
    // The App.tsx uses specific hex codes. 
    // Button default: bg-[#00ff88] text-[#0a0a0a]
    // Button outline: border-[#00ff88] text-[#00ff88]
    
    // I will adapt the classes to use standard Tailwind utility classes that mimic the design or allow overrides.
    // However, to make it genuinely distinct reusable, I should probably stick to standard class merging.
    
    // For this specific integration, I will map the 'default' and 'outline' to generic styles 
    // but the usage in App.tsx passes `className` that overrides colors. 
    // So basic structure is enough.

    const variantClass = variants[variant] || variants.default
    const sizeClass = sizes[size] || sizes.default

    const Comp = "button"
    return (
      <Comp
        className={cn(baseStyles, variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
