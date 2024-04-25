'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathName = usePathname()

    return (
        <div className='bg-slate-500 flex flex-col'>
            <div className='flex flex-col justify-between h-[100vh]'>
                {children}
                <p className='flex justify-between m-2'>
                    <Button onClick={() => router.push('/main')}>Main</Button>
                    {
                        pathName === '/adminpanel' ? null : <Button onClick={() => router.push('/adminpanel')}>Меню Админа</Button>
                    }
                    <Button onClick={() => router.back()}>Back</Button>
                </p>
            </div>
        </div>
    )
}

export default AdminPanelLayout