import firebase_app from '@/firebase/config';
import { usePWA } from '@/сontext/PWAContext';
import { Button } from '@nextui-org/react';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebase_app);

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
        return <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <p>
                Sorry you are not logged in.
            </p>
            <Button>
                <Link href={'/'}>SignIn</Link>
            </Button>
        </div>;
    }

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        }
        setDeferredPrompt(null);
    };

    return deferredPrompt && <Button onClick={handleInstallClick}>Download App</Button>;
};

export default InstallPWAButton;
