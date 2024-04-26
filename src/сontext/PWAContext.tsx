import React, { createContext, useState, useContext, useEffect } from 'react';

const PWAContext = createContext<any>(null);

export const usePWA = () => useContext(PWAContext);

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    return (
        <PWAContext.Provider value={{ deferredPrompt, setDeferredPrompt }}>
            {children}
        </PWAContext.Provider>
    );
};
