import { Button } from '@nextui-org/react';

import { usePWA } from '@/сontext/PWAContext';

const isIos = () => {
    if (typeof window !== 'undefined') {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    }
    return false;
};

const InstallPWAButton = () => {
    const { deferredPrompt, setDeferredPrompt } = usePWA();

    const handleInstallClick = async () => {
        if (isIos()) {
            alert('To install the app, tap the Share icon and then Add to Home Screen.');
            return;
        }

        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            }
            setDeferredPrompt(null);
        } else {
            alert("You have already installed the app!");
        }
    };

    return (typeof window !== 'undefined' && (deferredPrompt || isIos())) && (
        <Button onClick={handleInstallClick}>
            {isIos() ? 'How to install the app' : 'Download App'}
        </Button>
    );
};

export default InstallPWAButton;
