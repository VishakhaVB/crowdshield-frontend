import React from 'react';
import GovernmentHeader from './GovernmentHeader';
import GovernmentFooter from './GovernmentFooter';

const Layout = ({ children, className = "" }) => {
    return (
        <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] font-sans flex flex-col">
            <GovernmentHeader />
            <main className={`flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
                {children}
            </main>
            <GovernmentFooter />
        </div>
    );
};

export default Layout;
