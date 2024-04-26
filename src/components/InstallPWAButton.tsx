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
            alert('Чтобы установить приложение на iOS, нажмите кнопку "Поделиться" и выберите "На экран Домой".');
            setDeferredPrompt(null);
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
            alert("Приложение уже установлено!");
            setDeferredPrompt(null);
        }
    };

    return (typeof window !== 'undefined' && (deferredPrompt || isIos())) && (
        <Button onClick={handleInstallClick}>
            {isIos() ? 'Как установить приложение' : 'Установить приложение'}
        </Button>
    );
};

export default InstallPWAButton;
