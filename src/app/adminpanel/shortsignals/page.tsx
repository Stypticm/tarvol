'use client'

import React, { useEffect } from 'react'
import firebase_app from '@/firebase/config'
import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Textarea } from '@nextui-org/react'

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app)

const ShortSignalsPage = () => {

    const [shortDescription, setShortDescription] = React.useState<any>('')
    const [initialShortDescription, setInitialShortDescription] = React.useState<any>('')
    const [descId, setDescId] = React.useState<any>('')
    const [isChanged, setIsChanged] = React.useState(false)

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const fetchShortDescriptions = async () => {
            try {
                const shortDescriptionCollectionRef = await collection(db, "short_description_signals");
                const shortDescriptionQuerySnapshot = await getDocs(shortDescriptionCollectionRef);
                const shortDescriptionData = shortDescriptionQuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as any;

                if (shortDescriptionData.length > 0) {
                    const description = shortDescriptionData[0].description;
                    setDescId(shortDescriptionData[0].id);
                    setShortDescription(description);
                    setInitialShortDescription(description);
                }

            } catch (error) {
                console.error("Error fetching shortDescriptions data:", error);
            }
        }
        fetchShortDescriptions()
    }, [])

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setShortDescription(newDescription);
        setIsChanged(newDescription !== initialShortDescription);
    }

    const onSave = async () => {
        try {
            const docRef = await doc(db, "short_description_signals", descId);
            await updateDoc(docRef, {
                description: shortDescription
            })
            setIsChanged(false);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    }

    if (loading) {
        return <div className='flex justify-center items-center h-full w-full'>Загрузка...</div>;
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
            <h1 className='text-center m-2'>Изменить короткое описание на неделю</h1>
            <div className='flex flex-col justify-between h-5/6'>
                <section className='m-2'>
                    <Textarea
                        value={shortDescription}
                        // @ts-ignore
                        onChange={handleDescriptionChange}
                    />
                </section>
                <section className='flex justify-center items-center'>
                    {
                        isChanged ? <Button onClick={onSave}>
                            Сохранить новое описание
                        </Button> : null
                    }
                </section>
            </div>
        </div>
    )
}

export default ShortSignalsPage