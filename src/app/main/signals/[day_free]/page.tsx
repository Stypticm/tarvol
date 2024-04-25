'use client'

import React, { useEffect } from 'react';
import { days } from '@/features/week';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

const db = getFirestore(firebase_app)

const DayFreePage = ({ params }: { params: { day_free: string } }) => {

    const selectedDay = days.find(day => day.name === params.day_free.slice(0, -5))
    const [desc, setDesc] = React.useState('')

    useEffect(() => {
        const getWeek = async () => {
            try {
                if (selectedDay?.name) {
                    const weekQuery = query(
                        collection(db, 'week'),
                        orderBy('name'),
                        where('name', '==', selectedDay.name)
                    );

                    const weekQuerySnapshot = await getDocs(weekQuery);

                    if (!weekQuerySnapshot.empty) {
                        const weekDoc = weekQuerySnapshot.docs[0];
                        setDesc(weekDoc.data().description);
                    }
                }
            } catch (error) {
                console.error('Error fetching week data:', error);
            }
        };
        getWeek();
    }, [selectedDay?.name]);



    return (
        <div className='bg-slate-600 m-2 rounded-md flex flex-col justify-center items-center h-full'>
            <div className='h-1/6 flex justify-center items-center'>
                <h1>
                    Новости на {selectedDay?.name_r_long}
                </h1>
            </div>
            <div className='h-5/6 bg-slate-500 w-[95%] m-2 rounded-md'>
                <p className='m-2'>{desc}</p>
            </div>
        </div>
    );
}

export default DayFreePage;