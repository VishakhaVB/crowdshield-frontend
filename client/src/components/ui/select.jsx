import React, { createContext, useContext, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const SelectContext = createContext({});

export function Select({ value, onValueChange, children }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);

    const handleValueChange = (val) => {
        setSelectedValue(val);
        onValueChange?.(val);
        setOpen(false);
    };

    return (
        <SelectContext.Provider value={{ open, setOpen, value: selectedValue, onValueChange: handleValueChange }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    );
}

export function SelectTrigger({ children, className }) {
    const { open, setOpen, value } = useContext(SelectContext);
    return (
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    );
}

export function SelectValue({ placeholder }) {
    const { value } = useContext(SelectContext);
    return <span style={{ pointerEvents: 'none' }}>{value || placeholder}</span>;
}

export function SelectContent({ children, className }) {
    const { open } = useContext(SelectContext);
    if (!open) return null;

    return (
        <div className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md animate-in fade-in-80 w-full mt-1 ${className}`}>
            <div className="p-1">{children}</div>
        </div>
    );
}

export function SelectItem({ value, children, className }) {
    const { value: selectedValue, onValueChange } = useContext(SelectContext);
    const isSelected = selectedValue === value;

    return (
        <div
            onClick={() => onValueChange(value)}
            className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isSelected && <Check className="h-4 w-4" />}
            </span>
            {children}
        </div>
    );
}
