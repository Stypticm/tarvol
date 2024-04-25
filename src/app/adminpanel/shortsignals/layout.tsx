'use client'

import React from 'react'

interface ShortSignalsLayoutProps {
    children: React.ReactNode
}

const ShortSignalsLayout = ({ children }: ShortSignalsLayoutProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default ShortSignalsLayout