'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminPanelPage = () => {
    const router = useRouter()

    return (
        <div className='bg-slate-600 m-2 rounded-md h-full'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
                <Button onClick={() => router.push('/adminpanel/history')}>Изменить историю</Button>
                <Button onClick={() => router.push('/adminpanel/shortsignals')}>Описание сигналов на неделю</Button>
                <Button onClick={() => router.push('/adminpanel/signals')}>Описание сигнала на каждый день</Button>
            </div>
        </div>
    )
}

export default AdminPanelPage