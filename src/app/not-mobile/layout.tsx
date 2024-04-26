'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'

const NotMobileLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            overflowX: 'hidden',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
            <div style={{
                height: '200px',
                width: '450px',
                overflow: 'hidden',
            }}>

                {children}
                {/* <section style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Button onClick={() => console.log('clicked')}>Back</Button>
                </section> */}

            </div>
        </div>
    )
}

export default NotMobileLayout