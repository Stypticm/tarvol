'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'

const NotMobileLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <div className='bg-slate-500 flex flex-col'>
            <div className='flex flex-col justify-between h-[100vh]'>
                {children}
                <section className='flex justify-end m-2'>
                    <Button onClick={() => router.back()}>Back</Button>
                </section>
            </div>
        </div>
    )
}

export default NotMobileLayout