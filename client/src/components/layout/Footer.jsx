import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="main-footer">
            <div className="trust-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="trust-icon" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>{t('footer.secure')}</span>
            </div>
            <div className="trust-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="trust-icon" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{t('footer.verified')}</span>
            </div>
            <div className="trust-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="trust-icon" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>{t('footer.privacy')}</span>
            </div>
        </footer>
    );
};

export default Footer;
