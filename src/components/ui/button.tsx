
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => buttonRef.current!);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log('Central Button: Click detected!');
      
      if (buttonRef.current) {
        // Get button position and click position
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        console.log('Central Button: Creating ripple at', { x, y });

        // Create ripple effect
        const rippleId = Date.now();
        setRipples(prev => {
          const newRipples = [...prev, { id: rippleId, x, y }];
          console.log('Central Button: Updated ripples:', newRipples);
          return newRipples;
        });

        // Remove ripple after animation
        setTimeout(() => {
          console.log('Central Button: Removing ripple', rippleId);
          setRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
        }, 1000);
      }

      // Call the original onClick if provided
      if (onClick) {
        console.log('Central Button: Calling original onClick');
        onClick(e);
      }
    };

    const Comp = asChild ? Slot : "button"
    return (
      <>
        {/* Ripple effect styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes centralRipple {
              0% {
                transform: scale(0);
                opacity: 1;
              }
              100% {
                transform: scale(4);
                opacity: 0;
              }
            }
            .central-ripple {
              animation: centralRipple 1s linear;
            }
          `
        }} />
        
        <Comp
          ref={buttonRef}
          className={cn(buttonVariants({ variant, size, className }), "relative overflow-hidden")}
          onClick={handleClick}
          {...props}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute pointer-events-none rounded-full bg-white/40 central-ripple"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                transformOrigin: 'center',
              }}
            />
          ))}
          
          {props.children}
        </Comp>
      </>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
