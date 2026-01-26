import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <main className="hero-section">
            <h2 className="hero-title fade-in-up">{t('hero.title')}</h2>
            <p className="hero-subtext fade-in-up delay-1">{t('hero.subtitle')}</p>

            {/* Emergency Banner Removed as per original HTML */}

            <div className="cards-container fade-in-up delay-2">

                {/* CARD 1: AUTHORITY */}
                <Link to="/login" className="access-card authority-card">
                    <div className="card-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L3 7V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V7L12 2Z"
                                fill="#003366" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M12 8L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h3>{t('roles.authority.title')}</h3>
                    <p>{t('roles.authority.desc')}</p>
                    <div className="card-action">{t('roles.authority.action')} &rarr;</div>
                </Link>

                {/* CARD 2: PILGRIM */}
                <Link to="/pilgrim-guidance" className="access-card pilgrim-card">
                    <div className="card-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="4" fill="#FF9933" stroke="white" strokeWidth="1.5" />
                            <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" stroke="#FF9933"
                                strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 14V22" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
                        </svg>
                    </div>
                    <h3>{t('roles.pilgrim.title')}</h3>
                    <p>{t('roles.pilgrim.desc')}</p>
                    <div className="card-action">{t('roles.pilgrim.action')} &rarr;</div>
                </Link>

            </div>
        </main>
    );
};

export default Home;
