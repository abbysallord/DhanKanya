import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
  activeItem: string | null;
  toggleItem: (value: string) => void;
} | null>(null)

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; collapsible?: boolean }
>(({ className, children, type, collapsible, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  const toggleItem = (value: string) => {
    setActiveItem((prev) => (prev === value ? null : value))
  }

  return (
    <AccordionContext.Provider value={{ activeItem, toggleItem }}>
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    // We attach the value to the div so we can access it if needed, but context handles logic
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionTrigger must be used within Accordion")
  
  // Need to find the parent AccordionItem's value. 
  // In a proper implementation we'd use a context for Item too. 
  // Let's create an ItemContext to be cleaner.
  return (
      <ItemContext.Consumer>
          {({ value }) => {
              const isOpen = context.activeItem === value
              return (
                <div className="flex">
                    <button
                        ref={ref}
                        onClick={() => context.toggleItem(value)}
                        className={cn(
                        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                        className
                        )}
                        data-state={isOpen ? "open" : "closed"}
                        {...props}
                    >
                        {children}
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    </button>
                    </div>
              )
          }}
      </ItemContext.Consumer>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    
     return (
      <ItemContext.Consumer>
          {({ value }) => {
              const isOpen = context?.activeItem === value
              return (
                  <div
                  ref={ref}
                  className={cn(
                      "overflow-hidden text-sm transition-all duration-200 ease-in-out grid",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      className
                  )}
                  {...props}
                  >
                  <div className="overflow-hidden">
                    <div className="pb-4 pt-0">{children}</div>
                  </div>
                  </div>
              )
          }}
      </ItemContext.Consumer>
     )
})
AccordionContent.displayName = "AccordionContent"

// Helper context for Item
const ItemContext = React.createContext<{ value: string }>({ value: "" })

// Wrapper for Item to provide context
const AccordionItemWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
  <ItemContext.Provider value={{ value }}>
    <div ref={ref} className={cn("border-b", className)} {...props}>
        {children}
    </div>
  </ItemContext.Provider>
))
AccordionItemWrapper.displayName = "AccordionItem"

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent }
