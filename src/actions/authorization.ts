'use server'

import { LoginResult } from '@/features/authTypes'
import signIn from '@/firebase/auth/signin'

export const login = async (formData: FormData): Promise<LoginResult> => {
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const { result, error } = await signIn(email as string, password as string)
        if (error) {
            console.error('Login failed:', error)
            return { success: false, error: new Error('Login failed') }
        } else {
            console.log('Login successful:', result)
            return { success: true, redirectTo: '/main' }
        }
    } catch (err) {
        console.error(err);
        return { success: false, error: new Error('Login failed'),  }
    }
}