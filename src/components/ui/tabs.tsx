
/**
 * Tabs Component (EDITING INSTRUCTIONS)
 * 
 * ## Customizing Animations/Smooth Transitions:
 * - To make tab content animate even more smoothly, tweak the classes for `TabsContent` below (e.g. durations, keyframes).
 * - To add new tab variations or triggers, copy structure of `TabsTrigger`.
 * 
 * ## Main Behaviors:
 * - Tab triggers animate the underline with a slide effect.
 * - Tab panels now use both fade+slide by default for extremely smooth transitions.
 */

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-tech-dark/80 p-1 text-muted-foreground backdrop-blur-sm border border-tech-purple/20",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-tech-purple/20 data-[state=active]:text-foreground data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.3)]",
      "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-tech-purple after:transition-transform after:duration-300",
      "data-[state=active]:after:scale-x-100",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // Prepend: smoother fade+slide both with a delay
      "mt-2 ring-offset-background transition-all duration-500 ease-[cubic-bezier(.65,.04,.36,1)]",
      "data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-4 data-[state=inactive]:pointer-events-none",
      "data-[state=active]:opacity-100 data-[state=active]:translate-y-0",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
