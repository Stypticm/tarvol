'use client'

import { HistoryMonth } from '@/features/hisyotyTypes'
import firebase_app from '@/firebase/config'
import { Button } from '@nextui-org/react'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app)

const HistoryPage = () => {

    const pathName = usePathname();
    const [history, setHistory] = React.useState<any>([])
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyCollectionRef = await query(collection(db, "history"), orderBy("timestamp", "desc"));
                const historyQuerySnapshot = await getDocs(historyCollectionRef);
                const historyData = historyQuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as HistoryMonth[];
                setHistory(historyData);
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        }
        fetchHistory()
    }, [history])

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    if (!user) {
        return <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <p>
                Нужно залогиниться, попробуйте обновить страницу
            </p>
        </div>;
    }

    return (
        <div className='bg-slate-600 m-2 rounded-md h-full'>
            <h1 className='text-center'>Изменить историю</h1>
            <div className='flex flex-col justify-between h-full'>
                <div className='flex justify-center items-center max-h-[450px]'>
                    <ul className='flex flex-col items-center overflow-y-auto max-h-[450px] w-full'>
                        {
                            !!history && history.map((item: HistoryMonth) => (
                                <li key={item.id} className='text-center cursor-pointer'>
                                    <Link href={{
                                        pathname: `/adminpanel/history/editdeletehistory/${item.id}`,
                                        query: {
                                            id: item.id,
                                            nameOfMonth: item.nameOfMonth,
                                            percentOfMonth: item.percentOfMonth,
                                            pointsOfMonth: item.pointsOfMonth
                                        }
                                    }} >
                                        {
                                            item.percentOfMonth > 0 ? <div className='text-green-500'>
                                                2023 {item.nameOfMonth}: {
                                                    item.percentOfMonth >= 0 ? `+${item.percentOfMonth}` : `${item.percentOfMonth}`
                                                } % (
                                                {
                                                    item.pointsOfMonth >= 0 ? `+${item.pointsOfMonth}` : `${item.pointsOfMonth}`
                                                } пунктов)
                                            </div> :
                                                <div className='text-red-500'>
                                                    2023 {item.nameOfMonth}: {
                                                        item.percentOfMonth >= 0 ? `+${item.percentOfMonth}` : `${item.percentOfMonth}`
                                                    } % (
                                                    {
                                                        item.pointsOfMonth >= 0 ? `+${item.pointsOfMonth}` : `${item.pointsOfMonth}`
                                                    } пунктов)
                                                </div>
                                        }
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='flex justify-center items-center mb-10'>
                    {
                        pathName === '/adminpanel/history/addnewhistory'
                            ? null
                            : <Button>
                                <Link href={'/adminpanel/history/addnewhistory'}>Добавить новую запись</Link>
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default HistoryPage