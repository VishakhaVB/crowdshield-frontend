import React, { createContext, useContext, useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DialogContext = createContext({});

export function Dialog({ children, open, onOpenChange }) {
    const [isOpen, setIsOpen] = useState(open || false);

    useEffect(() => {
        if (open !== undefined) setIsOpen(open);
    }, [open]);

    const handleOpenChange = (value) => {
        setIsOpen(value);
        onOpenChange?.(value);
    };

    return (
        <DialogContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>
            {children}
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children, asChild }) {
    const { setIsOpen } = useContext(DialogContext);

    if (asChild) {
        return React.cloneElement(children, {
            onClick: (e) => {
                children.props.onClick?.(e);
                setIsOpen(true);
            }
        });
    }

    return <button onClick={() => setIsOpen(true)}>{children}</button>;
}

export function DialogContent({ children, className }) {
    const { isOpen, setIsOpen } = useContext(DialogContext);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <div className={`relative z-50 bg-white rounded-xl shadow-lg border border-slate-200 w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200 ${className}`}>
                {children}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export function DialogHeader({ children, className }) {
    return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className }) {
    return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
}
