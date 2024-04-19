import React from 'react'

const HistoryLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col h-full justify-between m-2'>
                {children}
        </div>
    )
}

export default HistoryLayout