'use client'

import React, { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { addDoc, collection, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

const db = getFirestore(firebase_app)

const AddNewHistoryModal = () => {
    const router = useRouter();
    const [nameOfMonth, setNameOfMonth] = useState('');
    const [percentOfMonth, setPercentOfMonth] = useState('');
    const [pointsOfMonth, setPointsOfMonth] = useState('');

    const handleSave = () => {

        const addCollectionHistory = async () => {
            try {
                await addDoc(collection(db, "history"), {
                    nameOfMonth: nameOfMonth,
                    percentOfMonth: percentOfMonth,
                    pointsOfMonth: pointsOfMonth,
                    timestamp: serverTimestamp()
                })
            } catch (error) {
                console.error("Error adding document:", error);
            }
        }
        addCollectionHistory();
        router.back()
    }

    return (
        <Modal isOpen={true} onOpenChange={() => router.back()} placement='top' size='xs'>
            <ModalContent className='bg-slate-600 rounded-md h-[80vh]'>
                {(onClose) => (
                    <>
                        <form onSubmit={handleSave}>
                            <ModalBody className='text-center'>
                                <h1>Редактировать историю</h1>
                                <div className='flex flex-col gap-4'>
                                    <Input
                                        type="text"
                                        name="nameOfMonth"
                                        placeholder="Название месяца"
                                        id='nameOfMonth'
                                        color='primary'
                                        onChange={(e) => setNameOfMonth(e.target.value)}
                                        value={nameOfMonth}
                                    />
                                    <Input
                                        type="text"
                                        name="percentOfMonth"
                                        placeholder="Процент месяца"
                                        id='percentOfMonth'
                                        color='primary'
                                        onChange={(e) => setPercentOfMonth(e.target.value)}
                                        value={percentOfMonth}
                                    />
                                    <Input
                                        type="text"
                                        name="pointsOfMonth"
                                        placeholder="Пункты месяца"
                                        id='pointsOfMonth'
                                        color='primary'
                                        onChange={(e) => setPointsOfMonth(e.target.value)}
                                        value={pointsOfMonth}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex justify-between'>
                                <Button onPress={onClose}>
                                    Close
                                </Button>
                                <Button onPress={handleSave}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddNewHistoryModal;