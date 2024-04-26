import { Button } from '@nextui-org/react';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase_app from '@/firebase/config';
import { usePWA } from '@/сontext/PWAContext';

const auth = getAuth(firebase_app);

const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
};

const InstallPWAButton = () => {
    const { deferredPrompt, setDeferredPrompt } = usePWA();
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!user) {
        return (
            <div className='w-screen h-screen flex flex-col justify-center items-center'>
                <p>Sorry, you are not logged in.</p>
                <Button>
                    <Link href={'/login'}>Sign In</Link>
                </Button>
            </div>
        );
    }

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

    return deferredPrompt && <Button onClick={handleInstallClick}>Download App</Button>;
};

export default InstallPWAButton;
