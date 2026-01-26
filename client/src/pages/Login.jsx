import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [mode, setMode] = useState('login'); // 'login' or 'recovery'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitText, setSubmitText] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setSubmitText("Verifying...");

        // Simulate API call/Firebase delay
        setTimeout(() => {
            // Success (Demo Mode logic)
            setSubmitText("Redirecting...");

            // Save to session storage as per original
            sessionStorage.setItem('crowdshield_demo_user', JSON.stringify({ role: 'authority', name: 'Demo User' }));

            setTimeout(() => {
                navigate('/dashboard'); // Changed from '/' to '/dashboard' to actually log in
            }, 800);
        }, 1500);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setMode('recovery');
    };

    const sendRecoveryLink = () => {
        setIsSubmitting(true);
        setSubmitText("Sending...");

        setTimeout(() => {
            setSubmitText("✓ Link Sent Securely");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }, 1500);
    };

    if (mode === 'recovery') {
        return (
            <main className="login-section">
                <div className="login-card fade-in-up">
                    <div className="login-header fade-in-up">
                        <h2>Account Recovery</h2>
                        <p>Please verify your identity</p>
                    </div>

                    <div className="login-form fade-in-up delay-1" style={{ textAlign: 'center', gap: '1rem' }}>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                            A password reset secure link will be sent to your registered official email address.
                        </p>
                        <div className="input-group" style={{ textAlign: 'left' }}>
                            <label>Registered Email ID</label>
                            <input type="email" placeholder="officer@kumbh.gov.in" id="recoveryEmail" />
                        </div>
                        <button
                            className="login-btn"
                            onClick={sendRecoveryLink}
                            disabled={isSubmitting}
                            style={submitText.includes("✓") ? { background: "#22c55e" } : {}}
                        >
                            {isSubmitting ? (submitText || "Sending...") : "Send Recovery Link"}
                        </button>
                        <button
                            className="back-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
                            onClick={() => setMode('login')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="login-section">
            <div className="login-card fade-in-up">
                <div className="login-header">
                    <h2>{t('login.title')}</h2>
                    <p>{t('login.subtitle')}</p>
                </div>

                <p className="role-hint">{t('login.hint')}</p>

                <form className="login-form" onSubmit={onLoginSubmit}>
                    <div className="input-group">
                        <label>{t('login.userIdLabel')}</label>
                        <input type="text" placeholder={t('login.userIdPlaceholder')} required />
                    </div>
                    <div className="input-group">
                        <label>{t('login.passwordLabel')}</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="passwordInput"
                                placeholder={t('login.passwordPlaceholder')}
                                required
                            />
                            <span className="toggle-password" onClick={togglePasswordVisibility}>
                                <svg id="eyeIcon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    {showPassword ? (
                                        <>
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        </>
                                    ) : (
                                        <>
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </>
                                    )}
                                </svg>
                            </span>
                        </div>
                        <a href="#" className="forgot-password-link" onClick={handleForgotPassword}>{t('login.forgotPassword')}</a>
                    </div>

                    <button type="submit" className="login-btn" disabled={isSubmitting}>
                        {isSubmitting ? (submitText || "Verifying...") : t('login.submit')}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="demo-note">{t('login.demoNote')}</p>
                    <Link to="/" className="back-link">{t('login.back')}</Link>
                </div>
            </div>
        </main>
    );
};

export default Login;
