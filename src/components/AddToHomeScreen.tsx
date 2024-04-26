import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';


const ModuleLoading = () => <p className="animate-bounce text-white font-bold">Loading...</p>;
const AddToIosSafari = dynamic(() => import('./AddToIosSafari'), { loading: () => <p>Loading...</p> });
const AddToMobileChrome = dynamic(() => import('./AddToMobileChrome'), { loading: () => <p>Loading...</p> });
const AddToMobileFirefox = dynamic(() => import('./AddToMobile'), { loading: () => <p>Loading...</p> });
const AddToMobileFirefoxIos = dynamic(() => import('./AddToMobile'), { loading: () => <p>Loading...</p> });
const AddToMobileChromeIos = dynamic(() => import('./AddToMobile'), { loading: () => <p>Loading...</p> });
const AddToSamsung = dynamic(() => import('./AddToMobile'), { loading: () => <p>Loading...</p> });
const AddToOtherBrowser = dynamic(() => import('./AddToMobile'), { loading: () => <p>Loading...</p> });

import useUserAgent from '@/hooks/useUserAgent';
import { setCookie, getCookie } from 'cookies-next';

type AddToHomeScreenPromptType = 'safari' | 'chrome' | 'firefox' | 'other' | 'firefoxIos' | 'chromeIos' | 'samsung' | '';
const COOKIE_NAME = 'addToHomeScreenPrompt';

export default function AddToHomeScreen() {
    const [displayPrompt, setDisplayPrompt] = useState<AddToHomeScreenPromptType>('');
    const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();

    const closePrompt = () => {
        setDisplayPrompt('');
    };

    const doNotShowAgain = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        setCookie(COOKIE_NAME, 'dontShow', { expires: date });
        setDisplayPrompt('');
    };

    useEffect(() => {
        const addToHomeScreenPromptCookie = getCookie(COOKIE_NAME);

        if (addToHomeScreenPromptCookie !== 'dontShow') {
            if (isMobile && !isStandalone) {
                if (userAgent === 'Safari') {
                    setDisplayPrompt('safari');
                } else if (userAgent === 'Chrome') {
                    setDisplayPrompt('chrome');
                } else if (userAgent === 'Firefox') {
                    setDisplayPrompt('firefox');
                } else if (userAgent === 'FirefoxiOS') {
                    setDisplayPrompt('firefoxIos');
                } else if (userAgent === 'ChromeiOS') {
                    setDisplayPrompt('chromeIos');
                } else if (userAgent === 'SamsungBrowser') {
                    setDisplayPrompt('samsung');
                } else {
                    setDisplayPrompt('other');
                }
            }
        } else {
        }
    }, [userAgent, isMobile, isStandalone, isIOS]);

    const Prompt = () => (
        <>
            {
                {
                    'safari': <AddToIosSafari closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'chrome': <AddToMobileChrome closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'firefox': <AddToMobileFirefox closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'firefoxIos': <AddToMobileFirefoxIos closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'chromeIos': <AddToMobileChromeIos closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'samsung': <AddToSamsung closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'other': <AddToOtherBrowser closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    '': <></>
                }[displayPrompt]
            }
        </>
    )

    return (
        <>
            {
                displayPrompt !== ''
                    ?
                    <>
                        <div
                            className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50"
                            onClick={closePrompt}
                        >
                            <Prompt />
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    );
}