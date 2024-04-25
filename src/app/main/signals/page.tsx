'use client'

import firebase_app from '@/firebase/config';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const db = getFirestore(firebase_app)

const MainPage = () => {
    
    const [shortDescription, setShortDescription] = useState<any>('')

    useEffect(() => {
        const fetchShortDescriptions = async () => {
            try {
                const shortDescriptionCollectionRef = await collection(db, "short_description_signals");
                const shortDescriptionQuerySnapshot = await getDocs(shortDescriptionCollectionRef);
                const shortDescriptionData = shortDescriptionQuerySnapshot.docs.map(doc => ({
                    ...doc.data()
                })) as any;
                setShortDescription(shortDescriptionData[0].description);

            } catch (error) {
                console.error("Error fetching shortDescriptions data:", error);
            }
        }
        fetchShortDescriptions()
    }, [])

    return (
        <div className='bg-slate-600 m-2 rounded-md h-full'>
            <h1 className='text-center'>Сигналы текущей недели</h1>
            <p className='m-2'>
                {shortDescription}
            </p>
        </div>
    )
}

export default MainPage