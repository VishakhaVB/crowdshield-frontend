import * as React from "react"
// import * as TabsPrimitive from "@radix-ui/react-tabs" - Removed as we used custom implementation.
// Wait, user provided snippet uses 'Tabs', 'TabsList', 'TabsTrigger'.
// Since I don't want to install radix-ui just for this if I can avoid it (or I can install it).
// The user snippet imports: import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// I will build a simple Context-based Tab system to avoid installing Radix UI unless necessary for "shadcn" fidelity.
// Simple Context implementation:

import { cn } from "@/lib/utils"

const TabsContext = React.createContext({ value: '', onValueChange: () => { } });

const Tabs = React.forwardRef(({ value, onValueChange, className, ...props }, ref) => (
    <TabsContext.Provider value={{ value, onValueChange }}>
        <div ref={ref} className={cn("", className)} {...props} />
    </TabsContext.Provider>
))
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500",
            className
        )}
        {...props}
    />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(TabsContext);
    const isActive = selectedValue === value;

    return (
        <button
            ref={ref}
            onClick={() => onValueChange(value)}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive ? "bg-white text-slate-950 shadow-sm" : "hover:bg-slate-200/50",
                className
            )}
            {...props}
        />
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
    // User snippet manages content visibility manually: {activeTab === 'overview' && ...}
    // So we might not strictly need TabsContent if the user code doesn't use it.
    // Checking snippet: The user uses <Tabs value={activeTab} onValueChange={setActiveTab}> ... and then conditional rendering {activeTab === 'overview' && ...}
    // They do NOT use <TabsContent>. So I don't need to implement it.
    return null;
})

export { Tabs, TabsList, TabsTrigger, TabsContent }
