'use client'

import { HistoryMonth } from '@/features/hisyotyTypes'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import React, { useEffect, useId } from 'react'

const HistoryPage = () => {

    const db = getFirestore()
    const id = useId()
    const [history, setHistory] = React.useState<any>([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyCollectionRef = collection(db, "history");
                const historyQuerySnapshot = await getDocs(historyCollectionRef);
                const historyData = historyQuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setHistory(historyData);
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        }
        fetchHistory()
    }, [db])

    return (
        <div className='bg-slate-600 m-2 rounded-md h-full'>
            <h1 className='text-center'>История</h1>
            <div className='flex justify-center items-center max-h-[450px]'>
                <ul className='flex flex-col items-center overflow-y-auto max-h-[450px] w-full'>
                    {
                        !!history && history.map((item: HistoryMonth) => (
                            <li key={item.id} className='text-center'>
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
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default HistoryPage