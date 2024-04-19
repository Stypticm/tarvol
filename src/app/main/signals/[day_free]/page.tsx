'use client'

import React from 'react';
import { days } from '@/features/week';


const DayFreePage = ({ params }: { params: { day_free: string } }) => {
    console.log('DayFreePage')
    const selectedDay = days.find(day => day.name === params.day_free.slice(0, -5))

    return (
        <div className='bg-slate-600 m-2 rounded-md flex justify-center items-center h-full'>
            <h1>
                Новости на {selectedDay?.name_r_long}
            </h1>
        </div>
    );
}

export default DayFreePage;