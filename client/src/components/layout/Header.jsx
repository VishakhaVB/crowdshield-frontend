import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="main-header">
            <div className="logo-section">
                {/* SVG Logo Placeholder - kept empty as per original code */}

                <div className="title-group">
                    <h1>{t('header.title')}</h1>
                    <p className="subtitle">{t('header.subtitle')}</p>
                </div>
            </div>

            <div className="language-toggle">
                <button
                    className={`lang-btn ${i18n.language === 'hi' ? 'active' : ''}`}
                    onClick={() => changeLanguage('hi')}
                >
                    Hindi
                </button>
                <button
                    className={`lang-btn ${i18n.language === 'mr' ? 'active' : ''}`}
                    onClick={() => changeLanguage('mr')}
                >
                    Marathi
                </button>
                <button
                    className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => changeLanguage('en')}
                >
                    English
                </button>
            </div>
        </header>
    );
};

export default Header;
