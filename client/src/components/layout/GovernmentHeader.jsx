import React from 'react';
import { useTranslation } from 'react-i18next';

const GovernmentHeader = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="bg-[var(--bg-card)] border-b border-[var(--border-light)] shadow-sm sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    {/* Placeholder for Government Seal/Logo */}
                    <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-serif font-bold text-xl">C</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[var(--primary-blue)] font-serif font-bold text-lg leading-tight tracking-tight">
                            {t('header.title')}
                        </h1>
                        <p className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-wider">
                            {t('header.subtitle')}
                        </p>
                    </div>
                </div>

                {/* Language Toggle */}
                <div className="bg-[var(--bg-app)] p-1 rounded-full flex items-center border border-[var(--border-light)]">
                    {['hi', 'mr', 'en'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => changeLanguage(lang)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${i18n.language === lang
                                ? 'bg-white text-[var(--text-main)] shadow-sm'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                                }`}
                        >
                            {lang === 'hi' ? 'Hindi' : lang === 'mr' ? 'Marathi' : 'English'}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default GovernmentHeader;
