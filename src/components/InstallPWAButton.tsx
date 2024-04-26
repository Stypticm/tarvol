import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
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
    const [isAppInstalled, setIsAppInstalled] = useState(false);

    useEffect(() => {
        // Проверяем состояние установки из локального хранилища
        if (typeof window !== 'undefined') {
            const installed = localStorage.getItem('isAppInstalled') === 'true';
            setIsAppInstalled(installed);
        }
    }, []);

    const handleInstallClick = async () => {
        if (isIos()) {
            alert('Чтобы установить приложение на iOS, нажмите кнопку "Поделиться" и выберите "На экран Домой".');
            localStorage.setItem('isAppInstalled', 'true');
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
            localStorage.setItem('isAppInstalled', 'true');
            setIsAppInstalled(true);
        } else {
            alert("Приложение уже установлено!");
            localStorage.setItem('isAppInstalled', 'true');
            setIsAppInstalled(true);
        }
    };

    return (typeof window !== 'undefined' && !isAppInstalled && (deferredPrompt || isIos()))
        ? (
            <Button onClick={handleInstallClick}>
                {isIos() ? 'Как установить приложение' : 'Установить приложение'}
            </Button>
        ) : null;
};

export default InstallPWAButton;
