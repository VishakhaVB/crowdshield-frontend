import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Eye } from 'lucide-react';

const GovernmentFooter = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-[var(--primary-blue)] text-white mt-auto">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-90">

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[var(--accent-blue)]" />
                            <span>{t('footer.secure')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[var(--accent-blue)]" />
                            <span>{t('footer.verified')}</span>
                        </div>
                    </div>

                    <div className="text-[var(--border-light)] text-xs">
                        &copy; 2026 CrowdShield System. Official Government Platform.
                    </div>

                    <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[var(--accent-blue)]" />
                        <span>{t('footer.privacy')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default GovernmentFooter;
