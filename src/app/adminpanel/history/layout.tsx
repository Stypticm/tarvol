'use client'

import React from 'react'

interface HistoryLayoutProps {
    children: React.ReactNode,
    modalNewHistory: React.ReactNode,
    modalEditDeleteHistory: React.ReactNode
}

const HistoryLayout = ({ children, modalNewHistory, modalEditDeleteHistory }: HistoryLayoutProps) => {
    return (
        <>
            {children}
            {modalNewHistory}
            {modalEditDeleteHistory}
        </>
    )
}

export default HistoryLayout