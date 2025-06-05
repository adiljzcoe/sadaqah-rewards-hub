
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Heart } from "lucide-react"

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
  donationAmount?: string
  currency?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, donationAmount, currency = "£", ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
    const [hearts, setHearts] = React.useState<Array<{ id: number; x: number; y: number; delay: number; showAmount: boolean }>>([]);
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

        console.log('Central Button: Creating ripple and hearts at', { x, y });

        // Create ripple effect
        const rippleId = Date.now();
        setRipples(prev => {
          const newRipples = [...prev, { id: rippleId, x, y }];
          console.log('Central Button: Updated ripples:', newRipples);
          return newRipples;
        });

        // Create multiple heart effects (4-6 hearts) - only first one shows amount
        const heartCount = Math.floor(Math.random() * 3) + 4; // 4-6 hearts
        const newHearts = [];
        
        for (let i = 0; i < heartCount; i++) {
          const heartId = Date.now() + i;
          const offsetX = (Math.random() - 0.5) * 60; // Horizontal spread
          const delay = i * 150; // Stagger timing
          
          newHearts.push({
            id: heartId,
            x: x + offsetX,
            y: y,
            delay,
            showAmount: i === 0 // Only first heart shows amount
          });
        }

        setHearts(prev => {
          const updatedHearts = [...prev, ...newHearts];
          console.log('Central Button: Updated hearts:', updatedHearts);
          return updatedHearts;
        });

        // Remove ripple after animation
        setTimeout(() => {
          console.log('Central Button: Removing ripple', rippleId);
          setRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
        }, 1000);

        // Remove hearts after animation
        setTimeout(() => {
          console.log('Central Button: Removing hearts');
          setHearts(prev => prev.filter(heart => !newHearts.some(newHeart => newHeart.id === heart.id)));
        }, 6000);
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
        {/* Enhanced CSS animation styles */}
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
            
            @keyframes dreamyFloatUp {
              0% {
                opacity: 0;
                transform: translateY(0) scale(0.5);
              }
              15% {
                opacity: 1;
                transform: translateY(-30px) scale(1);
              }
              100% {
                opacity: 0;
                transform: translateY(-200px) scale(0.8);
              }
            }
            .dreamy-float-up {
              animation: dreamyFloatUp 5s ease-out forwards;
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
        
        {/* Floating hearts with dreamy effect - positioned outside button */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="fixed pointer-events-none dreamy-float-up"
            style={{
              left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left + heart.x - 25 : 0,
              top: buttonRef.current ? buttonRef.current.getBoundingClientRect().top + heart.y - 25 : 0,
              zIndex: 99999,
              animationDelay: `${heart.delay}ms`,
            }}
          >
            <div className="flex flex-col items-center">
              <Heart className="h-8 w-8 text-pink-500 fill-pink-500 drop-shadow-lg" />
              {heart.showAmount && (
                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-xl border-2 border-pink-300 mt-2">
                  <span className="text-sm font-bold text-emerald-600">
                    +{currency}{donationAmount || '25'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
