'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'

const SubscriberLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <div className='flex flex-col h-full justify-between m-2'>
            {children}
            <div className='flex justify-end'>
                <Button onClick={() => router.back()}>Back</Button>
            </div>
        </div>
    )
}

export default SubscriberLayout