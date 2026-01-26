import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function createPageUrl(page) {
    // Simple mapping mock
    const map = {
        'AuthorityLogin': '/login',
        'Home': '/',
        'Dashboard': '/dashboard'
    };
    return map[page] || '/';
}
