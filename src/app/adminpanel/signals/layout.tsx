'use client'

import { days } from '@/features/week'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const SignalsLayout = ({ children }: { children: React.ReactNode }) => {

    const [selectedDay, setSelectedDay] = useState<string | null>(null)
    const [isActive, setIsActive] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/main/signals') {
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    }, [pathname])

    const handleDayClick = (day: string) => {
        setSelectedDay(day);
    };

    return (
        <div className='flex flex-col h-full justify-between m-2'>
            <ul className='flex justify-between'>
                {
                    !!days && days.map((day) => (
                        <li key={day.id} onClick={() => handleDayClick(day.name)} className={selectedDay === day.name && isActive ? 'text-purple-600 underline' : ''}>
                            <Link href={`/adminpanel/signals/${day.name}_free`}>
                                {day.name_r}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            {children}
        </div >
    )
}

export default SignalsLayout