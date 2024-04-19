'use client'

import firebase_app from '@/firebase/config'
import React, { useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { LogOut } from 'lucide-react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';

const auth = getAuth(firebase_app);
const db = getFirestore()

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathName = usePathname();
    const [user, loading, error] = useAuthState(auth);
    const [currentUser, setCurrentUser] = React.useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setCurrentUser(userDocSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        }
        fetchUserData();
    }, [user, db])

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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <div>
            <div className='bg-slate-500 flex flex-col'>
                <div className='flex flex-col justify-between h-[100vh]'>
                    {
                        currentUser ?
                            <div className='m-2'>
                                <h1>Приветствуем,вас: <span>
                                    {currentUser.email}
                                </span></h1>
                                {
                                    currentUser.role === 'user' ? 'у вас бесплатная подписка' : 'у вас платная подписка'
                                }
                                <div>
                                    {
                                        currentUser.role !== 'subscriber' ?
                                            <p className='flex justify-around'>
                                                {pathName !== '/main/history' ? <Button onClick={() => router.push('/main/history')}>История</Button> : null}
                                                {pathName !== '/main/signals' ? <Button onClick={() => router.push('/main/signals')}>Сигналы</Button> : null}
                                                <Button onClick={() => router.push('/unsubscriber')}>Подписаться</Button>
                                            </p> :
                                            <p className='flex justify-center'>
                                                <Button onClick={() => router.push('/main/history')}>История</Button>
                                                <Button onClick={() => router.push('/main/subscriber')}>Платные сигналы</Button>
                                            </p>
                                    }
                                </div>
                            </div>
                            : <h1>Not Logged In</h1>
                    }

                    {children}

                    {
                        pathName !== '/main/signals' ?
                            <div className='flex justify-between m-2 mb-2'>
                                <Button>
                                    <Link href={'/main/signals'}>Back to signals</Link>
                                </Button>
                                <Button startContent={<LogOut color='black' />} onClick={handleLogout}>Logout</Button>
                            </div> :
                            <div className='flex justify-end m-2 mb-2'>
                                <Button startContent={<LogOut color='black' />} onClick={handleLogout}>Logout</Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainLayout