'use client'

import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { EditDeleteHistoryModalProps } from '@/features/hisyotyTypes';
import { doc, getFirestore, updateDoc,  } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

const db = getFirestore(firebase_app)

const EditDeleteHistoryModal = (props: EditDeleteHistoryModalProps) => {
    const router = useRouter();

    const initialNameOfMonth = props.searchParams.nameOfMonth;
    const initialPercentOfMonth = props.searchParams.percentOfMonth;
    const initialPointsOfMonth = props.searchParams.pointsOfMonth;

    const [nameOfMonth, setNameOfMonth] = useState(initialNameOfMonth);
    const [percentOfMonth, setPercentOfMonth] = useState(initialPercentOfMonth);
    const [pointsOfMonth, setPointsOfMonth] = useState(initialPointsOfMonth);

    const handleSave = () => {
        const editCollectionHistory = async () => {
            try {
                const docRef = await doc(db, "history", props.searchParams.id);
                await updateDoc(docRef, {
                    nameOfMonth: nameOfMonth,
                    percentOfMonth: percentOfMonth,
                    pointsOfMonth: pointsOfMonth
                })
            } catch (error) {
                console.error("Error updating document:", error);
            }
        }
        editCollectionHistory();
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
                                <section className='flex flex-col gap-4'>
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
                                </section>
                            </ModalBody>
                            {
                                nameOfMonth !== initialNameOfMonth || percentOfMonth !== initialPercentOfMonth || pointsOfMonth !== initialPointsOfMonth ?
                                    (
                                        <ModalFooter className='flex justify-between'>
                                            <Button onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button onPress={handleSave}>
                                                Save
                                            </Button>
                                        </ModalFooter>
                                    ) : <ModalFooter className='flex justify-center'>
                                        <Button onPress={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                            }
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditDeleteHistoryModal;