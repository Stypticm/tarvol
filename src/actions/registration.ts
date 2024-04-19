'use server'

import signUp from '@/firebase/auth/signup'

export const registration = async (formData: FormData) => {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const { result, error } = await signUp(email as string, name as string, password as string)
        if (error) {
            console.error('Registration failed:', error)
        } else {
            console.log('Registration successful:', result)
        }
    } catch (err) {
        console.error(err);
    }
}