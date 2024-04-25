'use client'

import React, { useEffect, useState } from 'react';
import { days } from '@/features/week';
import { collection, doc, getDocs, getFirestore, orderBy, query, updateDoc, where } from 'firebase/firestore';
import firebase_app from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { Button, Textarea } from '@nextui-org/react';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app)

const DayFreePage = ({ params }: { params: { day_free: string } }) => {

    const [user, loading, error] = useAuthState(auth);
    const selectedDay = days.find(day => day.name === params.day_free.slice(0, -5))

    const [desc, setDesc] = useState('')
    const [initialShortDescription, setInitialShortDescription] = useState<any>('')
    const [isChanged, setIsChanged] = useState(false)
    const [dayId, setDayId] = useState<any>('')

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
                        setInitialShortDescription(weekDoc.data().description);
                        setDayId(weekDoc.id);
                    }
                }
            } catch (error) {
                console.error('Error fetching week data:', error);
            }
        };
        getWeek();
    }, [selectedDay?.name]);

    if (loading) {
        return <div className='flex justify-center items-center h-full w-full'>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    if (!user) {
        return (
            <div className='w-screen h-screen flex flex-col justify-center items-center'>
                <p>
                    Нужно залогиниться, попробуйте обновить страницу
                </p>
            </div>
        )
    }

    const onSave = async () => {
        try {
            const weekRef = await doc(db, 'week', dayId);
            await updateDoc(weekRef, {
                description: desc
            })
            setIsChanged(false);
        } catch (error) {
            console.error('Error fetching week data:', error);
        }
    }

    const handleChangeDayDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setDesc(newDescription);
        setIsChanged(newDescription !== initialShortDescription);
    }

    return (
        <div className='bg-slate-600 m-2 rounded-md flex flex-col justify-center items-center h-full'>
            <div className='h-1/6 flex justify-center items-center'>
                <h1>
                    Новости на {selectedDay?.name_r_long}
                </h1>
            </div>
            <div className='h-5/6 w-[95%] rounded-md flex flex-col justify-between'>
                <Textarea
                    value={desc}
                    // @ts-ignore
                    onChange={handleChangeDayDescription}
                />
                <section className='m-2 flex justify-center'>
                    {
                        isChanged ? <Button onClick={onSave} >Сохранить изменения</Button> : null
                    }
                </section>
            </div>
        </div>
    );
}

export default DayFreePage;