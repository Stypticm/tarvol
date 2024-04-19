import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export function ButtonAuth() {
    const { pending } = useFormStatus()
    
    return (
        <Button type="submit">
            {
                pending ? "Logging in..." : "Login"
            }
        </Button>
    )
}

export function ButtonReg() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit">
            {
                pending ? "Registering..." : "Register"
            }
        </Button>
    )
}
