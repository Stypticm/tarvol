'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'

const UnSubscriberLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <section>
            <div className='bg-slate-500 flex flex-col'>
                <div className='flex flex-col justify-between h-[100vh]'>
                    {children}
                    <p className='flex justify-end m-2'>
                        <Button onClick={() => router.back()}>Back</Button>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default UnSubscriberLayout